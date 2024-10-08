class ThrowableObject extends MovableObject {
  IMAGES_BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.throw();
  }

  throw() {
    this.speedY = 30; // Anfangsgeschwindigkeit der Flasche nach oben
    this.applyGravityForBottle(); // Wende Schwerkraft auf die Flasche an

    let direction = world.character.otherDirection ? -1 : 1; // Blickrichtung des Charakters (links = -1, rechts = 1)

    this.rotationInterval = setInterval(() => {
      this.x += 12 * direction; // Bewege die Flasche nach links oder rechts

      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION); // Spiele Rotationsanimation ab
      }
    }, 25);
  }

  applyGravityForBottle() {
    this.gravityInterval = setInterval(() => {
      if (this.isBottleAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.land(); // Wenn die Flasche den Boden erreicht, führe Landungslogik aus
      }
    }, 1000 / 25);
  }

  isBottleAboveGround() {
    // Überprüfe, ob die Flasche über dem Boden-Level ist
    return this.y < this.groundLevel;
  }

  land() {
    clearInterval(this.rotationInterval); // Stoppe die Flugbewegung
    clearInterval(this.gravityInterval); // Stoppe die Schwerkraft

    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_SPLASH); // Spiele Splash-Animation ab
    }, 40);

    setTimeout(() => {
      world.throwableObjects.splice(world.bottleIndex, 1); // Entferne die Flasche nach Kollision
    }, 400); // Warte 600ms (Dauer der Splash-Animation)
  }
}
