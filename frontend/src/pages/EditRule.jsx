import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRules } from '../hooks/useRules';

/**
 * 编辑规则页面
 * 可以编辑现有规则的名称、简介和提示词
 * 支持响应式布局
 */
export default function EditRule({ isMobile = true }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRuleById, updateRule } = useRules();

  const [rule, setRule] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 加载规则数据
  useEffect(() => {
    const ruleData = getRuleById(id);
    if (ruleData) {
      setRule(ruleData);
      setName(ruleData.name);
      setDescription(ruleData.description);
      setPrompt(ruleData.prompt);
    } else {
      setError('规则不存在');
    }
  }, [id, getRuleById]);

  // 保存修改
  const handleSave = () => {
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
      // 更新规则
      updateRule(id, {
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

  // 规则不存在
  if (!rule) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-gray-500">
          {error || '规则不存在'}
        </p>
        <button
          onClick={() => navigate('/store')}
          className="mt-4 text-blue-500 hover:text-blue-600"
        >
          返回规则商店
        </button>
      </div>
    );
  }

  // PC端布局
  if (!isMobile) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* 标题和返回按钮 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              ✏️ 编辑规则
            </h1>
            <p className="text-gray-500 text-sm">
              修改规则的名称、简介和提示词
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
              规则名称
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 规则简介 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              规则简介
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-20 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* 规则提示词 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              规则描述（提示词）
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
            />
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
              {loading ? '保存中...' : '💾 保存修改'}
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
            ✏️ 编辑规则
          </h1>
          <p className="text-gray-500 text-sm">
            修改规则的名称、简介和提示词
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
            规则名称
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 规则简介 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            规则简介
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-20 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* 规则提示词 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            规则描述（提示词）
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
          />
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
            {loading ? '保存中...' : '💾 保存修改'}
          </button>
        </div>
      </div>
    </div>
  );
}
