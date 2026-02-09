import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ToolIcon, StoreIcon } from './Icons';

/**
 * 导航栏组件
 * 根据屏幕尺寸自动切换顶部/底部导航
 * @param {boolean} isMobile - 是否为移动端
 */
export default function Navigation({ isMobile = true }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { 
      path: '/', 
      label: '首页', 
      icon: HomeIcon,
      iconProps: { size: 18 }
    },
    { 
      path: '/tool', 
      label: '优化工具', 
      icon: ToolIcon,
      iconProps: { size: 18 }
    },
    { 
      path: '/store', 
      label: '规则商店', 
      icon: StoreIcon,
      iconProps: { size: 18 }
    }
  ];

  // PC端顶部导航
  if (!isMobile) {
    return (
      <nav className="flex items-center gap-1">
        {navItems.map(item => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                currentPath === item.path
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <IconComponent {...item.iconProps} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  // 移动端底部导航
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50">
      <div className="max-w-4xl mx-auto flex justify-around">
        {navItems.map(item => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
                currentPath === item.path
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <IconComponent size={22} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}