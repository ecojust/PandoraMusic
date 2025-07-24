const pandora = new PandoraMusic.default({});

// 歌曲池 - 所有可用的歌曲
// const songPool = [
//   { title: "夜曲", artist: "周杰伦", color: "#ff6b6b" },
//   { title: "青花瓷", artist: "周杰伦", color: "#4ecdc4" },
//   { title: "稻香", artist: "周杰伦", color: "#45b7d1" },
//   { title: "告白气球", artist: "周杰伦", color: "#f9ca24" },
//   { title: "晴天", artist: "周杰伦", color: "#6c5ce7" },
//   { title: "七里香", artist: "周杰伦", color: "#a29bfe" },
//   { title: "简单爱", artist: "周杰伦", color: "#fd79a8" },
//   { title: "听妈妈的话", artist: "周杰伦", color: "#00b894" },
//   { title: "菊花台", artist: "周杰伦", color: "#e17055" },
//   { title: "东风破", artist: "周杰伦", color: "#81ecec" },
//   { title: "发如雪", artist: "周杰伦", color: "#fab1a0" },
//   { title: "千里之外", artist: "周杰伦", color: "#00cec9" },
//   { title: "蒲公英的约定", artist: "周杰伦", color: "#e84393" },
//   { title: "彩虹", artist: "周杰伦", color: "#00b894" },
//   { title: "不能说的秘密", artist: "周杰伦", color: "#6c5ce7" },
//   { title: "花海", artist: "周杰伦", color: "#fd79a8" },
//   { title: "世界末日", artist: "周杰伦", color: "#fdcb6e" },
//   { title: "爱在西元前", artist: "周杰伦", color: "#e17055" },
//   { title: "安静", artist: "周杰伦", color: "#74b9ff" },
//   { title: "回到过去", artist: "周杰伦", color: "#55a3ff" },
//   { title: "星晴", artist: "周杰伦", color: "#fd79a8" },
//   { title: "龙卷风", artist: "周杰伦", color: "#fdcb6e" },
//   { title: "开不了口", artist: "周杰伦", color: "#e84393" },
//   { title: "黑色幽默", artist: "周杰伦", color: "#636e72" },
//   { title: "可爱女人", artist: "周杰伦", color: "#ff7675" },
//   { title: "完美主义", artist: "周杰伦", color: "#74b9ff" },
//   { title: "半岛铁盒", artist: "周杰伦", color: "#00cec9" },
//   { title: "暗号", artist: "周杰伦", color: "#a29bfe" },
//   { title: "分裂", artist: "周杰伦", color: "#fd79a8" },
//   { title: "爷爷泡的茶", artist: "周杰伦", color: "#00b894" },
//   { title: "困兽之斗", artist: "周杰伦", color: "#e17055" },
//   { title: "双截棍", artist: "周杰伦", color: "#fdcb6e" },
//   { title: "忍者", artist: "周杰伦", color: "#6c5ce7" },
//   { title: "最后的战役", artist: "周杰伦", color: "#636e72" },
//   { title: "威廉古堡", artist: "周杰伦", color: "#e84393" },
//   { title: "双刀", artist: "周杰伦", color: "#00cec9" },
//   { title: "梯田", artist: "周杰伦", color: "#55a3ff" },
//   { title: "娘子", artist: "周杰伦", color: "#fd79a8" },
//   { title: "止战之殇", artist: "周杰伦", color: "#74b9ff" },
//   { title: "本草纲目", artist: "周杰伦", color: "#00b894" },
//   { title: "退后", artist: "周杰伦", color: "#e17055" },
//   { title: "红模仿", artist: "周杰伦", color: "#fdcb6e" },
//   { title: "心雨", artist: "周杰伦", color: "#6c5ce7" },
//   { title: "白色风车", artist: "周杰伦", color: "#a29bfe" },
//   { title: "迷迭香", artist: "周杰伦", color: "#fd79a8" },
//   { title: "麦芽糖", artist: "周杰伦", color: "#00cec9" },
//   { title: "珊瑚海", artist: "周杰伦", color: "#74b9ff" },
//   { title: "漂移", artist: "周杰伦", color: "#e17055" },
// ];

// pandora.pushMusic({
//   coverImgUrl: "封面",
//   singer: "歌手",
//   src: "地址",
//   title: "主题",
// });

