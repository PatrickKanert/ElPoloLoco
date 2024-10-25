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

  /**
   * Binds keyboard events for key down and key up actions.
   * - Arrow Right (39) sets RIGHT to true.
   * - Arrow Left (37) sets LEFT to true.
   * - Spacebar (32) sets SPACE to true.
   * - D key (68) sets D to true.
   */
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

  /**
   * Binds touch events to the on-screen buttons for mobile controls.
   * - btnLeft sets LEFT to true on touch start and false on touch end.
   * - btnRight sets RIGHT to true on touch start and false on touch end.
   * - btnJump sets SPACE to true on touch start and false on touch end.
   * - btnThrow sets D to true on touch start and false on touch end.
   */
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
