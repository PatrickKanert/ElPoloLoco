let jumpSound = new Audio("audio/jump.mp3");
let glassSound = new Audio("audio/glass.mp3");
let throwSound = new Audio("audio/throw.mp3");
let chickenSound = new Audio("audio/chicken.mp3");
let playSound = new Audio("audio/playsound.mp3");
let runningSound = new Audio("audio/running.mp3");
let winSound = new Audio("audio/win2.mp3");
let loseSound = new Audio("audio/lose.mp3");
let collect = new Audio("audio/collect_coin.mp3");

let globalVolume = 0.1; // Beispiel: 50% Lautstärke

// Funktion, um die Lautstärke für alle Sounds anzupassen
function setVolume(level) {
  jumpSound.volume = level;
  glassSound.volume = level;
  throwSound.volume = level;
  chickenSound.volume = level;
  playSound.volume = level;
  runningSound.volume = level;
  winSound.volume = level;
  loseSound.volume = level;
  collect.volume = level;
}

jumpSound.addEventListener(
  "loadedmetadata",
  () => (jumpSound.volume = globalVolume)
);
glassSound.addEventListener(
  "loadedmetadata",
  () => (glassSound.volume = globalVolume)
);
throwSound.addEventListener(
  "loadedmetadata",
  () => (throwSound.volume = globalVolume)
);
chickenSound.addEventListener(
  "loadedmetadata",
  () => (chickenSound.volume = globalVolume)
);
playSound.addEventListener(
  "loadedmetadata",
  () => (playSound.volume = globalVolume)
);
runningSound.addEventListener(
  "loadedmetadata",
  () => (runningSound.volume = globalVolume)
);
winSound.addEventListener(
  "loadedmetadata",
  () => (winSound.volume = globalVolume)
);
loseSound.addEventListener(
  "loadedmetadata",
  () => (loseSound.volume = globalVolume)
);
collect.addEventListener(
  "loadedmetadata",
  () => (collect.volume = globalVolume)
);
