# PandoraMusic

音乐拉取&推送工具

## 安装

```bash
npm install pandora-music
```

## 使用方法

### ES6 模块

```javascript
import PandoraMusic, { utils } from "pandora-music";

const pandora = new PandoraMusic({
  apiUrl: "https://your-api.com",
  timeout: 10000,
});

// 拉取音乐
const musicList = await pandora.pullMusic("周杰伦", { limit: 5 });

// 推送音乐
const result = await pandora.pushMusic({
  title: "青花瓷",
  artist: "周杰伦",
  duration: 240,
});
```

### CommonJS

```javascript
const PandoraMusic = require("pandora-music");

const pandora = new PandoraMusic.default();
```

### 浏览器 UMD

```html
<script src="dist/index.js"></script>
<script>
  const pandora = new PandoraMusic.default();
</script>
```

## API

### PandoraMusic(options)

创建实例

### pullMusic(query, options)

拉取音乐数据

### pushMusic(musicData)

推送音乐数据

### getMusicDetail(id)

获取音乐详情

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 测试
npm test
```
