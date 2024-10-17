class AudioManager {
  constructor() {
    this.sounds = {
      jump: new Audio("./audio/jump.mp3"),
      glass: new Audio("./audio/glass.mp3"),
      throw: new Audio("./audio/throw.mp3"),
      chicken: new Audio("./audio/chicken.mp3"),
      play: new Audio("./audio/playsound.mp3"),
      running: new Audio("./audio/running.mp3"),
      win: new Audio("./audio/win2.mp3"),
      lose: new Audio("./audio/lose.mp3"),
      collect: new Audio("./audio/collect.mp3"),
      playSound: new Audio("./audio/playsound.mp3"),
    };

    // Error listener for debugging audio loading
    for (const sound in this.sounds) {
      this.sounds[sound].addEventListener("error", () => {
        console.error(`Error loading sound: ${sound}`);
      });
    }

    this.isMuted = true; // Standardmäßig stumm
    this.globalVolume = 1; // Standard-Lautstärke
    this.playSoundVolume = 0.01; // Standardlautstärke für playSound

    // Setze die Lautstärke für alle Sounds auf den globalen Wert
    this.setVolume(this.globalVolume);

    // Setze die Lautstärke für playSound
    this.setSoundVolume("playSound", this.playSoundVolume);
  }

  playSound(soundName) {
    if (!this.isMuted && this.sounds[soundName]) {
      this.sounds[soundName].currentTime = 0; // Setze den Sound zurück
      this.sounds[soundName].play();
    }
  }

  stopSound(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].pause();
      this.sounds[soundName].currentTime = 0; // Setze den Sound zurück
    }
  }

  mute() {
    this.isMuted = true;
    this.setVolume(0); // Setze die Lautstärke auf 0
  }

  unmute() {
    this.isMuted = false;
    this.setVolume(this.globalVolume); // Setze die Lautstärke zurück auf den globalen Wert
  }

  toggleMute() {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  setVolume(volume) {
    for (const sound in this.sounds) {
      // Wenn der Sound playSound ist, verwende die spezielle Lautstärke
      this.sounds[sound].volume =
        sound === "playSound" ? this.playSoundVolume : volume;
    }
  }

  setSoundVolume(soundName, volume) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].volume = volume; // Setze die Lautstärke für den angegebenen Sound
      if (soundName === "playSound") {
        this.playSoundVolume = volume; // Speichere die Lautstärke für playSound
      }
    } else {
      console.warn(`Sound ${soundName} does not exist.`);
    }
  }
}
