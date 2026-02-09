/**
 * 指令优化工具 - 后端服务
 * 
 * 提供 API 接口供前端调用，支持多种大模型
 * 包含限流功能：本地不限次，用户限流 10 次/天
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { optimizeWithLLM } = require('./services/llm');

const app = express();
const PORT = process.env.PORT || 3001;

// 限流配置
const LIMIT_FOR_USER = parseInt(process.env.LIMIT_FOR_USER) || 10; // 每人每天 10 次

// 限流存储器（内存中，服务器重启会重置）
// 格式: { 'ip地址': { count: 调用次数, resetTime: 重置时间 } }
const rateLimitStore = new Map();

/**
 * 清理过期的限流记录
 * 每天凌晨清理前一天的数据
 */
function cleanupExpiredRecords() {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}

// 每小时清理一次过期记录
setInterval(cleanupExpiredRecords, 60 * 60 * 1000);

/**
 * 限流中间件
 * 本地访问（127.0.0.1）不限次数
 * 远程访问限流 10 次/天
 */
function rateLimitMiddleware(req, res, next) {
  // 获取客户端 IP
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  
  // 本地访问不限次数
  if (ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1') {
    return next();
  }

  const now = Date.now();
  const dayInMs = 24 * 60 * 60 * 1000; // 24 小时
  
  // 获取或创建该 IP 的记录
  let record = rateLimitStore.get(ip);
  
  if (!record) {
    // 新访问者
    record = {
      count: 0,
      resetTime: now + dayInMs
    };
    rateLimitStore.set(ip, record);
  }
  
  // 检查是否需要重置（跨天了）
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + dayInMs;
  }
  
  // 检查是否超过限制
  if (record.count >= LIMIT_FOR_USER) {
    const remainingTime = Math.ceil((record.resetTime - now) / (60 * 60 * 1000)); // 剩余小时
    
    return res.status(429).json({
      error: '调用次数已达上限',
      message: `今日已使用 ${record.count} 次优化服务，明天再来吧！`,
      remainingTime: `${remainingTime} 小时`,
      limit: LIMIT_FOR_USER
    });
  }
  
  // 允许通过，记录调用
  record.count++;
  
  // 在响应头中添加限流信息
  res.set('X-RateLimit-Limit', LIMIT_FOR_USER);
  res.set('X-RateLimit-Remaining', LIMIT_FOR_USER - record.count);
  res.set('X-RateLimit-Reset', new Date(record.resetTime).toISOString());
  
  next();
}

// 中间件
app.use(cors());
app.use(express.json());

// 根路径
app.get('/', (req, res) => {
  res.json({
    message: '指令优化工具后端服务',
    version: '1.0.0',
    endpoints: {
      optimize: 'POST /api/optimize',
      testPrompt: 'POST /api/test-prompt'
    },
    rateLimit: {
      local: '不限次数',
      remote: `${LIMIT_FOR_USER} 次/天`
    }
  });
});

/**
 * 获取剩余调用次数
 */
function getRemainingLimit(ip) {
  // 本地访问不限次数
  if (ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1') {
    return { remaining: -1, limit: -1, isUnlimited: true };
  }
  
  const now = Date.now();
  const dayInMs = 24 * 60 * 60 * 1000;
  
  let record = rateLimitStore.get(ip);
  
  if (!record) {
    return { remaining: LIMIT_FOR_USER, limit: LIMIT_FOR_USER, isUnlimited: false };
  }
  
  if (now > record.resetTime) {
    return { remaining: LIMIT_FOR_USER, limit: LIMIT_FOR_USER, isUnlimited: false };
  }
  
  return { 
    remaining: LIMIT_FOR_USER - record.count, 
    limit: LIMIT_FOR_USER,
    isUnlimited: false 
  };
}

/**
 * 获取调用次数信息接口
 * GET /api/limit-info
 */
app.get('/api/limit-info', (req, res) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const info = getRemainingLimit(ip);
  
  res.json({
    success: true,
    ...info
  });
});

/**
 * 优化文本接口
 * POST /api/optimize
 * Body: { text: string, prompt: string }
 */
app.post('/api/optimize', rateLimitMiddleware, async (req, res) => {
  try {
    const { text, prompt } = req.body;

    // 参数验证
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        error: '缺少或无效的 text 参数'
      });
    }

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        error: '缺少或无效的 prompt 参数'
      });
    }

    // 调用大模型优化
    const result = await optimizeWithLLM(text, prompt);

    res.json({
      success: true,
      result
    });
  } catch (error) {
    console.error('优化请求错误:', error.message);
    
    // 如果是 axios 错误，打印更多详情
    if (error.response) {
      console.error('API 响应状态:', error.response.status);
      console.error('API 响应数据:', JSON.stringify(error.response.data, null, 2));
    }
    
    res.status(500).json({
      error: '优化失败，请稍后重试',
      message: error.message,
      details: error.response?.data || null
    });
  }
});

/**
 * 测试提示词接口
 * POST /api/test-prompt
 * Body: { prompt: string, testText: string }
 */
app.post('/api/test-prompt', rateLimitMiddleware, async (req, res) => {
  try {
    const { prompt, testText } = req.body;

    // 参数验证
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        error: '缺少或无效的 prompt 参数'
      });
    }

    if (!testText || typeof testText !== 'string') {
      return res.status(400).json({
        error: '缺少或无效的 testText 参数'
      });
    }

    // 调用大模型测试
    const result = await optimizeWithLLM(testText, prompt);

    res.json({
      success: true,
      result
    });
  } catch (error) {
    console.error('测试提示词请求错误:', error);
    res.status(500).json({
      error: '测试失败，请稍后重试',
      message: error.message
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 后端服务已启动: http://localhost:${PORT}`);
  console.log(`📝 可用接口:`);
  console.log(`   POST http://localhost:${PORT}/api/optimize`);
  console.log(`   POST http://localhost:${PORT}/api/test-prompt`);
  console.log(`   GET  http://localhost:${PORT}/api/limit-info`);
  console.log(`\n📊 限流设置:`);
  console.log(`   本地访问：不限次数`);
  console.log(`   远程访问：每人每天 ${LIMIT_FOR_USER} 次`);
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n👋 正在关闭服务器...');
  process.exit(0);
});
