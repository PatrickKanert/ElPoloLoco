class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x - 15;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  throw() {
    this.speedY = 30; // Anfangsgeschwindigkeit der Flasche nach oben
    this.applyGravityForBottle(); // Wende Schwerkraft auf die Flasche an

    let direction = world.character.otherDirection ? -1 : 1; // Überprüfe die Blickrichtung des Charakters (links = -1, rechts = 1)

    setInterval(() => {
      this.x += 12 * direction; // Bewege die Flasche nach links oder rechts
    }, 25);
  }

  applyGravityForBottle() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }
}
