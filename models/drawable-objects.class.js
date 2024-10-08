class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 50;
  y = 250;
  height = 200;
  width = 100;
  groundLevel = 360;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof SmallChicken ||
      this instanceof Coin ||
      this instanceof Bottle ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";

      if (this instanceof Coin) {
        const offsetX = 18; // Verschiebe den Rahmen nach innen (horizontal)
        const offsetY = 18; // Verschiebe den Rahmen nach innen (vertikal)
        const smallerWidth = this.width - 36; // Rahmen um 36 Pixel kleiner (18 Pixel pro Seite)
        const smallerHeight = this.height - 36; // Rahmen um 36 Pixel kleiner (18 Pixel pro Seite)
        ctx.rect(
          this.x + offsetX,
          this.y + offsetY,
          smallerWidth,
          smallerHeight
        );
      } else if (this instanceof Bottle) {
        const offsetX = 10; // Verschiebe den Rahmen nach innen (horizontal)
        const offsetY = 10; // Verschiebe den Rahmen nach innen (vertikal)
        const smallerWidth = this.width - 20; // Rahmen um 20 Pixel kleiner (10 Pixel pro Seite)
        const smallerHeight = this.height - 20; // Rahmen um 20 Pixel kleiner (10 Pixel pro Seite)
        ctx.rect(
          this.x + offsetX,
          this.y + offsetY,
          smallerWidth,
          smallerHeight
        );
      } else if (this instanceof Character) {
        const offsetX = 10; // Verschiebe den Rahmen nach innen (horizontal)
        const offsetY = 70; // Verschiebe den Rahmen nach innen (vertikal)
        const smallerWidth = this.width - 20; // Rahmen um 20 Pixel kleiner (10 Pixel pro Seite)
        const smallerHeight = this.height - 70; // Rahmen um 20 Pixel kleiner (10 Pixel pro Seite)
        ctx.rect(
          this.x + offsetX,
          this.y + offsetY,
          smallerWidth,
          smallerHeight
        );
      } else if (this instanceof Endboss) {
        // Rahmen für den Endboss
        const offsetX = 0; // Verschiebe den Rahmen nach innen (horizontal)
        const offsetY = 60; // Verschiebe den Rahmen nach innen (vertikal)
        const smallerWidth = this.width - 0; // Rahmen um 40 Pixel kleiner (20 Pixel pro Seite)
        const smallerHeight = this.height - 70; // Rahmen um 40 Pixel kleiner (20 Pixel pro Seite)
        ctx.rect(
          this.x + offsetX,
          this.y + offsetY,
          smallerWidth,
          smallerHeight
        );
      } else {
        ctx.rect(this.x, this.y, this.width, this.height);
      }

      ctx.stroke();
    }
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
