/**
 * PandoraMusic - 音乐拉取&推送工具
 */
import request from "./request.js";

class PandoraMusic {
  constructor(options) {
    this.config = {
      apiUrl:
        options.apiUrl ||
        "https://pandora-music.b14f.com/?s=findmusic&c=service&m=",
      timeout: options.timeout || 5000,
    };
  }

  /**
   * 拉取音乐数据
   * @param {string} query - 搜索关键词
   * @param {Object} options - 选项
   * @returns {Promise<Array>} 音乐列表
   */
  async pullMusic(query) {
    try {
      console.log(`正在拉取音乐: ${query}`);
      const url = `${this.config.apiUrl}pullMusic`;
      return await request.get(url);
    } catch (error) {
      throw new Error(`拉取音乐失败: ${error.message}`);
    }
  }

  /**
   * 推送音乐数据
   * @param {Object} musicData - 音乐数据
   * @returns {Promise<Object>} 推送结果
   */
  async pushMusic(musicData) {
    console.log("musicData", musicData);
    try {
      console.log("正在推送音乐数据...");

      const url = `${this.config.apiUrl}pushMusic`;
      return await request.postFormData(url, musicData);
    } catch (error) {
      throw new Error(`推送音乐失败: ${error.message}`);
    }
  }
}

// 导出主类和工具函数

export const utils = {
  /**
   * 格式化音乐时长
   * @param {number} seconds - 秒数
   * @returns {string} 格式化后的时长
   */
  formatDuration(seconds = 0) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  },

  /**
   * 验证音乐数据格式
   * @param {Object} musicData - 音乐数据
   * @returns {boolean} 是否有效
   */
  validateMusicData(musicData) {
    return (
      musicData &&
      typeof musicData.title === "string" &&
      typeof musicData.url === "string"
    );
  },
};

export default PandoraMusic;
