import { Link } from 'react-router-dom';

/**
 * 规则卡片组件
 * 展示规则的基本信息，提供应用、编辑、删除操作
 */
export default function RuleCard({ rule, onApply, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      {/* 规则名称 */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
        <span className="mr-2">📝</span>
        {rule.name}
      </h3>

      {/* 规则简介 */}
      <p className="text-gray-600 mb-3">
        {rule.description}
      </p>

      {/* 分隔线 */}
      <div className="border-t border-gray-100 my-3"></div>

      {/* 规则提示词预览 */}
      <p className="text-gray-500 text-sm mb-3 line-clamp-2 italic">
        "{rule.prompt}"
      </p>

      {/* 操作按钮 */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onApply && onApply(rule)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          选用此规则
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit && onEdit(rule)}
            className="text-gray-500 hover:text-gray-700 p-2"
            title="编辑规则"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete && onDelete(rule)}
            className="text-gray-500 hover:text-red-500 p-2"
            title="删除规则"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
