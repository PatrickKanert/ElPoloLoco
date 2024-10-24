class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 50;
  y = 250;
  height = 200;
  width = 100;
  groundLevel = 360;
  debugMode = false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this.shouldDrawFrame()) {
      const { offsetX, offsetY, smallerWidth, smallerHeight } =
        this.calculateFrameSize();

      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + offsetX, this.y + offsetY, smallerWidth, smallerHeight);
      ctx.stroke();
    }
  }

  shouldDrawFrame() {
    return (
      this.debugMode &&
      (this instanceof Character ||
        this instanceof Chicken ||
        this instanceof SmallChicken ||
        this instanceof Coin ||
        this instanceof Bottle ||
        this instanceof Endboss)
    );
  }

  calculateFrameSize() {
    if (this instanceof Coin) {
      return this.calculateCoinFrameSize();
    } else if (this instanceof Bottle) {
      return this.calculateBottleFrameSize();
    } else if (this instanceof Character) {
      return this.calculateCharacterFrameSize();
    } else if (this instanceof Endboss) {
      return this.calculateEndbossFrameSize();
    } else {
      return this.calculateDefaultFrameSize();
    }
  }

  calculateCoinFrameSize() {
    const offsetX = 18;
    const offsetY = 18;
    const smallerWidth = this.width - 36;
    const smallerHeight = this.height - 36;
    return {
      offsetX,
      offsetY,
      smallerWidth,
      smallerHeight,
    };
  }

  calculateBottleFrameSize() {
    const offsetX = 10;
    const offsetY = 10;
    const smallerWidth = this.width - 20;
    const smallerHeight = this.height - 20;
    return {
      offsetX,
      offsetY,
      smallerWidth,
      smallerHeight,
    };
  }

  calculateCharacterFrameSize() {
    const offsetX = 10;
    const offsetY = 70;
    const smallerWidth = this.width - 20;
    const smallerHeight = this.height - 70;
    return {
      offsetX,
      offsetY,
      smallerWidth,
      smallerHeight,
    };
  }

  calculateEndbossFrameSize() {
    const offsetX = 0;
    const offsetY = 60;
    const smallerWidth = this.width;
    const smallerHeight = this.height - 70;
    return {
      offsetX,
      offsetY,
      smallerWidth,
      smallerHeight,
    };
  }

  calculateDefaultFrameSize() {
    return {
      offsetX: 0,
      offsetY: 0,
      smallerWidth: this.width,
      smallerHeight: this.height,
    };
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