// 当前显示的歌曲列表 - 开始为空
let songs = [];
let currentSong = null;
let isPlaying = false;
let songTimer = null;

// 创建星空
function createStars() {
  const starsContainer = document.getElementById("stars");
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.width = Math.random() * 3 + 1 + "px";
    star.style.height = star.style.width;
    star.style.animationDelay = Math.random() * 2 + "s";
    starsContainer.appendChild(star);
  }
}

// 添加新歌曲到界面
function addSongToUI(song, index) {
  const container = document.getElementById("songContainer");
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // 创建多个轨道
  const orbitRadius = 200 + (index % 3) * 80;
  const angle = ((index * 360) / Math.max(songs.length, 8)) * (Math.PI / 180);

  const songElement = document.createElement("div");
  songElement.className = "song-item";
  songElement.style.background = `linear-gradient(135deg, ${song.color}, ${song.color}aa)`;
  songElement.dataset.songId = song.title; // 添加标识符

  const x = centerX + Math.cos(angle) * orbitRadius - 30;
  const y = centerY + Math.sin(angle) * orbitRadius - 30;

  songElement.style.left = x + "px";
  songElement.style.top = y + "px";

  // 初始状态设为透明和缩小
  songElement.style.opacity = "0";
  songElement.style.transform = "scale(0)";

  songElement.innerHTML = `
    <div class="song-title">${song.title}</div>
    <div class="song-artist">${song.artist}</div>
  `;

  songElement.addEventListener("click", () => playSong(song, songElement));
  container.appendChild(songElement);

  // 添加出现动画
  setTimeout(() => {
    songElement.style.transition = "all 0.5s ease-out";
    songElement.style.opacity = "1";
    songElement.style.transform = "scale(1)";
  }, 100);
}

// 重新排列所有歌曲位置
function rearrangeSongs() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  songs.forEach((song, index) => {
    const songElement = document.querySelector(
      `[data-song-id="${song.title}"]`
    );
    if (songElement) {
      const orbitRadius = 200 + (index % 3) * 80;
      const angle =
        ((index * 360) / Math.max(songs.length, 8)) * (Math.PI / 180);

      const x = centerX + Math.cos(angle) * orbitRadius - 30;
      const y = centerY + Math.sin(angle) * orbitRadius - 30;

      songElement.style.transition = "all 0.3s ease-out";
      songElement.style.left = x + "px";
      songElement.style.top = y + "px";
    }
  });
}

// 移除歌曲
function removeSong(song) {
  // 从歌曲列表中移除
  const songIndex = songs.findIndex(
    (s) => s.title === song.title && s.artist === song.artist
  );
  if (songIndex !== -1) {
    songs.splice(songIndex, 1);
  }

  // 从界面中移除
  const songElement = document.querySelector(`[data-song-id="${song.title}"]`);
  if (songElement) {
    // 添加消失动画
    songElement.style.transition = "all 0.3s ease-out";
    songElement.style.opacity = "0";
    songElement.style.transform = "scale(0)";

    // 动画结束后移除元素
    setTimeout(() => {
      songElement.remove();
      // 重新排列剩余歌曲
      rearrangeSongs();
    }, 300);
  }

  // 如果移除的是当前播放的歌曲，清理状态
  if (
    currentSong &&
    currentSong.title === song.title &&
    currentSong.artist === song.artist
  ) {
    currentSong = null;
    isPlaying = false;
    document.getElementById("playBtn").textContent = "▶";

    // 停止音频播放
    if (window.currentAudio) {
      window.currentAudio.pause();
      window.currentAudio = null;
    }

    // 如果还有其他歌曲，随机播放下一首
    if (songs.length > 0) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      const nextSong = songs[randomIndex];
      const nextSongElement = document.querySelector(
        `[data-song-id="${nextSong.title}"]`
      );

      if (nextSongElement && nextSong) {
        setTimeout(() => {
          playSong(nextSong, nextSongElement);
        }, 500); // 延迟500ms播放，让移除动画完成
      }
    } else {
      document.getElementById("nowPlaying").textContent = "暂无播放歌曲";
    }
  }

  console.log(`已移除歌曲: ${song.title} - ${song.artist}`);
}

