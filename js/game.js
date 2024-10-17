let canvas;
let world;
let keyboardInfoVisible = false;
let isSoundMuted = true;
let intervalIds = [];
let audioManager;

function init() {
  checkScreenOrientation();
  canvas = document.getElementById("canvas");
  audioManager = new AudioManager();
  audioManager.mute();
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
  if (keyboardInfoVisible) {
    document.getElementById("info").classList.remove("d-none");
    document.getElementById("soundMute").classList.remove("d-none");
    document.getElementById("button").classList.remove("d-none");
    document.getElementById("keyAssignment").classList.add("d-none");
  } else {
    document.getElementById("info").classList.add("d-none");
    document.getElementById("soundMute").classList.add("d-none");
    document.getElementById("button").classList.add("d-none");
    document.getElementById("keyAssignment").classList.remove("d-none");
  }

  keyboardInfoVisible = !keyboardInfoVisible;
}

function soundMute() {
  audioManager.toggleMute(); // Verwende toggleMute, um den Stummstatus zu ändern

  // Aktualisiere die UI je nach Stummstatus
  if (audioManager.isMuted) {
    document.getElementById("soundOn").classList.add("d-none");
    document.getElementById("soundOff").classList.remove("d-none");
  } else {
    document.getElementById("soundOff").classList.add("d-none");
    document.getElementById("soundOn").classList.remove("d-none");
    audioManager.playSound("playSound"); // Optional, um den Sound abzuspielen
  }
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
