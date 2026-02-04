const express = require('express');
const Meting = require('../lib/meting');

const app = express();

// CORS 中间件
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 健康检查
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Meting API is running',
    version: '1.0.0',
    endpoints: {
      search: '/?server=netease&type=search&id=keyword',
    },
  });
});

// 主 API 路由
app.get('/api', async (req, res) => {
  try {
    const { server, type, id } = req.query;

    // 参数验证
    if (!server || !type || !id) {
      return res.status(400).json({
        error: 'Missing required parameters',
        required: ['server', 'type', 'id'],
      });
    }

    // 支持的服务器
    const supportedServers = ['netease', 'tencent', 'qq', 'kugou'];
    if (!supportedServers.includes(server)) {
      return res.status(400).json({
        error: 'Unsupported server',
        supported: supportedServers,
      });
    }

    // 创建 Meting 实例
    const meting = new Meting(server);

    // 处理不同类型的请求
    switch (type) {
      case 'search':
        const results = await meting.search(id, 20);
        return res.json(results);

      default:
        return res.status(400).json({
          error: 'Unsupported type',
          supported: ['search'],
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

// 根路径处理 - 同时支持欢迎页和 API 调用
app.get('/', async (req, res) => {
  try {
    const { server, type, id } = req.query;

    console.log('Request received:', { server, type, id });

    // 如果有 server 参数，说明是 API 调用
    if (server && type && id) {
      console.log('Processing API request...');

      // 支持的服务器
      const supportedServers = ['netease', 'tencent', 'qq', 'kugou'];
      if (!supportedServers.includes(server)) {
        return res.status(400).json({
          error: 'Unsupported server',
          supported: supportedServers,
        });
      }

      // 创建 Meting 实例
      const meting = new Meting(server);

      // 处理搜索请求
      if (type === 'search') {
        console.log('Searching for:', id);
        const results = await meting.search(id, 20);
        console.log('Search results:', results.length, 'songs');
        return res.json(results);
      }

      return res.status(400).json({
        error: 'Unsupported type',
        supported: ['search'],
      });
    }

    // 否则返回欢迎信息
    res.json({
      status: 'ok',
      message: 'Meting API is running',
      version: '1.0.1',
      timestamp: new Date().toISOString(),
      usage: {
        search: '/?server=netease&type=search&id=keyword',
        examples: [
          '/?server=netease&type=search&id=周杰伦',
          '/?server=qq&type=search&id=平凡之路',
          '/?server=kugou&type=search&id=告白气球',
        ],
      },
    });
  } catch (error) {
    console.error('Root API Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
  });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// 本地开发服务器
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Meting API is running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}`);
  });
}

// 导出给 Vercel
module.exports = app;
