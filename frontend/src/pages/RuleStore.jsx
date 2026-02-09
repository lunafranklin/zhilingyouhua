import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRules } from '../hooks/useRules';
import RuleCard from '../components/RuleCard';
import { StoreIcon, SearchIcon, AddIcon, IdeaIcon } from '../components/Icons';

/**
 * 规则商店页面
 * 展示所有规则（预置 + 自定义），支持搜索和筛选
 * 支持响应式布局：移动端1列，平板2列，PC端3列
 */
export default function RuleStore({ isMobile = true }) {
  const { allRules, selectRule, deleteRule } = useRules();
  const [searchKeyword, setSearchKeyword] = useState('');

  // 过滤后的规则列表
  const filteredRules = useMemo(() => {
    if (!searchKeyword.trim()) return allRules;
    
    const keyword = searchKeyword.toLowerCase();
    return allRules.filter(rule => 
      rule.name.toLowerCase().includes(keyword) ||
      rule.description.toLowerCase().includes(keyword)
    );
  }, [allRules, searchKeyword]);

  // 应用规则 - 跳转到优化工具页并传递 ruleId
  const handleApply = (rule) => {
    selectRule(rule.id);
    // 跳转到优化工具页，带上 ruleId 参数
    window.location.href = `/tool?ruleId=${rule.id}`;
  };

  // 删除规则确认
  const handleDelete = (rule) => {
    if (confirm(`确定要删除规则「${rule.name}」吗？`)) {
      deleteRule(rule.id);
    }
  };

  // PC端网格布局
  if (!isMobile) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* 标题和新建按钮 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <StoreIcon size={28} className="text-purple-500" />
              <span>规则商店</span>
            </h1>
            <p className="text-gray-500 text-sm">
              选择一个规则来优化你的内容
            </p>
          </div>
          <Link
            to="/create"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <AddIcon size={18} />
            <span>新建规则</span>
          </Link>
        </div>

        {/* 搜索框 - PC端居中显示 */}
        <div className="mb-6 max-w-xl mx-auto">
          <div className="relative">
            <SearchIcon size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="搜索规则..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 规则卡片列表 - PC端3列网格 */}
        {filteredRules.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRules.map(rule => (
              <RuleCard
                key={rule.id}
                rule={rule}
                onApply={handleApply}
                onEdit={(rule) => {
                  window.location.href = `/edit/${rule.id}`;
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <SearchIcon size={48} className="text-gray-300" />
            </div>
            <p className="text-gray-500">
              没有找到匹配的规则
            </p>
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword('')}
                className="mt-4 text-blue-500 hover:text-blue-600"
              >
                清除搜索
              </button>
            )}
          </div>
        )}

        {/* 返回首页提示 */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-blue-700 text-sm text-center flex items-center justify-center gap-2">
            <IdeaIcon size={18} />
            <span>选用规则后会自动跳转到优化工具页面</span>
          </p>
        </div>
      </div>
    );
  }

  // 移动端列表布局
  return (
    <div className="px-4 py-4">
      {/* 标题和新建按钮 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            <StoreIcon size={24} className="text-purple-500" />
            <span>规则商店</span>
          </h1>
          <p className="text-gray-500 text-sm">
            选择一个规则来优化你的内容
          </p>
        </div>
        <Link
          to="/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1"
        >
          <AddIcon size={16} />
          <span>新建</span>
        </Link>
      </div>

      {/* 搜索框 */}
      <div className="mb-4">
        <div className="relative">
          <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="搜索规则..."
            className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* 规则卡片列表 - 移动端单列 */}
      {filteredRules.length > 0 ? (
        <div className="grid gap-4">
          {filteredRules.map(rule => (
            <RuleCard
              key={rule.id}
              rule={rule}
              onApply={handleApply}
              onEdit={(rule) => {
                window.location.href = `/edit/${rule.id}`;
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <SearchIcon size={48} className="text-gray-300" />
          </div>
          <p className="text-gray-500">
            没有找到匹配的规则
          </p>
          {searchKeyword && (
            <button
              onClick={() => setSearchKeyword('')}
              className="mt-4 text-blue-500 hover:text-blue-600"
            >
              清除搜索
            </button>
          )}
        </div>
      )}

      {/* 返回首页提示 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <p className="text-blue-700 text-sm text-center flex items-center justify-center gap-2">
          <IdeaIcon size={18} />
          <span>选用规则后会自动跳转到优化工具页面</span>
        </p>
      </div>
    </div>
  );
}