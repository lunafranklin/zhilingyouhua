import React from 'react';
import Icon, { 
  HomeIcon, ToolIcon, StoreIcon,
  EditIcon, CutIcon, DocumentIcon, TargetIcon,
  FreeIcon, LockIcon, GlobeIcon, LightningIcon,
  SearchIcon, RocketIcon, SaveIcon, IdeaIcon, WaveIcon
} from './Icons';

function IconsDemo() {
  const iconGroups = [
    {
      name: '导航图标',
      icons: [
        { name: 'home', component: HomeIcon, label: '首页' },
        { name: 'tool', component: ToolIcon, label: '优化工具' },
        { name: 'store', component: StoreIcon, label: '规则商店' },
      ]
    },
    {
      name: '功能图标',
      icons: [
        { name: 'edit', component: EditIcon, label: '编辑' },
        { name: 'cut', component: CutIcon, label: '精简' },
        { name: 'document', component: DocumentIcon, label: '文档' },
        { name: 'target', component: TargetIcon, label: '目标' },
      ]
    },
    {
      name: '特性图标',
      icons: [
        { name: 'free', component: FreeIcon, label: '免费' },
        { name: 'lock', component: LockIcon, label: '安全' },
        { name: 'globe', component: GlobeIcon, label: '开源' },
        { name: 'lightning', component: LightningIcon, label: '快速' },
      ]
    },
    {
      name: '操作图标',
      icons: [
        { name: 'search', component: SearchIcon, label: '搜索' },
        { name: 'rocket', component: RocketIcon, label: '快速' },
        { name: 'save', component: SaveIcon, label: '保存' },
        { name: 'idea', component: IdeaIcon, label: '灵感' },
      ]
    }
  ];

  const sizes = [
    { size: 16, label: '16px' },
    { size: 20, label: '20px' },
    { size: 24, label: '24px' },
    { size: 32, label: '32px' },
    { size: 48, label: '48px' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          SmartTuneAI 图标库
        </h1>

        {/* 颜色变体 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">颜色变体</h2>
          <div className="flex flex-wrap gap-6">
            <HomeIcon size={32} className="text-blue-500" />
            <HomeIcon size={32} className="text-purple-500" />
            <HomeIcon size={32} className="text-pink-500" />
            <HomeIcon size={32} className="text-gray-500" />
            <HomeIcon size={32} className="text-gray-800" />
          </div>
        </div>

        {/* 尺寸变体 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">尺寸变体</h2>
          <div className="flex items-end gap-4">
            {sizes.map(({ size, label }) => (
              <div key={size} className="flex flex-col items-center">
                <HomeIcon size={size} className="text-blue-500" />
                <span className="text-xs text-gray-500 mt-2">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 图标组 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {iconGroups.map((group) => (
            <div key={group.name} className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">{group.name}</h3>
              <div className="grid grid-cols-4 gap-4">
                {group.icons.map((icon) => (
                  <div key={icon.name} className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                    <icon.component size={28} className="text-blue-500 mb-2" />
                    <span className="text-xs text-gray-600">{icon.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 使用示例 */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">使用方法</h2>
          
          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-medium text-gray-800">直接导入使用</h3>
              <pre className="bg-gray-50 p-3 rounded-lg text-sm mt-2">
{`import { HomeIcon, ToolIcon, SearchIcon } from './components/Icons';

// 在 JSX 中使用
<HomeIcon size={24} className="text-blue-500" />
<ToolIcon size={24} className="text-purple-500" />
<SearchIcon size={20} className="text-gray-500" />`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800">使用 Icon 组件</h3>
              <pre className="bg-gray-50 p-3 rounded-lg text-sm mt-2">
{`import Icon from './components/Icons';

// 通过名称使用
<Icon name="home" size={24} className="text-blue-500" />
<Icon name="search" size={20} className="text-gray-500" />
<Icon name="rocket" size={24} className="text-purple-500" />`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-gray-800">在导航中使用</h3>
              <pre className="bg-gray-50 p-3 rounded-lg text-sm mt-2">
{`const navItems = [
  { path: '/', label: '首页', icon: <HomeIcon size={20} /> },
  { path: '/tool', label: '优化工具', icon: <ToolIcon size={20} /> },
  { path: '/store', label: '规则商店', icon: <StoreIcon size={20} /> },
];`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IconsDemo;