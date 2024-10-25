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

  /**
   * Applies gravity to the object, adjusting its vertical position.
   */
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

  /**
   * Increments the coin count by one and plays the collection sound.
   * @returns {number} The new coin count.
   */
  collectCoin() {
    audioManager.playSound("collect");
    return (this.coins += 1);
  }

  /**
   * Increments the bottle count by one.
   * @returns {number} The new bottle count.
   */
  collectBottle() {
    return (this.bottles += 1);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above the ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 250;
    }
  }

  /**
   * Checks if the object is falling.
   * @returns {boolean} True if the object is falling, otherwise false.
   */
  isFalling() {
    return this.speedY < 0;
  }

  /**
   * Checks for a collision with another movable object.
   * @param {MovableObject} mo - The other movable object to check for collision.
   * @returns {boolean} True if there is a collision, otherwise false.
   */
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height
    );
  }

  /**
   * Handles the hit logic when the object receives damage.
   */
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

  /**
   * Handles the hit logic when the object is hit by the end boss.
   */
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

  /**
   * Handles the logic for when the object is hit by the end boss.
   * @param {number} amount - The amount of damage to apply.
   */
  hitFromEndboss(amount) {
    this.energy -= amount;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
    world.healthstatusBar.setPercentage(this.energy);
  }

  /**
   * Checks if the object is currently hurt.
   * @returns {boolean} True if the object was hit recently, otherwise false.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean} True if the object's energy is zero, otherwise false.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Plays an animation using the given array of image paths.
   * @param {string[]} images - An array of image paths for the animation.
   */
  playAnimation(images, frameRate = 2) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage += frameRate;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 25;
    audioManager.playSound("jump");
  }

  /**
   * Marks the object as dead and handles its death logic.
   */
  kill() {
    this.isDead = true;
    this.speed = 0;
    this.playAnimation(this.IMAGES_DEAD);

    setTimeout(() => {
      this.y = 500;
    }, 800);
  }
}
