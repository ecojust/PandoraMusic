/**
 * 通用HTTP请求库 - 支持Node.js和浏览器环境
 */

// 检测运行环境
const isNode = typeof window === "undefined" && typeof global !== "undefined";
const isBrowser = typeof window !== "undefined";

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

// 导出便捷方法
export const get = (url) => request.get(url);
export const postFormData = (url, data) => request.postFormData(url, data);

// 导出类和默认实例
export { Request };
export default request;
