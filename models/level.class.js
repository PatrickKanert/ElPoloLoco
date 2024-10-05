class Level {
  level_end_x = 719 * 3;
  enemies;
  endboss;
  collectibles;
  clouds;
  backgroundObjects;

  constructor(enemies, endboss, clouds, collectibles, backgroundObjects) {
    this.enemies = enemies; // Array von Feinden
    this.endboss = endboss; // Endboss-Objekt
    this.clouds = clouds; // Array von Wolken
    this.collectibles = collectibles; // Array von Sammelobjekten
    this.backgroundObjects = backgroundObjects; // Array von Hintergrundobjekten
  }
}
