import { useState, useEffect, useCallback } from 'react';

/**
 * Toast 提示组件
 * 顶部弹出的轻量级提示
 */

// Toast 状态管理
let toastId = 0;
const toasts = new Map();

/**
 * 显示 Toast
 * @param {Object} options - 配置选项
 * @param {string} options.message - 提示消息
 * @param {string} options.type - 类型：success, error, warning, info
 * @param {number} options.duration - 显示时长（毫秒），默认 3000
 */
export function showToast(options) {
  const {
    message,
    type = 'info',
    duration = 3000
  } = options;

  const id = ++toastId;
  const toast = {
    id,
    message,
    type,
    duration
  };

  toasts.set(id, toast);
  
  // 触发更新
  window.dispatchEvent(new CustomEvent('toast-update'));

  // 自动关闭
  if (duration > 0) {
    setTimeout(() => {
      closeToast(id);
    }, duration);
  }

  return id;
}

/**
 * 关闭 Toast
 */
export function closeToast(id) {
  if (toasts.has(id)) {
    toasts.delete(id);
    window.dispatchEvent(new CustomEvent('toast-update'));
  }
}

/**
 * 便捷方法
 */
export const toast = {
  success: (message, duration) => showToast({ message, type: 'success', duration }),
  error: (message, duration) => showToast({ message, type: 'error', duration }),
  warning: (message, duration) => showToast({ message, type: 'warning', duration }),
  info: (message, duration) => showToast({ message, type: 'info', duration })
};

/**
 * Toast 容器组件
 * 显示所有活动的 Toast
 */
export default function ToastContainer() {
  const [activeToasts, setActiveToasts] = useState([]);

  useEffect(() => {
    const handleUpdate = () => {
      setActiveToasts(Array.from(toasts.values()));
    };

    window.addEventListener('toast-update', handleUpdate);

    return () => {
      window.removeEventListener('toast-update', handleUpdate);
    };
  }, []);

  if (activeToasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
      {activeToasts.map(toast => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => closeToast(toast.id)}
        />
      ))}
    </div>
  );
}

/**
 * 单个 Toast 项目
 */
function ToastItem({ toast, onClose }) {
  const { message, type } = toast;

  // 动画结束后移除
  useEffect(() => {
    return () => {
      // 清理函数
    };
  }, []);

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white'
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  return (
    <div
      className={`
        ${typeStyles[type]}
        px-4 py-3 rounded-lg shadow-lg
        flex items-center gap-2
        animate-toast-enter
        pointer-events-auto
        cursor-pointer hover:opacity-90
        transition-all duration-300
      `}
      onClick={onClose}
    >
      <span className="font-bold">{icons[type]}</span>
      <span className="text-sm font-medium">{message}</span>
      <button
        className="ml-2 opacity-70 hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ×
      </button>
    </div>
  );
}

/**
 * 全局 toast 实例（便捷使用）
 */
window.toast = toast;
