import React from 'react';

/**
 * SmartTuneAI Logo 组件
 * 提供两种风格的 Logo 选择
 */
function Logo({ variant = 'minimal', size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  if (variant === 'gradient') {
    return (
      <div className={`${sizes[size]} ${className}`}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 渐变背景 */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          
          {/* 波浪形状 */}
          <path
            d="M 50 100 Q 75 75 100 100 T 150 100"
            stroke="url(#logoGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* 智能点 */}
          <circle
            cx="100"
            cy="100"
            r="15"
            fill="url(#logoGradient)"
          />
          
          {/* 优化箭头 */}
          <path
            d="M 100 85 L 100 65"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          <path
            d="M 100 65 L 105 70"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          <path
            d="M 100 65 L 95 70"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // 默认极简风格
  return (
    <div className={`${sizes[size]} ${className}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* S 和 T 组合 */}
        <path
          d="M 50 100 L 100 50 L 100 150 L 50 100 Z"
          fill="#3B82F6"
        />
        
        <path
          d="M 100 50 L 150 50 L 150 150 L 100 150 L 100 50 Z"
          fill="#8B5CF6"
        />
        
        {/* 智能点 */}
        <circle
          cx="125"
          cy="100"
          r="10"
          fill="white"
        />
      </svg>
    </div>
  );
}

export default Logo;