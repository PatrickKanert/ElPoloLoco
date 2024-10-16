let canvas;
let world;
let keyboardInfoVisible = false;
let isSoundMuted = true;
let isInGameMuted = true;
let intervalIds = [];

function init() {
  checkScreenOrientation();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  world.setLevel(level1);
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

function stopGame() {
  intervalIds.forEach(clearInterval);
}

function resetGame() {
  stopGame();
  world = null;
  intervalIds = [];
}

function goHome() {
  resetGame();
  window.location.href = "index.html";
}

function startGame() {
  resetGame();
  init();
  initLevel();
  keyboard = new Keyboard();
  world.setLevel(level1);

  document.getElementById("winOrLoseScreen").classList.remove("d-none");
  document.getElementById("startScreen").classList.add("fade-out");
  document.getElementById("hud").classList.remove("d-none");

  setTimeout(function () {
    startScreen.classList.add("d-none");
  }, 1000);
}

function restartGame() {
  resetGame();
  init();
  initLevel();
  keyboard = new Keyboard();
  world.setLevel(level1);

  document.getElementById("winOrLoseScreen");

  winOrLoseScreen.classList.add("d-none");

  setTimeout(function () {}, 1000);
}

function toggleKeyboardInfo() {
  const info = document.getElementById("info");
  const soundMute = document.getElementById("soundMute");
  const button = document.getElementById("button");
  const keyAssignment = document.getElementById("keyAssignment");
  const keyboardInfo = document.getElementById("keyboardInfo");

  if (keyboardInfoVisible) {
    info.classList.remove("d-none");
    soundMute.classList.remove("d-none");
    button.classList.remove("d-none");
    keyAssignment.classList.add("d-none");
    keyboardInfo.classList.remove("keyboard-button-position");
  } else {
    info.classList.add("d-none");
    soundMute.classList.add("d-none");
    button.classList.add("d-none");
    keyAssignment.classList.remove("d-none");
    keyboardInfo.classList.add("keyboard-button-position");
  }

  keyboardInfoVisible = !keyboardInfoVisible;
}

function soundMute() {
  const soundOnIcon = document.getElementById("soundOn");
  const soundOffIcon = document.getElementById("soundOff");

  if (isSoundMuted) {
    soundOffIcon.classList.add("d-none");
    soundOnIcon.classList.remove("d-none");
    playSound.play();
  } else {
    soundOnIcon.classList.add("d-none");
    soundOffIcon.classList.remove("d-none");
    playSound.pause();
  }

  isSoundMuted = !isSoundMuted;
}

function checkScreenOrientation() {
  if (window.innerWidth < 950 && window.innerHeight > 800) {
    document.getElementById("rotateScreen").classList.remove("d-none");
    document.getElementById("rotateScreen").style.display = "flex";
    document.getElementById("content").classList.add("d-none");
  } else {
    document.getElementById("rotateScreen").classList.add("d-none");
    document.getElementById("content").classList.remove("d-none");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  keyboard = new Keyboard();
  init();
  window.addEventListener("resize", checkScreenOrientation);
});
