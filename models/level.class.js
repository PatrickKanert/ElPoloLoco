class Level {
  level_end_x = 719 * 3;
  enemies;
  clouds;
  collectibles;
  backgroundObjects;

  constructor(enemies, clouds, collectibles, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.collectibles = collectibles;
    this.backgroundObjects = backgroundObjects;
  }
}
