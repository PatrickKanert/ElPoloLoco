class BottleStatusBar extends DrawableObject {
  IMAGES_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  percentage = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 10;
    this.y = 80;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0); // Set initial percentage to 0
  }

  setPercentage(bottles) {
    this.percentage = bottles * 20; // Set percentage based on number of bottles
    this.percentage = Math.min(this.percentage, 100); // Cap at 100%
    let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5; // 5 Bottles
    } else if (this.percentage >= 80) {
      return 4; // 4 Bottles
    } else if (this.percentage >= 60) {
      return 3; // 3 Bottles
    } else if (this.percentage >= 40) {
      return 2; // 2 Bottles
    } else if (this.percentage >= 20) {
      return 1; // 1 Bottle
    } else {
      return 0; // 0 Bottles
    }
  }
}
