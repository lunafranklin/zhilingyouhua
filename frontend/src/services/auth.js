/**
 * 认证服务
 * 使用 localStorage 存储用户数据
 * 后续可扩展支持 Supabase、阿里云等后端
 */

const STORAGE_KEY = 'smart_prompt_users';
const CURRENT_USER_KEY = 'smart_prompt_current_user';

/**
 * 获取所有用户
 */
function getUsers() {
  const users = localStorage.getItem(STORAGE_KEY);
  return users ? JSON.parse(users) : [];
}

/**
 * 保存用户列表
 */
function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

/**
 * 根据邮箱查找用户
 */
function findUserByEmail(email) {
  const users = getUsers();
  return users.find(user => user.email === email);
}

/**
 * 注册新用户
 * @param {Object} userData - 用户数据
 * @param {string} userData.name - 昵称
 * @param {string} userData.email - 邮箱
 * @param {string} userData.password - 密码
 * @returns {Object} { success, message, user }
 */
export function register(userData) {
  const { name, email, password } = userData;

  // 验证必填字段
  if (!name || !email || !password) {
    return {
      success: false,
      message: '请填写所有字段'
    };
  }

  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: '请输入有效的邮箱地址'
    };
  }

  // 验证密码长度
  if (password.length < 6) {
    return {
      success: false,
      message: '密码至少需要6个字符'
    };
  }

  // 检查邮箱是否已存在
  if (findUserByEmail(email)) {
    return {
      success: false,
      message: '该邮箱已被注册'
    };
  }

  // 创建新用户
  const newUser = {
    id: generateId(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: password, // 实际项目中需要加密存储
    createdAt: new Date().toISOString()
  };

  // 保存用户
  const users = getUsers();
  users.push(newUser);
  saveUsers(users);

  // 设置为当前用户
  setCurrentUser(newUser);

  return {
    success: true,
    message: '注册成功',
    user: sanitizeUser(newUser)
  };
}

/**
 * 用户登录
 * @param {string} email - 邮箱
 * @param {string} password - 密码
 * @returns {Object} { success, message, user }
 */
export function login(email, password) {
  // 验证必填字段
  if (!email || !password) {
    return {
      success: false,
      message: '请填写邮箱和密码'
    };
  }

  // 查找用户
  const user = findUserByEmail(email.toLowerCase().trim());
  if (!user) {
    return {
      success: false,
      message: '该邮箱未注册'
    };
  }

  // 验证密码
  if (user.password !== password) {
    return {
      success: false,
      message: '密码错误'
    };
  }

  // 设置为当前用户
  setCurrentUser(user);

  return {
    success: true,
    message: '登录成功',
    user: sanitizeUser(user)
  };
}

/**
 * 用户退出
 */
export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
  return {
    success: true,
    message: '已退出登录'
  };
}

/**
 * 获取当前登录用户
 * @returns {Object|null} 当前用户或 null
 */
export function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

/**
 * 设置当前用户
 */
function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sanitizeUser(user)));
}

/**
 * 清除用户敏感信息
 */
function sanitizeUser(user) {
  const { id, name, email, createdAt } = user;
  return { id, name, email, createdAt };
}

/**
 * 生成唯一 ID
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * 检查是否已登录
 */
export function isLoggedIn() {
  return getCurrentUser() !== null;
}

/**
 * 更新用户信息
 * @param {string} userId - 用户 ID
 * @param {Object} updates - 更新的字段
 */
export function updateUser(userId, updates) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  
  if (index === -1) {
    return { success: false, message: '用户不存在' };
  }

  // 更新用户
  users[index] = { ...users[index], ...updates };
  saveUsers(users);

  // 如果是当前用户，同步更新
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    setCurrentUser(users[index]);
  }

  return {
    success: true,
    message: '更新成功',
    user: sanitizeUser(users[index])
  };
}

/**
 * 预留：Supabase 集成接口
 * 后续可实现对接 Supabase 或阿里云
 */
export const cloudAuth = {
  /**
   * 初始化 Supabase
   */
  initSupabase: (config) => {
    console.log('Supabase 配置:', config);
    // 后续实现
  },

  /**
   * 使用 Supabase 登录
   */
  loginWithSupabase: async (provider) => {
    console.log('Supabase 第三方登录:', provider);
    // 后续实现
  },

  /**
   * 使用阿里云登录
   */
  loginWithAlibabaCloud: async (token) => {
    console.log('阿里云登录 token:', token);
    // 后续实现
  }
};
