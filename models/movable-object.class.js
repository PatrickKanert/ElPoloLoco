class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 3;
  energy = 100;
  coins = 0;
  bottles = 0;
  lastHit = 0;
  isHit = false;

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
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    if (this.isHit) return; // Ignoriere den Treffer, wenn bereits verletzt
    this.isHit = true; // Setze den Zustand auf verletzt

    // Schaden zufügen
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0; // Energie auf 0 setzen, wenn sie negativ wird
    } else {
      this.lastHit = new Date().getTime(); // Zeit des letzten Treffers speichern
    }

    world.healthstatusBar.setPercentage(this.energy); // Aktualisiert die Statusleiste

    // Timeout, um den Trefferstatus zurückzusetzen
    setTimeout(() => {
      this.isHit = false; // Zustand zurücksetzen nach der Verletzung
    }, 300); // Zeit, nach der der Charakter erneut getroffen werden kann
  }

  hitEndboss() {
    if (this.isDead) return; // Wenn der Endboss bereits tot ist, tue nichts
    this.energy -= 15; // Reduziere die Energie um 20 bei jedem Treffer
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead = true; // Markiere den Endboss als tot
      this.dieEndboss(); // Rufe die Sterbemethode auf
    } else {
      this.showHurtAnimation(); // Spiele die "Schmerzen"-Animation ab
      console.log(`Endboss hit! Energy left: ${this.energy}%`);
    }
    world.endbossStatusBar.setPercentage(this.energy);
  }

  hitFromEndboss(amount) {
    this.energy -= amount;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }

    world.healthstatusBar.setPercentage(this.energy); // Aktualisiert die Statusleiste
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
    jumpSound.play();
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
