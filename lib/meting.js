const axios = require('axios');

/**
 * Meting API 核心类
 * 支持网易云音乐、QQ音乐、酷狗音乐
 */
class Meting {
  constructor(server = 'netease') {
    this.server = server;
    this.headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'application/json',
    };
  }

  /**
   * 搜索歌曲
   */
  async search(keyword, limit = 20) {
    try {
      switch (this.server) {
        case 'netease':
          return await this.searchNetease(keyword, limit);
        case 'tencent':
        case 'qq':
          return await this.searchQQ(keyword, limit);
        case 'kugou':
          return await this.searchKugou(keyword, limit);
        default:
          throw new Error('Unsupported server: ' + this.server);
      }
    } catch (error) {
      console.error(`Search error for ${this.server}:`, error.message);
      return [];
    }
  }

  /**
   * 搜索网易云音乐
   */
  async searchNetease(keyword, limit) {
    const url = 'https://music.163.com/api/search/get/web';
    const params = {
      s: keyword,
      type: 1,
      limit: limit,
      offset: 0,
    };

    try {
      const response = await axios.get(url, {
        params,
        headers: this.headers,
        timeout: 10000,
      });

      if (response.data && response.data.result && response.data.result.songs) {
        return response.data.result.songs.map(song => ({
          id: song.id.toString(),
          name: song.name,
          artist: song.artists.map(ar => ar.name).join(', '),
          album: song.album.name,
          pic: song.album.picUrl,
          url: '',
          time: Math.floor(song.duration / 1000),
        }));
      }
      return [];
    } catch (error) {
      console.error('Netease search error:', error.message);
      return [];
    }
  }

  /**
   * 搜索QQ音乐
   */
  async searchQQ(keyword, limit) {
    const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp';
    const params = {
      w: keyword,
      p: 1,
      n: limit,
      format: 'json',
    };

    try {
      const response = await axios.get(url, {
        params,
        headers: this.headers,
        timeout: 10000,
      });

      if (response.data && response.data.data && response.data.data.song) {
        return response.data.data.song.list.map(song => ({
          id: song.songmid,
          name: song.songname,
          artist: song.singer.map(s => s.name).join(', '),
          album: song.albumname,
          pic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.albummid}.jpg`,
          url: '',
          time: song.interval,
        }));
      }
      return [];
    } catch (error) {
      console.error('QQ search error:', error.message);
      return [];
    }
  }

  /**
   * 搜索酷狗音乐
   */
  async searchKugou(keyword, limit) {
    const url = 'http://mobilecdn.kugou.com/api/v3/search/song';
    const params = {
      keyword: keyword,
      page: 1,
      pagesize: limit,
      format: 'json',
    };

    try {
      const response = await axios.get(url, {
        params,
        headers: this.headers,
        timeout: 10000,
      });

      if (response.data && response.data.data && response.data.data.info) {
        return response.data.data.info.map(song => ({
          id: song.hash,
          name: song.songname,
          artist: song.singername,
          album: song.album_name || '',
          pic: '',
          url: '',
          time: song.duration,
        }));
      }
      return [];
    } catch (error) {
      console.error('Kugou search error:', error.message);
      return [];
    }
  }
}

module.exports = Meting;
