const Meting = require('../lib/meting');

module.exports = async (req, res) => {
  // 设置 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { server, type, id } = req.query;

    console.log('API request:', { server, type, id });

    // 参数验证
    if (!server || !type || !id) {
      return res.status(400).json({
        error: 'Missing required parameters',
        required: ['server', 'type', 'id'],
        received: { server, type, id },
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
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
};
