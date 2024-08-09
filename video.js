const videoPlayer = document.querySelector("video");
const playBtn = document.getElementById("play-btn");
const progressContainer = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const currTime = document.querySelector(".current-time");[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[
const totalTime = document.querySelector(".total-time");
const playerSpeed = document.querySelector(".player-speed");
const fullscreen = document.getElementById("fullScreen-btn");
const volumeContainer = document.querySelector(".volume");
const volumeBar = document.querySelector(".volume-bar");
const volBtn = document.getElementById("volume-btn");

function fnMute() {
  if (videoPlayer.volume) {
    videoPlayer.volume = 0;
    volumeBar.style.width = `${0}%`;
    volBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
  } else {
    videoPlayer.volume = 1;
    volumeBar.style.width = `${100}%`;
    volBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
  }
}

function changeVolume(event) {
  const newvol = event.offsetX / volumeContainer.offsetWidth;
  console.log(newvol);
  volumeBar.style.width = `${newvol * 100}%`;
  videoPlayer.volume = newvol;
}

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

let fullscr = false;
function changeScreen() {
  if (!fullscr) {
    openFullscreen(videoPlayer);
  } else {
    closeFullscreen();
  }
  fullscr = !fullscr;
}

function changeSpeed() {
  videoPlayer.playbackRate = playerSpeed.value;
}

function showTime(time) {
  const min = Math.trunc(time / 60);
  let sec = Math.trunc(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

function updateProgressBar() {
  const prog = (videoPlayer.currentTime / videoPlayer.duration) * 100;
  progressBar.style.width = `${prog}%`;

  currTime.textContent = `${showTime(videoPlayer.currentTime)} /`;
  totalTime.textContent = `${showTime(videoPlayer.duration)}`;
}

function seekProgress(event) {
  const newWidth = event.offsetX / progressContainer.offsetWidth;
  progressBar.style.width = `${newWidth * 100}%`;
  videoPlayer.currentTime = newWidth * videoPlayer.duration;
}

function playPauseVideo() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.classList.replace("fa-play", "fa-pause");
  } else {
    videoPlayer.pause();
    playBtn.classList.replace("fa-pause", "fa-play");
  }
}

videoPlayer.addEventListener("click", playPauseVideo);
playBtn.addEventListener("click", playPauseVideo);
videoPlayer.addEventListener("canplay", updateProgressBar);
videoPlayer.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", seekProgress);
playerSpeed.addEventListener("change", changeSpeed);
fullscreen.addEventListener("click", changeScreen);
volumeContainer.addEventListener("click", changeVolume);
volBtn.addEventListener("click", fnMute);
