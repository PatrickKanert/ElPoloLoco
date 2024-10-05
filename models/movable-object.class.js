class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 3;
  energy = 100;
  coins = 0;
  bottles = 0;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (world.character.y >= 250) {
          this.y = 250;
          this.speedY = 0;
        }
      }
    }, 1000 / 25);
  }

  collectCoin() {
    return (this.coins += 1);
  }

  collectBottle() {
    return (this.bottles += 1);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // Throwable objects should always fall
      return true;
    } else {
      return this.y < 250;
    }
  }

  isFalling() {
    return this.speedY < 0; // Prüft, ob der Charakter nach unten fällt
  }

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  takeDamagefromEndboss(amount) {
    this.energy -= amount; // Reduziere die Energie des Charakters
    if (this.energy <= 0) {
      this.energy = 0;
      this.die(); // Rufe die Methode zum Sterben des Charakters auf
    }

    // Zugriff auf die bereits existierende Statusleiste in 'world' und aktualisieren
    world.healthstatusBar.setPercentage(this.energy); // Aktualisiert die Statusleiste

    console.log(
      `Character took ${amount} damage! Energy left: ${this.energy}%`
    );
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 0.5;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }

  kill() {
    console.log("Chicken killed"); // Zum Testen, ob die Methode aufgerufen wird
    this.isDead = true; // Markiere das Hühnchen als tot
    this.speed = 0; // Stoppe die Bewegung des Hühnchens
    this.playAnimation(this.IMAGES_DEAD); // Spiele die Sterbeanimation ab

    // Optional: Entferne das Hühnchen nach kurzer Zeit
    setTimeout(() => {
      this.y = 500; // Entferne das Hühnchen aus dem sichtbaren Bereich
    }, 800);
  }

  die() {
    console.log("Character is dead");
  }
}
