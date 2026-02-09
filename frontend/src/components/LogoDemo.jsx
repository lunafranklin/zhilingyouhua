import React from 'react';
import Logo from './Logo';

function LogoDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          SmartTuneAI Logo 设计方案
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 方案一：极简风格 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <Logo variant="minimal" size="xl" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">极简风格</h2>
                <p className="text-gray-500">Minimalist Style</p>
              </div>
            </div>
            
            <div className="space-y-3 text-gray-600">
              <p>• 字母 S 和 T 的组合</p>
              <p>• 简洁的几何形状</p>
              <p>• 蓝色和紫色渐变</p>
              <p>• 适合网站、App 和品牌标识</p>
            </div>
            
            <div className="mt-6 grid grid-cols-4 gap-4">
              <Logo variant="minimal" size="sm" />
              <Logo variant="minimal" size="md" />
              <Logo variant="minimal" size="lg" />
              <Logo variant="minimal" size="xl" />
            </div>
          </div>
          
          {/* 方案二：渐变风格 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <Logo variant="gradient" size="xl" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">渐变风格</h2>
                <p className="text-gray-500">Gradient Style</p>
              </div>
            </div>
            
            <div className="space-y-3 text-gray-600">
              <p>• 波浪形状代表指令流动</p>
              <p>• 智能点和优化箭头</p>
              <p>• 蓝紫色渐变体现科技感</p>
              <p>• 适合网站和营销材料</p>
            </div>
            
            <div className="mt-6 grid grid-cols-4 gap-4">
              <Logo variant="gradient" size="sm" />
              <Logo variant="gradient" size="md" />
              <Logo variant="gradient" size="lg" />
              <Logo variant="gradient" size="xl" />
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">使用方法</h2>
          
          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-medium text-gray-800">导入组件</h3>
              <pre className="bg-gray-50 p-3 rounded-lg text-sm">
{`import Logo from './components/Logo';`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800">使用示例</h3>
              <pre className="bg-gray-50 p-3 rounded-lg text-sm">
{`// 极简风格（默认）
<Logo variant="minimal" size="md" />

// 渐变风格
<Logo variant="gradient" size="lg" />

// 自定义大小（sm/md/lg/xl）
<Logo size="xl" />`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoDemo;