class AudioManager {
  constructor() {
    this.sounds = {
      jump: new Audio("./audio/jump.mp3"),
      glass: new Audio("./audio/glass.mp3"),
      throw: new Audio("./audio/throw.mp3"),
      chicken: new Audio("./audio/chicken.mp3"),
      running: new Audio("./audio/running.mp3"),
      win: new Audio("./audio/win2.mp3"),
      lose: new Audio("./audio/lose.mp3"),
      collect: new Audio("./audio/collect.mp3"),
    };

    this.music = {
      playSound: new Audio("./audio/playsound.mp3"),
    };

    this.isMusicMuted = true;
    this.isSoundMuted = true;
    this.musicVolume = 0.05;
    this.globalVolume = 1.0;

    this.music.playSound.volume = this.musicVolume;
    this.music.playSound.muted = this.isMusicMuted;

    this.setVolume(this.globalVolume);
  }

  playSound(soundName) {
    if (!this.isSoundMuted && this.sounds[soundName]) {
      this.sounds[soundName].volume = this.globalVolume;
      if (
        this.sounds[soundName].paused ||
        this.sounds[soundName].currentTime === 0
      ) {
        this.sounds[soundName].currentTime = 0;
        this.sounds[soundName].play().catch((err) => {
          console.error(`Fehler beim Abspielen von ${soundName}:`, err);
        });
      }
    }
  }

  stopSound(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].pause();
      this.sounds[soundName].currentTime = 0;
    }
  }

  playMusic() {
    if (!this.isMusicMuted) {
      this.music.playSound.currentTime = 0;
      this.music.playSound.play();
    }
  }

  stopMusic() {
    this.music.playSound.pause();
    this.music.playSound.currentTime = 0;
  }

  toggleSoundMute() {
    this.isSoundMuted = !this.isSoundMuted;

    if (!this.isSoundMuted) {
      this.playSound();
    }
  }

  toggleMusicMute() {
    this.isMusicMuted = !this.isMusicMuted;
    this.music.playSound.muted = this.isMusicMuted;
    if (!this.isMusicMuted) {
      this.playMusic();
    }
  }

  setMusicVolume(volume) {
    this.music.playSound.volume = volume;
  }

  setVolume(volume) {
    this.globalVolume = volume;
    for (const sound in this.sounds) {
      this.sounds[sound].volume = volume;
    }
  }

  setSoundVolume(soundName, volume) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].volume = volume;
    }
  }
}
