# SmartTuneAI - 智能指令优化工具

<p align="center">
  <img src="frontend/public/vite.svg" alt="Logo" width="80" height="80">
</p>

<p align="center">
  <strong>AI 驱动的智能指令优化平台</strong>
</p>

<p align="center">
  基于大模型的指令优化工具，帮助用户快速优化文本内容
</p>

<p align="center">
  <a href="#功能特点">功能特点</a> •
  <a href="#技术栈">技术栈</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#项目结构">项目结构</a>
</p>

---

## ✨ 功能特点

### 🎯 核心功能
- **快速优化**：输入内容 → 选择规则 → 一键生成高质量优化结果
- **规则商店**：提供多种预置规则，也可以创建专属优化规则
- **自定义规则**：根据需求创建个性化规则，满足特殊场景

### 👤 用户系统
- 用户注册/登录
- 本地存储用户数据
- 每日 10 次免费使用

### 📱 响应式设计
- PC端：顶部导航 + 左右分栏布局
- 移动端：顶部导航 + 上下堆叠布局

## 🛠 技术栈

### 前端
- **React 18** - 用户界面框架
- **Vite** - 构建工具
- **TailwindCSS** - 原子化 CSS 框架
- **React Router** - 路由管理
- **React Context** - 状态管理

### 后端（预留）
- Node.js + Express
- ModelScope 大模型 API

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
# 安装前端依赖
cd frontend
npm install

# 安装后端依赖（可选）
cd ../backend
npm install
```

### 启动开发服务器

```bash
# 前端
cd frontend
npm run dev

# 后端（可选）
cd backend
npm start
```

### 构建生产版本

```bash
# 前端
cd frontend
npm run build
```

项目已准备好部署！

### Vercel 部署配置
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

## 📁 项目结构

```
Prompt-Optimizer/
├── frontend/                # 前端项目
│   ├── src/
│   │   ├── components/     # 公共组件
│   │   ├── pages/          # 页面组件
│   │   ├── hooks/          # 自定义 Hooks
│   │   ├── contexts/       # Context 状态管理
│   │   ├── services/       # 服务层
│   │   ├── utils/          # 工具函数
│   │   └── data/           # 静态数据
│   ├── public/             # 静态资源
│   └── package.json
├── backend/                 # 后端项目（预留）
├── docs/                   # 项目文档
└── README.md
```

## 📄 页面路由

| 路径 | 页面 | 说明 |
|-----|------|------|
| `/` | 品牌首页 | 公开访问 |
| `/login` | 登录页 | 未登录可访问 |
| `/register` | 注册页 | 未登录可访问 |
| `/tool` | 优化工具 | 需登录 |
| `/store` | 规则商店 | 需登录 |
| `/create` | 新建规则 | 需登录 |
| `/edit/:id` | 编辑规则 | 需登录 |

## 🎨 设计规范

### 品牌色
- **主色**: 蓝色 (#3B82F6)
- **辅助色**: 紫色 (#8B5CF6)
- **强调色**: 粉色 (#EC4899)

### 图标风格
- 统一线条风格
- SVG 图标
- 蓝色系为主

## 📝 更新日志

查看 [CHANGELOG.md](docs/CHANGELOG.md) 了解版本更新历史。

## 📄 许可证

MIT License

## 👤 作者

**lunafranklin**

---

<p align="center">
  Made with ❤️ by lunafranklin
</p>
