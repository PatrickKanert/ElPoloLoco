class Cloud extends MovableObject {
  width = 600;
  height = 350;
  y = 15;

  IMAGES_CLOUDS = [
    "img/5_background/layers/4_clouds/1.png",
    "img/5_background/layers/4_clouds/2.png",
  ];

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.loadImages(this.IMAGES_CLOUDS);
    this.x = 0 + Math.random() * 2200;
    this.speed = 0.05 + Math.random() * 0.1;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
