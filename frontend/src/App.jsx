import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ToastContainer, { toast } from './components/Toast';
import { SkeletonNavbar, SkeletonOptimizer, SkeletonRuleStore, SkeletonLogin, SkeletonRegister } from './components/Skeleton';
import Navigation from './components/Navigation';
import GuideModal from './components/GuideModal';
import BrandLogo from './components/BrandLogo';
import { ToolIcon, StoreIcon } from './components/Icons';
import { useFirstVisit } from './hooks/useRules';

const Landing = lazy(() => import('./pages/Landing'));
const Home = lazy(() => import('./pages/Home'));
const RuleStore = lazy(() => import('./pages/RuleStore'));
const CreateRule = lazy(() => import('./pages/CreateRule'));
const EditRule = lazy(() => import('./pages/EditRule'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const LogoDemo = lazy(() => import('./components/LogoDemo'));
const IconsDemo = lazy(() => import('./components/IconsDemo'));

function PageLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500">加载中...</p>
      </div>
    </div>
  );
}

/**
 * 需要登录才能访问的页面
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SkeletonNavbar />
        <div className="max-w-6xl mx-auto px-4 py-6">
          <SkeletonOptimizer />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
    return null;
  }

  return children;
}

/**
 * 已登录用户访问登录/注册页时跳转
 * 登录后默认跳转到优化工具页 (/tool)
 */
function AuthRedirect({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 使用 useEffect 处理导航，避免在 render 中调用 navigate
  useEffect(() => {
    if (!loading && isAuthenticated) {
      const redirect = searchParams.get('redirect') || '/tool';
      toast.success('登录成功！正在跳转...');
      navigate(redirect, { replace: true });
    }
  }, [loading, isAuthenticated, navigate, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SkeletonLogin />
      </div>
    );
  }

  // 如果已登录，useEffect 会处理跳转，这里返回 null
  if (isAuthenticated) {
    return null;
  }

  return children;
}

/**
 * 统一顶部导航组件
 * 包含：Logo、导航按钮（优化工具、规则商店）、登录/注册 或 用户信息+退出
 */
function Header({ isMobile }) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('已退出登录');
    navigate('/');
  };

  const navClass = isMobile 
    ? "flex items-center gap-2" 
    : "flex items-center gap-1";

  const navItemClass = isMobile
    ? "px-2 py-1 text-xs"
    : "px-3 py-1.5 text-sm";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className={isMobile ? "px-3 py-2" : "max-w-6xl mx-auto px-4 py-3"}>
        <div className="flex items-center justify-between">
          {/* Logo 在左边 */}
          <Link to="/">
            <BrandLogo size={isMobile ? "sm" : "md"} />
          </Link>

          {/* 所有导航按钮在右边 */}
          <nav className={`${isMobile ? "flex gap-1" : "flex gap-2"} flex items-center`}>
            {/* 优化工具 */}
            <Link 
              to="/tool"
              className={`text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors ${navItemClass}`}
            >
              优化工具
            </Link>
            
            {/* 规则商店 */}
            <Link 
              to="/store"
              className={`text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors ${navItemClass}`}
            >
              规则商店
            </Link>
            
            {/* 分隔符 */}
            <span className={`${isMobile ? "text-xs" : "text-sm"} text-gray-300`}>
              |
            </span>
            
            {/* 登录/注册 或 用户信息+退出 */}
            {isAuthenticated ? (
              <>
                <div className={`flex items-center gap-1 ${isMobile ? "px-1 py-0.5" : "px-2 py-1"}`}>
                  <div className={`${isMobile ? "w-5 h-5 text-xs" : "w-6 h-6 text-sm"} bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium`}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className={`text-gray-700 ${isMobile ? "text-xs" : "text-sm"} font-medium`}>
                    {user?.name || '用户'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`text-gray-500 hover:text-gray-700 ${isMobile ? "text-xs" : "text-sm"}`}
                >
                  退出
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-gray-600 hover:text-blue-600 ${isMobile ? "text-xs" : "text-sm"}`}
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors ${isMobile ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"}`}
                >
                  注册
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

/**
 * PC端布局
 */
function PCLayout({ children, showGuide, closeGuide }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isMobile={false} />

      <main className="flex-1 bg-gray-50">
        {children}
      </main>

      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
        <div className="flex items-center justify-center gap-2">
          <ToolIcon size={16} className="text-blue-400" />
          <span>SmartTuneAI · 每日10次使用</span>
        </div>
      </footer>

      <GuideModal show={showGuide} onClose={closeGuide} />
    </div>
  );
}

