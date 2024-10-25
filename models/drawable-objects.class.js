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

  /**
   * Loads an image from the specified path.
   * @param {string} path - The path to the image to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a frame around the object if debug mode is enabled.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
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

  /**
   * Determines whether to draw the frame based on debug mode and object type.
   * @returns {boolean} True if the frame should be drawn; otherwise, false.
   */
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

  /**
   * Calculates the frame size based on the type of object.
   * @returns {{offsetX: number, offsetY: number, smallerWidth: number, smallerHeight: number}} The calculated frame size.
   */
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

  /**
   * Calculates the frame size for coins.
   * @returns {{offsetX: number, offsetY: number, smallerWidth: number, smallerHeight: number}} The calculated frame size for coins.
   */
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

  /**
   * Calculates the frame size for bottles.
   * @returns {{offsetX: number, offsetY: number, smallerWidth: number, smallerHeight: number}} The calculated frame size for bottles.
   */
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

  /**
   * Calculates the frame size for characters.
   * @returns {{offsetX: number, offsetY: number, smallerWidth: number, smallerHeight: number}} The calculated frame size for characters.
   */
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

  /**
   * Calculates the frame size for end bosses.
   * @returns {{offsetX: number, offsetY: number, smallerWidth: number, smallerHeight: number}} The calculated frame size for end bosses.
   */
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

  /**
   * Calculates the default frame size.
   * @returns {{offsetX: number, offsetY: number, smallerWidth: number, smallerHeight: number}} The default frame size.
   */
  calculateDefaultFrameSize() {
    return {
      offsetX: 0,
      offsetY: 0,
      smallerWidth: this.width,
      smallerHeight: this.height,
    };
  }

  /**
   * Loads multiple images from an array of paths into the image cache.
   * @param {string[]} arr - An array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
