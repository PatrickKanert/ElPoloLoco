class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  constructor() {
    this.bindKeyPressEvents();
    this.bindButtonPressEvents();
  }

  bindKeyPressEvents() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 39) {
        this.RIGHT = true;
      }

      if (e.keyCode === 37) {
        this.LEFT = true;
      }

      if (e.keyCode === 32) {
        this.SPACE = true;
      }

      if (e.keyCode === 68) {
        this.D = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.keyCode === 39) {
        this.RIGHT = false;
      }

      if (e.keyCode === 37) {
        this.LEFT = false;
      }

      if (e.keyCode === 32) {
        this.SPACE = false;
      }

      if (e.keyCode === 68) {
        this.D = false;
      }
    });
  }

  bindButtonPressEvents() {
    document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.LEFT = true;
    });

    document.getElementById("btnRight").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.RIGHT = true;
    });

    document.getElementById("btnJump").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.SPACE = true;
    });

    document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.D = true;
    });

    document.getElementById("btnLeft").addEventListener("touchend", () => {
      this.LEFT = false;
    });

    document.getElementById("btnRight").addEventListener("touchend", () => {
      this.RIGHT = false;
    });

    document.getElementById("btnJump").addEventListener("touchend", () => {
      this.SPACE = false;
    });

    document.getElementById("btnThrow").addEventListener("touchend", () => {
      this.D = false;
    });
  }
}
