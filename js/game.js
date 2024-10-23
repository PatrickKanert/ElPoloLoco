let canvas;
let world;
let keyboardInfoVisible = false;
let intervalIds = [];
audioManager = new AudioManager();

function init() {
  initLevel();
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
  keyboard = new Keyboard();
  world.setLevel(level1);

  document.getElementById("winOrLoseScreen").classList.remove("d-none");
  document.getElementById("startScreen").classList.add("fade-out");
  document.getElementById("hud").classList.remove("d-none");
  document.getElementById("keyboardInfo").classList.add("d-none");
  document.getElementById("info").classList.add("d-none");
  document.getElementById("helpMenu").classList.remove("help-menu");
  document.getElementById("helpMenu").classList.add("help-menu-in-game");

  setTimeout(function () {
    startScreen.classList.add("d-none");
  }, 1000);
}

function restartGame() {
  resetGame();
  init();
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

function toggleSound() {
  audioManager.toggleSoundMute(); // Schalte den Sound an/aus
  updateSoundIcons(); // Aktualisiere die Icons
}

function toggleMusic() {
  audioManager.toggleMusicMute(); // Schalte die Musik an/aus
  updateMusicIcons(); // Aktualisiere die Icons
}

function updateSoundIcons() {
  const isMuted = audioManager.isSoundMuted;
  document.getElementById("soundOffIcon").classList.toggle("d-none", !isMuted);
  document.getElementById("soundOnIcon").classList.toggle("d-none", isMuted);
}

function updateMusicIcons() {
  const isMusicMuted = audioManager.isMusicMuted;
  document
    .getElementById("musicOffIcon")
    .classList.toggle("d-none", !isMusicMuted);
  document
    .getElementById("musicOnIcon")
    .classList.toggle("d-none", isMusicMuted);
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

document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    // Leertaste
    event.preventDefault(); // Standardverhalten verhindern
  }
});