/**
 * 移动端布局 - 使用顶部导航，不再使用底部导航
 */
function MobileLayout({ children, showBottomNav, showGuide, closeGuide }) {
  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen shadow-lg">
      {/* 顶部导航 */}
      <Header isMobile={true} />

      {/* 页面内容 */}
      <div className={showBottomNav ? "px-3 pb-20" : "px-3"}>
        {children}
      </div>

      {/* 底部导航（可选，仅在需要时显示） */}
      {showBottomNav && (
        <Navigation isMobile={true} />
      )}

      <GuideModal show={showGuide} onClose={closeGuide} />
    </div>
  );
}

/**
 * 主应用组件
 */
function AppContent() {
  const { isAuthenticated } = useAuth();
  const { showGuide, closeGuide } = useFirstVisit(isAuthenticated);
  const [isMobile, setIsMobile] = useState(true);

  // 检测屏幕宽度
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // PC端布局 - 导航栏始终显示在顶部
  if (!isMobile) {
    return (
      <div className="min-h-screen bg-gray-100">
        <PCLayout showGuide={showGuide} closeGuide={closeGuide}>
          <Suspense fallback={<PageLoading />}>
            <Routes>
              {/* 品牌首页 - 公开访问 */}
              <Route path="/" element={<Landing isMobile={isMobile} />} />
              
              {/* 登录/注册页 - 未登录可访问 */}
              <Route path="/login" element={
                <AuthRedirect>
                  <Login isMobile={isMobile} />
                </AuthRedirect>
              } />
              <Route path="/register" element={
                <AuthRedirect>
                  <Register isMobile={isMobile} />
                </AuthRedirect>
              } />
              
              {/* 需要登录的页面 */}
              <Route path="/tool" element={
                <ProtectedRoute>
                  <Home isMobile={isMobile} />
                </ProtectedRoute>
              } />
              <Route path="/store" element={
                <ProtectedRoute>
                  <RuleStore isMobile={isMobile} />
                </ProtectedRoute>
              } />
              <Route path="/create" element={
                <ProtectedRoute>
                  <CreateRule isMobile={isMobile} />
                </ProtectedRoute>
              } />
              <Route path="/edit/:id" element={
                <ProtectedRoute>
                  <EditRule isMobile={isMobile} />
                </ProtectedRoute>
              } />
              
              {/* 演示页面 */}
              <Route path="/logo-demo" element={<LogoDemo />} />
              <Route path="/icons-demo" element={<IconsDemo />} />
            </Routes>
          </Suspense>
        </PCLayout>
      </div>
    );
  }

  // 移动端布局 - 统一使用顶部导航
  return (
    <div className="min-h-screen bg-gray-100">
      <MobileLayout showBottomNav={true} showGuide={showGuide} closeGuide={closeGuide}>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            {/* 品牌首页 - 公开访问 */}
            <Route path="/" element={<Landing isMobile={isMobile} />} />
            
            {/* 登录/注册页 - 未登录可访问 */}
            <Route path="/login" element={
              <AuthRedirect>
                <Login isMobile={isMobile} />
              </AuthRedirect>
            } />
            <Route path="/register" element={
              <AuthRedirect>
                <Register isMobile={isMobile} />
              </AuthRedirect>
            } />
            
            {/* 需要登录的页面 */}
            <Route path="/tool" element={
              <ProtectedRoute>
                <Home isMobile={isMobile} />
              </ProtectedRoute>
            } />
            <Route path="/store" element={
              <ProtectedRoute>
                <RuleStore isMobile={isMobile} />
              </ProtectedRoute>
            } />
            <Route path="/create" element={
              <ProtectedRoute>
                <CreateRule isMobile={isMobile} />
              </ProtectedRoute>
            } />
            <Route path="/edit/:id" element={
              <ProtectedRoute>
                <EditRule isMobile={isMobile} />
              </ProtectedRoute>
            } />
            
            {/* 演示页面 */}
            <Route path="/logo-demo" element={<LogoDemo />} />
            <Route path="/icons-demo" element={<IconsDemo />} />
          </Routes>
        </Suspense>
      </MobileLayout>
    </div>
  );
}

/**
 * 主应用入口
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;