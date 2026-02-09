/**
 * API 服务
 * 用来调用后端接口
 * 
 * 开发阶段使用本地端口，生产环境需要修改为实际后端地址
 */
const API_BASE_URL = 'http://localhost:3001/api';

/**
 * 优化文本
 * @param {string} text - 需要优化的文本
 * @param {string} prompt - 优化规则提示词
 * @returns {Promise<string>} 优化后的文本
 */
export async function optimizeText(text, prompt) {
  try {
    const response = await fetch(`${API_BASE_URL}/optimize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        prompt
      }),
    });

    if (!response.ok) {
      throw new Error('优化请求失败');
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('调用优化 API 失败:', error);
    throw error;
  }
}

/**
 * 测试规则提示词
 * @param {string} prompt - 规则提示词
 * @param {string} testText - 测试文本
 * @returns {Promise<string>} 优化后的文本
 */
export async function testPrompt(prompt, testText) {
  try {
    const response = await fetch(`${API_BASE_URL}/test-prompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        testText
      }),
    });

    if (!response.ok) {
      throw new Error('测试提示词失败');
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('调用测试 API 失败:', error);
    throw error;
  }
}
