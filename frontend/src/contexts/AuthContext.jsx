import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as authLogin, register as authRegister, logout as authLogout, getCurrentUser, isLoggedIn } from '../services/auth';

/**
 * 认证 Context
 * 全局管理用户登录状态
 */
const AuthContext = createContext(null);

/**
 * 认证 Provider 组件
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 初始化时检查登录状态
  useEffect(() => {
    checkAuth();
  }, []);

  // 检查认证状态
  const checkAuth = useCallback(() => {
    if (isLoggedIn()) {
      setUser(getCurrentUser());
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  // 登录
  const login = useCallback(async (email, password) => {
    const result = authLogin(email, password);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  }, []);

  // 注册
  const register = useCallback(async (userData) => {
    const result = authRegister(userData);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  }, []);

  // 退出
  const logout = useCallback(() => {
    authLogout();
    setUser(null);
  }, []);

  // 更新用户信息
  const updateUser = useCallback((updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('smart_prompt_current_user', JSON.stringify(updatedUser));
    }
  }, [user]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * 使用认证 Context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * 需要登录的高阶组件
 * 未登录时跳转到登录页
 */
export function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
      return <div>加载中...</div>;
    }

    if (!isAuthenticated) {
      window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
