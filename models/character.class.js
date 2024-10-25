class Character extends MovableObject {
  speed = 8;
  y = 250;
  lastMoveTime = Date.now();
  idleTimeout = 5000;
  isJumping = false;
  world;

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Creates an instance of Character.
   */
  constructor() {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
    this.animationInterval = null;
    this.currentImageIndex = 0;
  }

  /**
   * Starts the animation intervals for movement and character animation.
   */
  animate() {
    setStoppableInterval(() => this.handleMovement(), 1000 / 60);
    setStoppableInterval(() => this.handleAnimation(), 100);
  }

  /**
   * Handles the character's movement logic.
   */
  handleMovement() {
    if (this.world.level && this.world.level.level_end_x) {
      this.handleHorizontalMovement();
      this.handleJump();
    }

    this.world.camera_x = -this.x + 100;
  }

  /**
   * Handles horizontal movement based on keyboard input.
   */
  handleHorizontalMovement() {
    const isMovingRight =
      this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    const isMovingLeft = this.world.keyboard.LEFT && this.x > 0;

    if (isMovingRight) {
      this.moveRight();
      this.otherDirection = false;
      this.updateLastMoveTime();
    } else if (isMovingLeft) {
      this.moveLeft();
      this.otherDirection = true;
      this.updateLastMoveTime();
    }
    this.manageRunningSound(isMovingRight || isMovingLeft);
  }

  /**
   * Manages the sound of the character's running action.
   * @param {boolean} isMoving - Indicates whether the character is moving.
   */
  manageRunningSound(isMoving) {
    if (isMoving) {
      if (!this.isAboveGround()) {
        audioManager.playSound("running");
      }
    } else {
      audioManager.stopSound("running");
    }
  }

  /**
   * Handles the jumping logic for the character.
   */
  handleJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.isJumping) {
      this.isJumping = true;
      this.jump();
      this.updateLastMoveTime();
    }
  }

  /**
   * Handles character animations based on the character's state.
   */
  handleAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else {
      this.isJumping = false;
      this.handleIdleAnimation();
      this.handleWalkingAnimation();
    }
  }

  /**
   * Handles the idle animation of the character.
   */
  handleIdleAnimation() {
    const timeSinceLastMove = Date.now() - this.lastMoveTime;

    if (timeSinceLastMove >= this.idleTimeout) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Handles the walking animation when the character is moving.
   */
  handleWalkingAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Updates the last move time to the current time.
   */
  updateLastMoveTime() {
    this.lastMoveTime = Date.now();
  }

  /**
   * Collects an item of the specified type.
   * @param {string} type - The type of item collected (e.g., "bottle", "coin").
   */
  collectItem(type) {
    if (type === "bottle") {
      this.bottles++;
      this.world.bottleStatusBar.setPercentage(this.bottles);
    } else if (type === "coin") {
      this.coins++;
    }
  }
}
