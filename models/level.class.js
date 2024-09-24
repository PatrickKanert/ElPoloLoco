class Level {
    level_end_x = 719 * 3;
    enemies;
    clouds;
    collectibles; // Neues Array für die Sammlerstücke

    constructor(enemies, clouds, collectibles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.collectibles = collectibles; // Hier wird das Array initialisiert
        this.backgroundObjects = backgroundObjects;
    }
}

