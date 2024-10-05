class Coin extends MovableObject {
  width = 90;
  height = 90;
  y = 370;

  IMAGES_WALKING = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 150 + Math.random() * (2876 - 800);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 250);
  }
}
