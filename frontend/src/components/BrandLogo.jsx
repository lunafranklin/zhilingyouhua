import React from 'react';

/**
 * SmartTuneAI 品牌 Logo 组件
 * 包含图标和中英文品牌名称
 * @param {string} size - 大小：sm, md, lg, xl
 * @param {boolean} showText - 是否显示文字
 */
function BrandLogo({ size = 'md', showText = true, className = '' }) {
  const sizes = {
    sm: { icon: 'h-6 w-6', text: 'text-sm', textEN: 'text-xs' },
    md: { icon: 'h-8 w-8', text: 'text-base', textEN: 'text-sm' },
    lg: { icon: 'h-10 w-10', text: 'text-lg', textEN: 'text-base' },
    xl: { icon: 'h-12 w-12', text: 'text-xl', textEN: 'text-lg' }
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* 图标部分 */}
      <div className={`${currentSize.icon} flex-shrink-0`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>

          {/* S 形状 */}
          <path
            d="M 25 50 Q 25 25 50 25 L 75 25 Q 90 25 90 40 L 90 45 L 40 45 Q 40 55 50 55 L 90 55 Q 90 70 75 70 L 50 70 Q 25 70 25 90 L 25 50 Z"
            fill="url(#logoGradient)"
          />

          {/* 优化箭头 */}
          <path
            d="M 75 30 L 75 50"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 75 50 L 70 45"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 75 50 L 80 45"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* 智能点 */}
          <circle
            cx="65"
            cy="60"
            r="5"
            fill="white"
          />
        </svg>
      </div>

      {/* 文字部分 */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`${currentSize.textEN} font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
            SmartTuneAI
          </span>
          <span className={`${currentSize.text} font-bold text-gray-800`}>
            智能指令优化
          </span>
        </div>
      )}
    </div>
  );
}

export default BrandLogo;