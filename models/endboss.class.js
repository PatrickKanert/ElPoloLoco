class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  energy = 100;
  speed = 10;
  hurtTimeout = null;
  isDead = false;
  isHurt = false;
  isWatching = true;
  isWalking = false;
  isAttacking = false;
  statusbarVisible = false;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_WATCHING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor(audioManager) {
    super(audioManager).loadImage(this.IMAGES_WATCHING[0]);
    this.loadImages(this.IMAGES_WATCHING);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2500;
    this.animate();
  }

  /**
   * Starts the animation loop for the end boss.
   */
  animate() {
    setStoppableInterval(() => {
      this.moveToCharacter(world.character);
      this.handleAnimation();
    }, 120);
  }

  /**
   * Handles the animation state based on the end boss's current status.
   */
  handleAnimation() {
    if (this.isDead) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAttacking) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else if (this.isWalking) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playAnimation(this.IMAGES_WATCHING);
    }
  }

  /**
   * Sets the visibility of the end boss's status bar.
   * @param {boolean} visible - Whether the status bar should be visible.
   */
  setStatusbarVisibility(visible) {
    this.statusbarVisible = visible;
  }

  /**
   * Makes the status bar visible.
   */
  showStatusbar() {
    this.setStatusbarVisibility(true);
  }

  /**
   * Hides the status bar.
   */
  hideStatusbar() {
    this.setStatusbarVisibility(false);
  }

  /**
   * Moves the end boss towards the character if certain conditions are met.
   * @param {Character} character - The character the end boss is targeting.
   */
  moveToCharacter(character) {
    if (this.isDead || this.isHurt || this.isAttacking) return;

    let distanceToCharacter = this.x - character.x;

    if (Math.abs(distanceToCharacter) < 500) {
      this.startFollowing();
    }
    if (this.isFollowing) {
      this.followCharacter(distanceToCharacter);
    }
  }

  /**
   * Starts following the character and shows the status bar.
   */
  startFollowing() {
    this.isFollowing = true;
    this.showStatusbar();
  }

  /**
   * Follows the character based on the distance to the character.
   * @param {number} distanceToCharacter - The distance to the character.
   */
  followCharacter(distanceToCharacter) {
    this.isWalking = true;
    if (distanceToCharacter > 0) {
      this.otherDirection = false;
      this.moveLeft();
    } else {
      this.otherDirection = true;
      this.moveRight();
    }

    if (this.isColliding(world.character)) {
      this.attack();
    }
  }

  /**
   * Initiates an attack by the end boss.
   */
  attack() {
    if (this.isAttacking) return;

    this.isAttacking = true;
    this.playAnimation(this.IMAGES_ATTACK);
    this.checkCharacterCollision();

    setTimeout(() => {
      this.isAttacking = false;
      if (!this.isDead) {
        this.isWalking = true;
      }
    }, 500);
  }

  /**
   * Checks for collision with the character and applies damage if necessary.
   */
  checkCharacterCollision() {
    if (this.isColliding(world.character)) {
      world.character.hitFromEndboss(19);
    }
  }

  /**
   * Shows the hurt animation when the end boss takes damage.
   */
  showHurtAnimation() {
    if (this.hurtTimeout) {
      clearTimeout(this.hurtTimeout);
    }

    this.isHurt = true;
    this.playAnimation(this.IMAGES_HURT);
    audioManager.playSound("chicken");

    this.hurtTimeout = setTimeout(() => this.endHurtAnimation(), 500);
  }

  /**
   * Ends the hurt animation and returns to walking state if not dead.
   */
  endHurtAnimation() {
    this.isHurt = false;
    if (!this.isDead) {
      this.isWalking = true;
    }
  }

  /**
   * Handles the death of the end boss, changing its state and animation.
   */
  dieEndboss() {
    this.isDead = true;
    this.y = 100;
    this.playAnimation(this.IMAGES_DEAD);
  }

  /**
   * Checks if the end boss is dead based on its energy level.
   * @returns {boolean} True if the end boss is dead, false otherwise.
   */
  isEndbossDead() {
    return this.energy <= 0;
  }
}
