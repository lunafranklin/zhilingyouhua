import { useState, useEffect } from 'react';

/**
 * 基础骨架屏组件
 * @param {Object} props
 * @param {string} props.className - 额外的 class
 * @param {Object} props.style - 额外的样式
 */
function Skeleton({ className = '', style = {} }) {
  return (
    <div
      className={`
        bg-gradient-to-r
        from-gray-200
        via-gray-300
        to-gray-200
        animate-pulse
        ${className}
      `}
      style={style}
    />
  );
}

/**
 * 文本骨架屏
 * @param {Object} props
 * @param {string} props.height - 高度，默认 h-4
 * @param {string} props.width - 宽度，默认 w-full
 * @param {string} props.className - 额外的 class
 */
export function SkeletonText({ height = 'h-4', width = 'w-full', className = '' }) {
  return (
    <Skeleton
      className={`${height} ${width} rounded ${className}`}
    />
  );
}

/**
 * 按钮骨架屏
 * @param {Object} props
 * @param {string} props.size - 尺寸：sm, md, lg
 * @param {string} props.className - 额外的 class
 */
export function SkeletonButton({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-8 px-3',
    md: 'h-10 px-4',
    lg: 'h-12 px-6'
  };

  return (
    <Skeleton
      className={`${sizes[size]} rounded-lg ${className}`}
    />
  );
}

/**
 * 卡片骨架屏
 * @param {Object} props
 * @param {string} props.className - 额外的 class
 */
export function SkeletonCard({ className = '' }) {
  return (
    <Skeleton
      className={`rounded-xl p-6 shadow-sm border border-gray-100 ${className}`}
    />
  );
}

/**
 * 头像骨架屏
 * @param {Object} props
 * @param {string} props.size - 尺寸：sm, md, lg
 * @param {string} props.className - 额外的 class
 */
export function SkeletonAvatar({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <Skeleton
      className={`${sizes[size]} rounded-full ${className}`}
    />
  );
}

/**
 * 导航栏骨架屏
 * @param {Object} props
 * @param {string} props.className - 额外的 class
 */
export function SkeletonNavbar({ className = '' }) {
  return (
    <div className={`bg-white shadow-sm py-3 px-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-6 w-40 rounded" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-16 rounded" />
          <Skeleton className="h-8 w-16 rounded bg-blue-100" />
        </div>
      </div>
    </div>
  );
}

/**
 * Hero区域骨架屏
 * @param {Object} props
 * @param {string} props.className - 额外的 class
 */
export function SkeletonHero({ className = '' }) {
  return (
    <div className={`py-20 px-4 text-center ${className}`}>
      <Skeleton className="h-8 w-48 rounded-full mx-auto mb-6 bg-blue-100" />
      <Skeleton className="h-12 w-3/4 mx-auto mb-4 rounded" />
      <Skeleton className="h-6 w-2/3 mx-auto mb-8 rounded" />
      <div className="flex flex-wrap justify-center gap-4">
        <Skeleton className="h-12 w-40 rounded-xl bg-blue-100" />
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>
    </div>
  );
}

/**
 * 功能卡片骨架屏
 * @param {Object} props
 * @param {number} props.count - 卡片数量，默认 3
 * @param {string} props.className - 额外的 class
 */
export function SkeletonFeatures({ count = 3, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-4">
          <Skeleton className="w-12 h-12 rounded-xl bg-blue-100" />
          <Skeleton className="h-6 w-3/4 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
      ))}
    </div>
  );
}

/**
 * 演示区域骨架屏
 * @param {Object} props
 * @param {string} props.className - 额外的 class
 */
export function SkeletonDemo({ className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}>
      <Skeleton className="rounded-xl p-6 h-64" />
      <Skeleton className="rounded-xl p-6 h-64" />
    </div>
  );
}

/**
 * 规则商店骨架屏
 * @param {Object} props
 * @param {number} props.count - 规则数量，默认 4
 * @param {string} props.className - 额外的 class
 */
export function SkeletonRules({ count = 4, className = '' }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="w-10 h-10 rounded-xl bg-blue-100" />
          <Skeleton className="h-5 w-3/4 rounded" />
          <Skeleton className="h-3 w-2/3 rounded" />
        </div>
      ))}
    </div>
  );
}

/**
 * 技术特点骨架屏
 * @param {Object} props
 * @param {string} props.className - 额外的 class
 */
export function SkeletonTechFeatures({ className = '' }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-3 text-center">
          <Skeleton className="w-16 h-16 rounded-full mx-auto bg-blue-100" />
          <Skeleton className="h-5 w-2/3 mx-auto rounded" />
          <Skeleton className="h-3 w-1/2 mx-auto rounded" />
        </div>
      ))}
    </div>
  );
}

/**
 * CTA区域骨架屏
 * @param {Object} props
 * @param {string} props.className - 额外的 class
 */
export function SkeletonCTA({ className = '' }) {
  return (
    <div className={`py-16 px-4 text-center ${className}`}>
      <Skeleton className="h-10 w-48 mx-auto mb-4 rounded" />
      <Skeleton className="h-5 w-3/4 mx-auto mb-8 rounded" />
      <Skeleton className="h-12 w-48 mx-auto rounded-xl bg-blue-100" />
    </div>
  );
}

/**
 * 登录页面骨架屏
 * @param {Object} props
 * @param {string} props.className - 额外的 class
 */
export function SkeletonLogin({ className = '' }) {
  return (
    <div className={`max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg ${className}`}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Skeleton className="h-8 w-48 mx-auto rounded" />
          <Skeleton className="h-4 w-32 mx-auto rounded" />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <Skeleton className="h-10 w-full rounded-lg bg-blue-100" />
        </div>
        <div className="text-center">
          <Skeleton className="h-4 w-40 mx-auto rounded" />
        </div>
      </div>
    </div>
  );
}

/**
 * 注册页面骨架屏
 * @param {Object} props
 * @param {string} props.className - 额外的 class
 */
export function SkeletonRegister({ className = '' }) {
  return (
    <div className={`max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg ${className}`}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Skeleton className="h-8 w-48 mx-auto rounded" />
          <Skeleton className="h-4 w-32 mx-auto rounded" />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <Skeleton className="h-10 w-full rounded-lg bg-blue-100" />
        </div>
        <div className="text-center">
          <Skeleton className="h-4 w-40 mx-auto rounded" />
        </div>
      </div>
    </div>
  );
}

/**
 * 优化工具页面骨架屏
 * @param {Object} props
 * @param {string} props.className - 额外的 class
 */
export function SkeletonOptimizer({ className = '' }) {
  return (
    <div className="space-y-6">
      {/* 规则选择 */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 rounded" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-8 px-4 rounded-full" />
          ))}
        </div>
      </div>

      {/* 输入区域 */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 rounded" />
        <Skeleton className="h-64 w-full rounded-lg" />
        <div className="flex justify-end">
          <Skeleton className="h-10 w-32 rounded-lg bg-blue-100" />
        </div>
      </div>

      {/* 结果区域 */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 rounded" />
        <Skeleton className="h-40 w-full rounded-lg" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded" />
          <Skeleton className="h-8 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}

/**
 * 规则商店页面骨架屏
 * @param {Object} props
 * @param {string} props.className - 额外的 class
 */
export function SkeletonRuleStore({ className = '' }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="h-4 w-64 rounded" />
        </div>
        <Skeleton className="h-8 w-24 rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-5 w-3/4 rounded" />
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-8 w-24 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 主骨架屏组件（默认导出）
 */
export default Skeleton;
