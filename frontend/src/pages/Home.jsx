import { useState } from 'react';
import { useRules } from '../hooks/useRules';
import { optimizeText } from '../services/api';
import { LightningIcon, IdeaIcon, RocketIcon, DocumentIcon, CopyIcon, DeleteIcon, TargetIcon } from '../components/Icons';

export default function Home({ isMobile = true }) {
  const { selectedRule, selectRule, allRules } = useRules();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const exampleText = '帮我写个邮件 这个那个嗯 就是想问问客户 他们那个项目 做的怎么样了呀 什么时候能完成';

  const handleOptimize = async () => {
    if (!inputText.trim()) {
      setError('请先输入要优化的内容');
      return;
    }

    if (!selectedRule) {
      setError('请先选择一个优化规则');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await optimizeText(inputText, selectedRule.prompt);
      setOutputText(result);
    } catch (err) {
      console.error('优化错误:', err);
      if (err.message && err.message.includes('已达上限')) {
        setError(err.message);
      } else {
        setError('优化失败，请稍后重试');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      alert('已复制到剪贴板！');
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError(null);
  };

  const useExample = () => {
    setInputText(exampleText);
  };

  if (!isMobile) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <LightningIcon size={28} className="text-blue-500" />
                <span>快速优化你的指令</span>
              </h1>
              <p className="text-gray-500">
                直接输入你想优化的内容，点击按钮即可！
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                选择优化规则
              </label>
              <select
                value={selectedRule?.id || ''}
                onChange={(e) => selectRule(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {allRules.map(rule => (
                  <option key={rule.id} value={rule.id}>
                    {rule.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                输入要优化的内容
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="输入或粘贴你想优化的内容"
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={useExample}
                  className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
                >
                  <IdeaIcon size={16} />
                  <span>试试示例内容</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleOptimize}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-medium text-white transition-colors flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? (
                '优化中...'
              ) : (
                <>
                  <RocketIcon size={20} />
                  <span>快速优化</span>
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="sticky top-24">
              {selectedRule && (
                <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-medium text-blue-800 mb-1 flex items-center gap-2">
                    <DocumentIcon size={18} />
                    <span>当前规则：{selectedRule.name}</span>
                  </h3>
                  <p className="text-sm text-blue-600">
                    {selectedRule.description}
                  </p>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  优化结果
                </label>
                <div className="bg-gray-50 rounded-xl p-4 min-h-64">
                  {outputText ? (
                    <p className="text-gray-800 whitespace-pre-wrap">{outputText}</p>
                  ) : (
                    <p className="text-gray-400 italic">
                      优化结果会显示在这里...
                    </p>
                  )}
                </div>
              </div>
              
              {outputText && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <CopyIcon size={18} />
                    <span>复制结果</span>
                  </button>
                  <button
                    onClick={handleClear}
                    className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <DeleteIcon size={18} />
                    <span>清空</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <LightningIcon size={28} className="text-blue-500" />
          <span>快速优化你的指令</span>
        </h1>
        <p className="text-gray-500">
          直接输入你想优化的内容，点击按钮即可！
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          选择优化规则
        </label>
        <select
          value={selectedRule?.id || ''}
          onChange={(e) => selectRule(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {allRules.map(rule => (
            <option key={rule.id} value={rule.id}>
              {rule.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          输入要优化的内容
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="输入或粘贴你想优化的内容"
          className="w-full h-40 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={useExample}
            className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
          >
            <IdeaIcon size={16} />
            <span>试试示例内容</span>
          </button>
        </div>
      </div>

      <button
        onClick={handleOptimize}
        disabled={loading}
        className={`w-full py-3 rounded-xl font-medium text-white transition-colors flex items-center justify-center gap-2 ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? (
          '优化中...'
        ) : (
          <>
            <TargetIcon size={20} />
            <span>开始优化</span>
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {outputText && (
        <div className="mt-6 mb-16">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            优化结果
          </label>
          <div className="bg-gray-50 rounded-xl p-4 min-h-32">
            <p className="text-gray-800 whitespace-pre-wrap">{outputText}</p>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleCopy}
              className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <CopyIcon size={18} />
              <span>复制结果</span>
            </button>
            <button
              onClick={handleClear}
              className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <DeleteIcon size={18} />
              <span>清空</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}