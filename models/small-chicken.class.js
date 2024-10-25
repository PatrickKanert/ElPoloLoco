class SmallChicken extends MovableObject {
  width = 50;
  height = 50;
  y = 395;
  isDead = false;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"]; // Image path for the dead animation

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 400 + Math.random() * 2200; // Random horizontal position
    this.speed = 0.2 + Math.random() * 0.5; // Random speed
    this.animate(); // Start the animation
  }

  /**
   * Starts the animation for the chicken.
   * The chicken moves left and plays walking animation at regular intervals.
   */
  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 250);
  }
}
