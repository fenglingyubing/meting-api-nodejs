# Meting API - Node.js 版本

基于 Node.js + Express 的 Meting API 实现，专门适配 Vercel Serverless 部署。

## 🌟 特性

- ✅ 支持网易云音乐、QQ音乐、酷狗音乐
- ✅ 完全适配 Vercel Serverless
- ✅ 自动 CORS 支持
- ✅ 简单易用的 API 接口

## 🚀 部署到 Vercel

### 方法 1：通过 GitHub 部署（推荐）

1. **将此项目推送到 GitHub**：
   ```bash
   cd meting-api-nodejs
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/你的用户名/meting-api-nodejs.git
   git push -u origin main
   ```

2. **在 Vercel 导入项目**：
   - 登录 https://vercel.com
   - 点击 "Add New..." → "Project"
   - 选择 `meting-api-nodejs` 项目
   - 点击 "Deploy"

3. **部署完成**！
   - 获取你的 API 地址：`https://meting-api-nodejs.vercel.app`

### 方法 2：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
cd meting-api-nodejs
vercel
```

## 📖 API 使用

### 搜索歌曲

```
GET /?server={platform}&type=search&id={keyword}
```

**参数**：
- `server`: 平台名称（netease, qq, kugou）
- `type`: 操作类型（目前支持 search）
- `id`: 搜索关键词

**示例**：

```bash
# 网易云音乐搜索
https://你的域名.vercel.app/?server=netease&type=search&id=周杰伦

# QQ音乐搜索
https://你的域名.vercel.app/?server=qq&type=search&id=平凡之路

# 酷狗音乐搜索
https://你的域名.vercel.app/?server=kugou&type=search&id=告白气球
```

**返回格式**：

```json
[
  {
    "id": "123456",
    "name": "歌曲名",
    "artist": "歌手名",
    "album": "专辑名",
    "pic": "封面图片URL",
    "url": "",
    "time": 240
  }
]
```

## 🧪 本地测试

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 测试 API
curl "http://localhost:3000/?server=netease&type=search&id=周杰伦"
```

## 📁 项目结构

```
meting-api-nodejs/
├── api/
│   └── index.js          # Vercel Serverless 函数入口
├── lib/
│   └── meting.js         # Meting 核心实现
├── package.json          # 项目配置
├── vercel.json           # Vercel 部署配置
└── README.md             # 说明文档
```

## ⚙️ 配置 Flutter 应用

部署完成后，修改 Flutter 项目配置：

```dart
// fenglingmusic/lib/core/config/api_config.dart
static const String metingApiBaseUrl = 'https://你的域名.vercel.app';
```

## 🔧 故障排查

### 问题 1：部署失败

**解决方案**：
1. 确认 `package.json` 中的依赖正确
2. 确认 `vercel.json` 配置正确
3. 查看 Vercel 部署日志

### 问题 2：API 返回 404

**解决方案**：
1. 确认 URL 格式正确
2. 确认参数完整（server, type, id）
3. 查看 Vercel 函数日志

### 问题 3：搜索无结果

**可能原因**：
1. 音乐平台 API 变更
2. 网络超时
3. 关键词不存在

## 📝 注意事项

- 本项目仅供学习交流使用
- 请遵守相关音乐平台的使用条款
- 不要用于商业用途

## 📄 License

MIT
