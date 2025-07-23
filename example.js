/**
 * 使用示例
 */
import PandoraMusic, { utils } from "./src/index.js";
import { get, post } from "./src/request.js";

// 基本使用示例
async function basicExample() {
  console.log("=== PandoraMusic 基本使用示例 ===");

  const pandora = new PandoraMusic({
    apiUrl: "https://jsonplaceholder.typicode.com",
    timeout: 5000,
  });

  try {
    // 模拟拉取音乐（使用测试API）
    console.log("正在拉取音乐数据...");
    const musicList = await pandora.pullMusic("周杰伦");
    console.log("拉取结果:", musicList);

    // 使用工具函数
    console.log("格式化时长:", utils.formatDuration(185)); // 3:05
    console.log(
      "验证数据:",
      utils.validateMusicData({
        title: "青花瓷",
        artist: "周杰伦",
      })
    );
  } catch (error) {
    console.error("错误:", error.message);
  }
}

// 直接使用request模块示例
async function requestExample() {
  console.log("\n=== Request 模块直接使用示例 ===");

  try {
    // GET请求示例
    console.log("发送GET请求...");
    const getResponse = await get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log("GET响应:", getResponse.data);

    // POST请求示例
    console.log("发送POST请求...");
    const postResponse = await post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: "测试标题",
        body: "测试内容",
        userId: 1,
      }
    );
    console.log("POST响应:", postResponse.data);
  } catch (error) {
    console.error("请求错误:", error.message);
  }
}

// 运行示例
async function runExamples() {
  await basicExample();
  await requestExample();
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  runExamples().catch(console.error);
}

export { basicExample, requestExample };
