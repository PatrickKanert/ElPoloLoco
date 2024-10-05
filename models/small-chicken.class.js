class SmallChicken extends MovableObject {
  width = 50;
  height = 50;
  y = 395;
  isDead = false; // Flag to check if chicken is dead

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 400 + Math.random() * 2200; // Randomize position
    this.speed = 0.15 + Math.random() * 0.5; // Randomize speed
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isDead) {
        // Move only if the chicken is alive
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        // Play walking animation only if the chicken is alive
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 250);
  }
}
