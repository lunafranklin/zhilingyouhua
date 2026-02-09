# 指令优化工具

一个在线 AI 提示词优化工具，帮助用户优化输入的指令内容。

## 功能特点

- ⚡ **快速优化** - 输入内容，选择规则，一键优化
- 🏪 **规则商店** - 提供多种预置规则，支持自定义规则
- ➕ **自定义规则** - 用户可以创建自己的优化规则
- 💾 **本地存储** - 自定义规则保存在浏览器本地
- 👋 **新手友好** - 首次使用有详细引导

## 技术栈

### 前端
- React + Vite
- Tailwind CSS
- React Router

### 后端
- Node.js + Express
- 支持多种大模型 API（Kimi、智谱、通义千问等）

## 快速开始

### 1. 安装依赖

```bash
# 安装前端依赖
cd frontend
npm install

# 安装后端依赖
cd ../backend
npm install
```

### 2. 配置 API Key

编辑 `backend/.env` 文件，配置大模型 API Key：

```env
# 使用 Kimi (推荐，有免费额度)
LLM_PROVIDER=kimi
KIMI_API_KEY=你的Kimi_API_Key
KIMI_MODEL=moonshot-v1-8k

# 或使用智谱 AI
# LLM_PROVIDER=zhipu
# ZHIPU_API_KEY=你的智谱_API_Key

# 或使用通义千问
# LLM_PROVIDER=tongyi
# TONGYI_API_KEY=你的通义_API_Key
```

获取 API Key：
- [Kimi API](https://platform.moonshot.cn/)
- [智谱 AI](https://open.bigmodel.cn/)
- [通义千问](https://dashscope.console.aliyun.com/)

### 3. 启动服务

**终端 1 - 启动后端：**

```bash
cd backend
npm start
```

后端服务运行在 http://localhost:3001

**终端 2 - 启动前端：**

```bash
cd frontend
npm run dev
```

前端服务运行在 http://localhost:5173

### 4. 打开应用

在浏览器中打开 http://localhost:5173

## 项目结构

```
zhilingyouhua_cn/
├── frontend/                 # 前端项目
│   ├── src/
│   │   ├── components/      # 通用组件
│   │   ├── pages/           # 页面组件
│   │   ├── hooks/           # 自定义 Hooks
│   │   ├── services/        # API 服务
│   │   ├── data/            # 数据文件
│   │   └── utils/           # 工具函数
│   └── ...
│
├── backend/                  # 后端项目
│   ├── services/            # 大模型服务
│   ├── server.js            # 服务入口
│   └── .env                 # 环境变量
│
└── README.md
```

## 使用说明

### 1. 快速优化

1. 在输入框中输入或粘贴要优化的内容
2. 选择一个优化规则（默认已选中）
3. 点击「开始优化」按钮
4. 查看并复制优化结果

### 2. 使用规则商店

1. 点击底部导航的「规则商店」
2. 浏览或搜索规则
3. 点击「选用此规则」跳转到优化页面
4. 点击规则卡片可编辑或删除

### 3. 创建自定义规则

1. 点击底部导航的「创建规则」
2. 填写规则名称、简介和提示词
3. 可以参考预设模板
4. 点击「保存并使用」

## 预置规则

| 规则名称 | 功能说明 |
|---------|---------|
| 错别字纠正 | 修正错别字，删除语气词 |
| 简洁优化 | 删除冗余，保留核心 |
| 详细扩展 | 补充细节，内容更完整 |
| 正式化表达 | 转换为正式书面语 |
| 口语转文案 | 口语转专业文案 |

## 后续扩展

- 🌐 浏览器插件
- 📝 历史记录
- 🌏 多语言支持
- 👤 用户登录/云端同步
- 🔗 规则分享

## 许可证

MIT
