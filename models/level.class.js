class Level {
  level_end_x = 719 * 3;
  enemies;
  clouds;
  collectibles;
  backgroundObjects;

  constructor(enemies, clouds, collectibles, backgroundObjects) {
    this.enemies = enemies; // Array von Feinden
    this.clouds = clouds; // Array von Wolken
    this.collectibles = collectibles; // Array von Sammelobjekten
    this.backgroundObjects = backgroundObjects; // Array von Hintergrundobjekten
  }
}
