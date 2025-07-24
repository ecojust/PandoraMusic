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
   * 通用HTTP请求库 - 支持Node.js和浏览器环境
   */

  // 检测运行环境
  const isNode = typeof window === "undefined" && typeof global !== "undefined";

  // Node.js环境下的HTTP模块
  let http, https, url;
  if (isNode) {
    try {
      http = require("http");
      https = require("https");
      url = require("url");
    } catch (e) {
      console.warn("Node.js modules not available");
    }
  }

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
        // console.log(`正在拉取音乐: ${query}`);
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

  const utils = {
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

  exports.default = PandoraMusic;
  exports.utils = utils;

  Object.defineProperty(exports, "__esModule", { value: true });
});