// 检查是否需要自动播放
function checkAutoPlay() {
  // 当有两首歌且没有正在播放时，自动开始播放
  if (songs.length === 2 && !currentSong) {
    setTimeout(() => {
      const firstSong = songs[0];
      const firstSongElement = document.querySelector(
        `[data-song-id="${firstSong.title}"]`
      );

      if (firstSongElement && firstSong) {
        console.log("自动开始播放第一首歌曲:", firstSong.title);
        showLoadingStatus("自动开始播放...");
        playSong(firstSong, firstSongElement);
      }
    }, 1000); // 延迟1秒，让界面动画完成
  }
}

// 随机播放下一首歌曲
function playRandomSong() {
  if (songs.length === 0) {
    document.getElementById("nowPlaying").textContent = "暂无播放歌曲";
    return;
  }

  const randomIndex = Math.floor(Math.random() * songs.length);
  const randomSong = songs[randomIndex];
  const songElement = document.querySelector(
    `[data-song-id="${randomSong.title}"]`
  );

  if (songElement && randomSong) {
    playSong(randomSong, songElement);
  }
}

// 播放歌曲
function playSong(song, element) {
  // 移除之前的播放状态
  document.querySelectorAll(".song-item").forEach((item) => {
    item.classList.remove("playing");
  });

  // 设置当前播放
  currentSong = song;
  element.classList.add("playing");
  isPlaying = true;

  // 更新显示
  document.getElementById(
    "nowPlaying"
  ).textContent = `${song.title} - ${song.artist}`;
  document.getElementById("playBtn").textContent = "⏸";

  // 更新中心播放器颜色
  const centerPlayer = document.getElementById("centerPlayer");
  centerPlayer.style.background = `linear-gradient(45deg, ${song.color}, ${song.color}aa)`;

  centerPlayer.style.boxShadow = `0 0 20px ${song.color}`;
  centerPlayer.style.transition = "all 0.3s ease-out";

  console.log("开始播放:", song);
  // 实例化audio对象，播放当前歌曲
  if (song.url) {
    // 停止之前的音频播放
    if (window.currentAudio) {
      window.currentAudio.pause();
      window.currentAudio = null;
    }

    // 创建新的音频对象
    const audio = new Audio(song.url);
    window.currentAudio = audio;

    // 设置音频事件监听
    audio.addEventListener("loadstart", () => {
      console.log("开始加载音频:", song.title);
    });

    audio.addEventListener("canplay", () => {
      console.log("音频可以播放:", song.title);
    });

    audio.addEventListener("error", (e) => {
      console.error("音频播放错误:", e);
      document.getElementById(
        "nowPlaying"
      ).textContent = `播放失败: ${song.title}`;
      // 播放失败，移除这首歌
      setTimeout(() => {
        removeSong(song);
      }, 3000);
    });

    audio.addEventListener("ended", () => {
      // 歌曲播放结束，自动播放下一首
      document.getElementById("nextBtn").click();
    });

    // 开始播放
    audio.play().catch((error) => {
      console.log("播放失败:", error);
      document.getElementById(
        "nowPlaying"
      ).textContent = `播放失败: ${song.title}`;
      // 播放失败，移除这首歌
    });
  } else {
    console.warn("歌曲没有播放地址:", song.title);
  }
}

// 控制按钮事件
document.getElementById("playBtn").addEventListener("click", () => {
  if (currentSong && window.currentAudio) {
    isPlaying = !isPlaying;
    document.getElementById("playBtn").textContent = isPlaying ? "⏸" : "▶";

    if (isPlaying) {
      window.currentAudio.play().catch((error) => {
        console.error("恢复播放失败:", error);
      });
      document.querySelector(".playing")?.classList.add("playing");
    } else {
      window.currentAudio.pause();
      document.querySelector(".playing")?.classList.remove("playing");
    }
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentSong && songs.length > 0) {
    const currentIndex = songs.findIndex((s) => s.title === currentSong.title);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1;
    const prevSongElement = document.querySelector(
      `[data-song-id="${songs[prevIndex].title}"]`
    );
    if (prevSongElement) {
      playSong(songs[prevIndex], prevSongElement);
    }
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentSong && songs.length > 0) {
    const currentIndex = songs.findIndex((s) => s.title === currentSong.title);
    const nextIndex = currentIndex < songs.length - 1 ? currentIndex + 1 : 0;
    const nextSongElement = document.querySelector(
      `[data-song-id="${songs[nextIndex].title}"]`
    );
    if (nextSongElement) {
      playSong(songs[nextIndex], nextSongElement);
    }
  }
});

