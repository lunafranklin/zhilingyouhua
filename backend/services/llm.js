/**
 * 大模型服务
 * 支持多种大模型 API：OpenAI、Kimi、智谱、ModelScope 等
 */
const axios = require('axios');

/**
 * 调用大模型优化文本
 * @param {string} text - 要优化的文本
 * @param {string} prompt - 优化规则提示词
 * @returns {Promise<string>} 优化后的文本
 */
async function optimizeWithLLM(text, prompt) {
  const provider = process.env.LLM_PROVIDER || 'modelscope';

  switch (provider) {
    case 'openai':
      return optimizeWithOpenAI(text, prompt);
    case 'kimi':
      return optimizeWithKimi(text, prompt);
    case 'zhipu':
      return optimizeWithZhipu(text, prompt);
    case 'tongyi':
      return optimizeWithTongyi(text, prompt);
    case 'modelscope':
      return optimizeWithModelScope(text, prompt);
    default:
      throw new Error(`不支持的模型提供商: ${provider}`);
  }
}

/**
 * ModelScope API (魔搭社区)
 * https://modelscope.cn/
 */
async function optimizeWithModelScope(text, prompt) {
  const apiKey = process.env.MODELSCOPE_API_KEY;
  const model = process.env.MODELSCOPE_MODEL || 'Qwen/Qwen2.5-7B-Instruct';

  if (!apiKey) {
    throw new Error('缺少 ModelScope API Key。请在 .env 文件中配置 MODELSCOPE_API_KEY');
  }

  const fullPrompt = `${prompt}\n\n==========\n待优化文本：\n${text}\n==========\n\n优化后的文本：`;

  const response = await axios.post(
    'https://api-inference.modelscope.cn/v1/chat/completions',
    {
      model,
      messages: [
        {
          role: 'user',
          content: fullPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content.trim();
}

/**
 * OpenAI API
 */
async function optimizeWithOpenAI(text, prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

  if (!apiKey) {
    throw new Error('缺少 OpenAI API Key');
  }

  const fullPrompt = `${prompt}\n\n==========\n待优化文本：\n${text}\n==========\n\n优化后的文本：`;

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model,
      messages: [
        {
          role: 'user',
          content: fullPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content.trim();
}

/**
 * Kimi API (月之暗面)
 * https://platform.moonshot.cn/
 */
async function optimizeWithKimi(text, prompt) {
  const apiKey = process.env.KIMI_API_KEY;
  const model = process.env.KIMI_MODEL || 'moonshot-v1-8k';

  if (!apiKey) {
    throw new Error('缺少 Kimi API Key。请在 .env 文件中配置 KIMI_API_KEY');
  }

  const fullPrompt = `${prompt}\n\n==========\n待优化文本：\n${text}\n==========\n\n优化后的文本：`;

  const response = await axios.post(
    `https://api.moonshot.cn/v1/chat/completions`,
    {
      model,
      messages: [
        {
          role: 'user',
          content: fullPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content.trim();
}

/**
 * 智谱 AI API
 * https://open.bigmodel.cn/
 */
async function optimizeWithZhipu(text, prompt) {
  const apiKey = process.env.ZHIPU_API_KEY;
  const model = process.env.ZHIPU_MODEL || 'glm-4';

  if (!apiKey) {
    throw new Error('缺少智谱 AI API Key');
  }

  const fullPrompt = `${prompt}\n\n==========\n待优化文本：\n${text}\n==========\n\n优化后的文本：`;

  const response = await axios.post(
    `https://api.bigmodel.cn/api/paas/v4/chat/completions`,
    {
      model,
      messages: [
        {
          role: 'user',
          content: fullPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content.trim();
}

/**
 * 通义千问 API
 * https://dashscope.console.aliyun.com/
 */
async function optimizeWithTongyi(text, prompt) {
  const apiKey = process.env.TONGYI_API_KEY;
  const model = process.env.TONGYI_MODEL || 'qwen-turbo';

  if (!apiKey) {
    throw new Error('缺少通义千问 API Key');
  }

  const fullPrompt = `${prompt}\n\n==========\n待优化文本：\n${text}\n==========\n\n优化后的文本：`;

  const response = await axios.post(
    'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    {
      model,
      messages: [
        {
          role: 'user',
          content: fullPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content.trim();
}

module.exports = {
  optimizeWithLLM
};
