# 🚀 Vercel 部署指南 - Node.js Meting API

## 📋 准备工作

你已经有 Vercel 账号，可以直接开始！

---

## 🎯 部署步骤

### 步骤 1：初始化 Git 仓库

打开命令行，进入项目目录：

```bash
cd F:\AIProject\FLMusic\meting-api-nodejs

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Node.js Meting API"
```

### 步骤 2：推送到 GitHub

1. **在 GitHub 创建新仓库**：
   - 访问 https://github.com/new
   - 仓库名：`meting-api-nodejs`
   - 设置为 Public
   - **不要**勾选 "Initialize this repository with a README"
   - 点击 "Create repository"

2. **推送代码**：
   ```bash
   # 添加远程仓库（替换为你的 GitHub 用户名）
   git remote add origin https://github.com/你的用户名/meting-api-nodejs.git

   # 推送代码
   git branch -M main
   git push -u origin main
   ```

### 步骤 3：在 Vercel 导入项目

1. **登录 Vercel**：https://vercel.com/dashboard

2. **导入项目**：
   - 点击 **"Add New..."** → **"Project"**
   - 找到 `meting-api-nodejs` 项目
   - 点击 **"Import"**

3. **配置项目**：
   - **Project Name**: `meting-api-nodejs`（或自定义）
   - **Framework Preset**: 自动检测为 **"Other"**
   - **Root Directory**: `./`
   - **Build Command**: 留空（不需要）
   - **Output Directory**: 留空（不需要）
   - **Install Command**: `npm install`

4. **点击 "Deploy"**

### 步骤 4：等待部署完成

- 部署时间：约 **1-2 分钟**
- 你会看到构建日志
- 成功后显示 🎉 Congratulations

### 步骤 5：获取 API 地址

部署成功后，你会得到一个地址，如：
```
https://meting-api-nodejs.vercel.app
```

或
```
https://meting-api-nodejs-你的用户名.vercel.app
```

**复制这个地址！**

---

## 🧪 测试 API

在浏览器中测试（替换为你的实际地址）：

### 测试网易云音乐：
```
https://你的地址.vercel.app/?server=netease&type=search&id=周杰伦
```

### 测试 QQ 音乐：
```
https://你的地址.vercel.app/?server=qq&type=search&id=平凡之路
```

### 测试酷狗音乐：
```
https://你的地址.vercel.app/?server=kugou&type=search&id=告白气球
```

如果返回 JSON 格式的歌曲列表，说明部署成功！

---

## ⚙️ 配置 Flutter 应用

1. **打开配置文件**：
   `F:\AIProject\FLMusic\fenglingmusic\lib\core\config\api_config.dart`

2. **修改 API 地址**：
   ```dart
   static const String metingApiBaseUrl = 'https://你的地址.vercel.app';
   ```

3. **保存并重新运行应用**：
   ```bash
   cd F:\AIProject\FLMusic\fenglingmusic
   flutter clean
   flutter pub get
   flutter run
   ```

---

## 🎉 完成！

现在你的音乐应用可以正常搜索音乐了！

---

## 📊 Vercel 免费额度

- ✅ 100GB 带宽/月
- ✅ 100GB-小时 函数执行时间/月
- ✅ 无限制项目数量
- ✅ 自动 HTTPS
- ✅ 全球 CDN

对于个人使用，完全够用！

---

## 🔧 故障排查

### 问题 1：部署失败

**解决方案**：
1. 检查 `package.json` 是否正确
2. 确认 `vercel.json` 存在
3. 查看 Vercel 部署日志

### 问题 2：API 返回错误

**解决方案**：
1. 确认 URL 格式正确
2. 检查参数是否完整
3. 在 Vercel Dashboard 查看函数日志

### 问题 3：Flutter 应用无法连接

**解决方案**：
1. 确认 API 地址配置正确
2. 在浏览器中测试 API 是否正常
3. 检查网络连接

---

## 💡 提示

- 部署后，每次推送代码到 GitHub，Vercel 会自动重新部署
- 可以在 Vercel Dashboard 查看部署历史和日志
- 支持自定义域名（在 Vercel 项目设置中配置）

---

**祝你部署顺利！** 🎵