// 生成随机颜色
function generateRandomColor() {
  const colors = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#f9ca24",
    "#6c5ce7",
    "#a29bfe",
    "#fd79a8",
    "#00b894",
    "#e17055",
    "#81ecec",
    "#fab1a0",
    "#00cec9",
    "#e84393",
    "#fdcb6e",
    "#74b9ff",
    "#55a3ff",
    "#636e72",
    "#ff7675",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 随机添加歌曲
async function addRandomSong() {
  try {
    if (!currentSong) {
      showLoadingStatus("正在搜索新歌曲...");
    }

    // 通过pandora.pullMusic获取歌曲
    const res = await pandora.pullMusic("", { limit: 1 });

    const apiSong = res.data.data;
    // 处理从API获取的歌曲数据

    if (!apiSong) {
      return;
    }

    console.log("获取到的歌曲数据:", apiSong);
    const newSong = {
      title: apiSong.title || apiSong.name || "未知歌曲",
      artist: apiSong.artist || apiSong.singer || "未知歌手",
      color: generateRandomColor(),
      url: apiSong.src || "",
    };

    // 检查是否已经存在相同的歌曲
    const isDuplicate = songs.some(
      (existingSong) =>
        existingSong.title === newSong.title &&
        existingSong.singer === newSong.singer
    );

    if (isDuplicate) {
      console.log(`歌曲 ${newSong.title} 已存在，跳过添加`);
      return;
    }

    // 添加到歌曲列表
    songs.push(newSong);

    // 添加到界面
    addSongToUI(newSong, songs.length - 1);

    // 重新排列现有歌曲
    setTimeout(() => {
      rearrangeSongs();
    }, 600);

    console.log(`添加歌曲: ${newSong.title} - ${newSong.artist}`);

    // 检查是否需要自动开始播放
    // checkAutoPlay();

    // 如果还没有当前播放的歌曲，更新状态显示
    if (!currentSong) {
      showLoadingStatus("点击歌曲开始播放");
    }
  } catch (error) {
    console.error("获取歌曲失败:", error);

    // 错误处理：使用备用歌曲
    // const availableSongs = songPool.filter(
    //   (poolSong) =>
    //     !songs.some((existingSong) => existingSong.title === poolSong.title)
    // );

    // if (availableSongs.length > 0) {
    //   const randomIndex = Math.floor(Math.random() * availableSongs.length);
    //   const selectedSong = availableSongs[randomIndex];

    //   songs.push(selectedSong);
    //   addSongToUI(selectedSong, songs.length - 1);

    //   setTimeout(() => {
    //     rearrangeSongs();
    //   }, 600);

    //   console.log(
    //     `添加备用歌曲: ${selectedSong.title} - ${selectedSong.artist}`
    //   );
    // } else {
    //   console.log("没有更多备用歌曲可添加");
    //   clearTimeout(songTimer);
    // }
  }
}

// 开始定时添加歌曲
async function startAddingSongs() {
  // 立即添加第一首歌
  await addRandomSong();

  // 递归函数来设置随机间隔
  function scheduleNextSong() {
    const delay = Math.random() * 2000 + 3000; // 3-5秒随机间隔
    songTimer = setTimeout(async () => {
      await addRandomSong();
      scheduleNextSong(); // 递归调用，设置下一首歌
    }, delay);
  }

  // 开始调度
  scheduleNextSong();
}

// 中心播放器点击事件
document.getElementById("centerPlayer").addEventListener("click", () => {
  if (!currentSong && songs.length > 0) {
    const firstSongElement = document.querySelector(".song-item");
    playSong(songs[0], firstSongElement);
  }
});

// 显示加载状态
function showLoadingStatus(message) {
  document.getElementById("nowPlaying").textContent = message;
}

// 初始化
createStars();
showLoadingStatus("正在加载音乐...");
startAddingSongs();

// 响应式调整
window.addEventListener("resize", () => {
  rearrangeSongs();
});
