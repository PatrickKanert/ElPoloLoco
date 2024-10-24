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
    setStoppableInterval(() => {
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
    audioManager.playSound("collect");
    return (this.coins += 1);
  }

  collectBottle() {
    return (this.bottles += 1);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 250;
    }
  }

  isFalling() {
    return this.speedY < 0;
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
    if (this.isHit) return;
    this.isHit = true;

    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
    world.healthstatusBar.setPercentage(this.energy);

    setTimeout(() => {
      this.isHit = false;
    }, 300);
  }

  hitEndboss() {
    if (this.isDead) return;
    this.energy -= 15;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead = true;
      this.dieEndboss();
    } else {
      this.showHurtAnimation();
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
    world.healthstatusBar.setPercentage(this.energy);
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
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
    this.speedY = 25;
    audioManager.playSound("jump");
  }

  kill() {
    this.isDead = true;
    this.speed = 0;
    this.playAnimation(this.IMAGES_DEAD);

    setTimeout(() => {
      this.y = 500;
    }, 800);
  }
}
