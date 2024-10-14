let canvas;
let world;
let keyboard = new Keyboard();
let keyboardInfoVisible = false;
let isSoundMuted = true;
let intervalIds = [];

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My Character is", world.character);
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

function stopGame() {
  intervalIds.forEach(clearInterval);
}

function resetGame() {
  console.log("Game reset");

  // Stoppe alle laufenden Intervalle
  stopGame();

  // Setze Welt und Objekte zurück
  world = null;
  intervalIds = []; // Leere das Array für Intervalle, um neue zu starten

  // Optionale Bereinigung von Tastaturzuständen
}

function goHome() {
  window.location.href = "index.html"; // Beispiel: Gehe zu "home.html"
}

function startGame() {
  resetGame();
  init();
  document.getElementById("startScreen");

  startScreen.classList.add("fade-out");

  setTimeout(function () {
    startScreen.classList.add("d-none");
    // document.getElementById("inGameHelpMenu").classList.remove("hidden");
  }, 1000);
}

function toggleKeyboardInfo() {
  const info = document.getElementById("info");
  const soundMute = document.getElementById("soundMute");
  const button = document.getElementById("button");
  const keyAssignment = document.getElementById("keyAssignment");

  if (keyboardInfoVisible) {
    info.classList.remove("d-none");
    soundMute.classList.remove("d-none");
    button.classList.remove("d-none");
    keyAssignment.classList.add("d-none");
  } else {
    info.classList.add("d-none");
    soundMute.classList.add("d-none");
    button.classList.add("d-none");
    keyAssignment.classList.remove("d-none");
  }

  keyboardInfoVisible = !keyboardInfoVisible;
}

function soundMute() {
  const soundOnIcon = document.getElementById("soundOn");
  const soundOffIcon = document.getElementById("soundOff");

  if (isSoundMuted) {
    // Ton einschalten
    soundOffIcon.classList.add("d-none"); // Sound Off Icon ausblenden
    soundOnIcon.classList.remove("d-none"); // Sound On Icon einblenden
    playSound.play();
    console.log("Sound eingeschaltet");
  } else {
    // Ton ausschalten
    soundOnIcon.classList.add("d-none"); // Sound On Icon ausblenden
    soundOffIcon.classList.remove("d-none"); // Sound Off Icon einblenden
    playSound.pause();

    console.log("Sound ausgeschaltet");
  }

  isSoundMuted = !isSoundMuted; // Den Status umschalten
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});
