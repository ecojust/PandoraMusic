(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
    ? define(["exports"], factory)
    : ((global =
        typeof globalThis !== "undefined" ? globalThis : global || self),
      factory((global.PandoraMusic = {})));
})(this, function (exports) {
  "use strict";

  /**
   * 通用HTTP请求库
   */

  /**
   * 默认配置
   */
  const defaultConfig = {
    timeout: 5000,
    headers: {
      // "Content-Type": "application/json",
    },
  };

  /**
   * 请求类
   */
  class Request {
    constructor(config = {}) {
      this.config = { ...defaultConfig, ...config };
    }

    /**
     * GET请求
     * @param {string} url - 请求URL
     * @param {Object} options - 请求选项
     * @returns {Promise} 请求结果
     */
    async get(url) {
      const res = await fetch(url, { method: "GET" });
      return res.json();
    }

    /**
     * POST请求
     * @param {string} url - 请求URL
     * @param {Object} data - 请求数据
     * @param {Object} options - 请求选项
     * @returns {Promise} 请求结果
     */
    async postFormData(url, data = {}) {
      const formdata = new FormData();
      for (var k in data) {
        formdata.append(k, data[k]);
      }
      const res = await fetch(url, { method: "POST", body: formdata });
      return res.json();
    }
  }

  // 创建默认实例
  const request = new Request();

  /**
   * PandoraMusic - 音乐拉取&推送工具
   */

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

  exports.default = PandoraMusic;

  Object.defineProperty(exports, "__esModule", { value: true });

  // return PandoraMusic;
});
