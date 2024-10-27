/**
 * Manages audio playback for the game, including sound effects and background music.
 */
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
    this.globalVolume = 0.2;

    this.music.playSound.volume = this.musicVolume;
    this.music.playSound.muted = this.isMusicMuted;

    this.setVolume(this.globalVolume);
  }

  /**
   * Plays a sound effect.
   *
   * @param {string} soundName - The name of the sound to play.
   */
  playSound(soundName) {
    if (!this.isSoundMuted && this.sounds[soundName]) {
      this.sounds[soundName].volume = this.globalVolume;
      if (
        this.sounds[soundName].paused ||
        this.sounds[soundName].currentTime === 0
      ) {
        this.sounds[soundName].currentTime = 0;
        this.sounds[soundName].play().catch((err) => {
          console.error(`Error playing ${soundName}:`, err);
        });
      }
    }
  }

  /**
   * Stops a playing sound effect and resets it.
   *
   * @param {string} soundName - The name of the sound to stop.
   */
  stopSound(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].pause();
      this.sounds[soundName].currentTime = 0;
    }
  }

  /**
   * Plays the background music.
   */
  playMusic() {
    if (!this.isMusicMuted) {
      this.music.playSound.currentTime = 0;
      this.music.playSound.play();
    }
  }

  /**
   * Stops the background music and resets it.
   */
  stopMusic() {
    this.music.playSound.pause();
    this.music.playSound.currentTime = 0;
  }

  /**
   * Toggles the mute state for sound effects.
   */
  toggleSoundMute() {
    this.isSoundMuted = !this.isSoundMuted;

    if (!this.isSoundMuted) {
      this.playSound();
    }
  }

  /**
   * Toggles the mute state for background music.
   */
  toggleMusicMute() {
    this.isMusicMuted = !this.isMusicMuted;
    this.music.playSound.muted = this.isMusicMuted;
    if (!this.isMusicMuted) {
      this.playMusic();
    }
  }

  /**
   * Sets the volume for background music.
   *
   * @param {number} volume - The volume level for music (0.0 - 1.0).
   */
  setMusicVolume(volume) {
    this.music.playSound.volume = volume;
  }

  /**
   * Sets the global volume for all sound effects.
   *
   * @param {number} volume - The global volume level (0.0 - 1.0).
   */
  setVolume(volume) {
    this.globalVolume = volume;
    for (const sound in this.sounds) {
      this.sounds[sound].volume = volume;
    }
  }

  /**
   * Sets the volume for a specific sound effect.
   *
   * @param {string} soundName - The name of the sound.
   * @param {number} volume - The volume level for the sound (0.0 - 1.0).
   */
  setSoundVolume(soundName, volume) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].volume = volume;
    }
  }
}
