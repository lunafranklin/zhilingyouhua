import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRules } from '../hooks/useRules';
import { testPrompt } from '../services/api';

/**
 * 新建规则页面
 * 用户可以创建自定义优化规则
 * 支持响应式布局
 */
export default function CreateRule({ isMobile = true }) {
  const navigate = useNavigate();
  const { addRule } = useRules();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 模板数据
  const templates = [
    {
      name: '邮件优化',
      description: '将内容优化为商务邮件格式',
      prompt: `你是一个专业秘书。请将以下内容优化为商务邮件格式：

1. 使用正式语气
2. 添加适当的问候语和结尾
3. 保持礼貌和专业
4. 格式规范整洁

只返回优化后的邮件内容，不要其他解释。`
    },
    {
      name: '代码注释',
      description: '为代码生成清晰的注释说明',
      prompt: `你是一个专业程序员。请为以下代码添加清晰的注释说明：

1. 解释代码的功能
2. 标注关键逻辑
3. 说明参数和返回值
4. 使用中文注释

只返回带注释的代码，不要其他解释。`
    },
    {
      name: '口语转文案',
      description: '将口语化表达转换为专业文案',
      prompt: `你是一个专业文案师。请将以下口语化内容转换为专业文案：

1. 使用专业的文案表达
2. 保持吸引力和可读性
3. 适合对外发布的格式
4. 保留原文的核心信息

只返回优化后的文案，不要其他解释。`
    }
  ];

  // 使用模板
  const useTemplate = (template) => {
    setName(template.name);
    setDescription(template.description);
    setPrompt(template.prompt);
  };

  // 保存规则
  const handleSave = async () => {
    // 验证
    if (!name.trim()) {
      setError('请输入规则名称');
      return;
    }
    if (!description.trim()) {
      setError('请输入规则简介');
      return;
    }
    if (!prompt.trim()) {
      setError('请输入规则描述（提示词）');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 保存规则
      const newRule = addRule({
        name: name.trim(),
        description: description.trim(),
        prompt: prompt.trim()
      });

      // 跳转到规则商店
      navigate('/store');
    } catch (err) {
      setError('保存失败，请稍后重试');
      console.error('保存错误:', err);
    } finally {
      setLoading(false);
    }
  };

  // PC端布局
  if (!isMobile) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* 标题和返回按钮 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              ➕ 创建自定义规则
            </h1>
            <p className="text-gray-500 text-sm">
              自己定义优化规则，满足你的特殊需求
            </p>
          </div>
          <button
            onClick={() => navigate('/store')}
            className="text-gray-500 hover:text-gray-700 px-3 py-2"
          >
            ← 返回规则商店
          </button>
        </div>

        {/* 表单 */}
        <div className="space-y-4">
          {/* 规则名称 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              1️⃣ 给你的规则起个名字
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="输入规则名称，比如「邮件优化」"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 规则简介 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              2️⃣ 简单描述这个规则是做什么的
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="一句话说清楚，比如「将内容优化为商务邮件格式」"
              className="w-full h-20 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* 规则提示词 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              3️⃣ 写规则提示词（告诉 AI 怎么做）
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="输入规则描述，告诉 AI 如何优化内容"
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
            />
          </div>

          {/* 模板参考 - PC端横向排列 */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-700 mb-3">
              💡 不知道怎么写？点击参考模板 ↓
            </p>
            <div className="grid grid-cols-3 gap-2">
              {templates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => useTemplate(template)}
                  className="text-left px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <div className="font-medium text-gray-800">
                    📋 {template.name}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {template.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {/* 按钮 */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/store')}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className={`flex-1 py-3 px-4 rounded-xl font-medium text-white transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? '保存中...' : '💾 保存并使用'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 移动端布局
  return (
    <div className="px-4 py-4">
      {/* 标题和返回按钮 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            ➕ 创建自定义规则
          </h1>
          <p className="text-gray-500 text-sm">
            自己定义优化规则，满足你的特殊需求
          </p>
        </div>
        <button
          onClick={() => navigate('/store')}
          className="text-gray-500 hover:text-gray-700 px-3 py-2"
        >
          ← 返回
        </button>
      </div>

      {/* 表单 */}
      <div className="space-y-4">
        {/* 规则名称 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            1️⃣ 给你的规则起个名字
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入规则名称，比如「邮件优化」"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 规则简介 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            2️⃣ 简单描述这个规则是做什么的
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="一句话说清楚，比如「将内容优化为商务邮件格式」"
            className="w-full h-20 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* 规则提示词 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            3️⃣ 写规则提示词（告诉 AI 怎么做）
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="输入规则描述，告诉 AI 如何优化内容"
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
          />
        </div>

        {/* 模板参考 */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            💡 不知道怎么写？点击参考模板 ↓
          </p>
          <div className="space-y-2">
            {templates.map((template, index) => (
              <button
                key={index}
                onClick={() => useTemplate(template)}
                className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <div className="font-medium text-gray-800">
                  📋 {template.name}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {template.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {/* 按钮 */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/store')}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-white transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? '保存中...' : '💾 保存并使用'}
          </button>
        </div>
      </div>
    </div>
  );
}
