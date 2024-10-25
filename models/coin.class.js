class Coin extends MovableObject {
  width = 90;
  height = 90;
  y = 370;

  IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(xPos, yPos) {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);
    this.x = xPos;
    this.y = yPos;
    this.animate();
  }

  /**
   * Starts the animation for the coin's appearance.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 250);
  }
}
