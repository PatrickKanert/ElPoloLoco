class World {
  character = new Character();
  endboss = new Endboss();
  level = null;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthstatusBar = new healthStatusBar();
  coinStatusbar = new CoinStatusBar();
  bottleStatusBar = new BottleStatusBar();
  endbossStatusBar = new EndbossStatusBar();
  throwableObjects = [];
  dKeyPressed = false;
  gameOver = false;
  gameInterval;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.level = null;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the level for the world.
   * @param {Object} level - The level object to be set.
   */
  setLevel(level) {
    this.level = level;
  }

  /**
   * Initializes the world, setting character properties and level.
   */
  setWorld() {
    this.character.world = this;
    this.level = level1;
  }

  /**
   * Starts the game loop.
   */
  run() {
    this.gameInterval = setStoppableInterval(() => {
      if (!this.gameOver) {
        this.checkCollisions();
        this.checkThrowObjects();
      }
    }, 1000 / 60);
  }

  /**
   * Checks for thrown objects and handles their actions.
   */
  checkThrowObjects() {
    if (this.keyboard.D && !this.dKeyPressed && this.character.bottles > 0) {
      this.throwBottle();
      this.scheduleKeyReset();
    }

    if (!this.keyboard.D) {
      this.dKeyPressed = false;
    }
  }

  /**
   * Handles the throwing of a bottle.
   */
  throwBottle() {
    this.dKeyPressed = true;
    let bottle = new ThrowableObject(
      this.character.x + 38,
      this.character.y + 60
    );
    this.throwableObjects.push(bottle);
    this.character.bottles--;
    this.bottleStatusBar.setPercentage(this.character.bottles);
  }

  /**
   * Resets the D key press status after a delay.
   */
  scheduleKeyReset() {
    setTimeout(() => {
      this.dKeyPressed = false;
    }, 1500);
  }

  /**
   * Checks for collisions between game objects.
   */
  checkCollisions() {
    if (this.level) {
      this.checkCharacterEnemyCollision();
      this.checkBottleEnemyCollision();
      this.checkCollectibleCollision();
      this.checkBottleEndbossCollision();
      this.winLose();
    }
  }

  /**
   * Checks for collisions with collectible items.
   */
  checkCollectibleCollision() {
    const maxBottles = 10;

    this.level.collectibles.forEach((collectible, index) => {
      if (this.character.isColliding(collectible)) {
        if (collectible instanceof Coin) {
          this.collectCoin(collectible, index);
        } else if (collectible instanceof Bottle) {
          this.collectBottle(collectible, index, maxBottles);
        }
      }
    });
  }

  /**
   * Collects a coin and updates the status bar.
   * @param {Coin} collectible - The coin to collect.
   * @param {number} index - The index of the coin in the collectibles array.
   */
  collectCoin(collectible, index) {
    this.character.collectCoin();
    this.coinStatusbar.setPercentage(this.character.coins);
    this.level.collectibles.splice(index, 1);
  }

  /**
   * Collects a bottle and updates the status bar.
   * @param {Bottle} collectible - The bottle to collect.
   * @param {number} index - The index of the bottle in the collectibles array.
   * @param {number} maxBottles - The maximum number of bottles the character can hold.
   */
  collectBottle(collectible, index, maxBottles) {
    if (this.character.bottles < maxBottles) {
      this.character.collectBottle();
      this.bottleStatusBar.setPercentage(this.character.bottles);
      this.level.collectibles.splice(index, 1);
    }
  }

  /**
   * Checks for collisions between thrown bottles and enemies.
   */
  checkBottleEnemyCollision() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          enemy.kill();
          this.throwableObjects.splice(bottleIndex, 1);
        }
      });
    });
  }

  /**
   * Checks for collisions between thrown bottles and the end boss.
   */
  checkBottleEndbossCollision() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      if (bottle.isColliding(this.endboss)) {
        this.endboss.hitEndboss();
        this.throwableObjects.splice(bottleIndex, 1);
      }
    });
  }

  /**
   * Checks for collisions between the character and enemies.
   */
  checkCharacterEnemyCollision() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead) {
        return;
      }

      if (this.character.isColliding(enemy) && this.character.isFalling()) {
        enemy.kill();
        this.character.jump();
      } else if (this.character.isColliding(enemy)) {
        this.character.hit();
      }
    });
  }

  /**
   * Displays the win or lose screen based on the game outcome.
   * @param {boolean} isWin - Indicates if the player has won.
   */
  displayWinLoseScreen(isWin) {
    document.getElementById("winOrLoseScreen").classList.remove("d-none");
    document
      .getElementById("winOrLoseScreen")
      .classList.add(isWin ? "win" : "lose");
    document.getElementById("winOrLoseScreen").innerHTML = isWin
      ? htmlWin()
      : htmlLose();
  }

  /**
   * Checks for win or lose conditions.
   */
  winLose() {
    let gameEnded = false;

    const showScreen = (isWin) => {
      this.displayWinLoseScreen(isWin);
    };

    let winLoseInterval = setStoppableInterval(() => {
      if (!gameEnded) {
        this.checkGameEndConditions(showScreen);
      }
    }, 500);
  }

  /**
   * Checks the conditions for winning or losing the game.
   * @param {Function} showScreen - The function to call to display the win/lose screen.
   */
  checkGameEndConditions(showScreen) {
    if (this.character.energy <= 0) {
      this.handleGameLoss(showScreen);
    } else if (this.endboss.isEndbossDead()) {
      this.handleGameWin(showScreen);
    }
  }

  /**
   * Handles the game loss scenario.
   * @param {Function} showScreen - The function to call to display the win/lose screen.
   */
  handleGameLoss(showScreen) {
    showScreen(false);
    stopGame();
    audioManager.playSound("lose");
  }

  /**
   * Handles the game win scenario.
   * @param {Function} showScreen - The function to call to display the win/lose screen.
   */
  handleGameWin(showScreen) {
    setTimeout(() => {
      showScreen(true);
      stopGame();
      audioManager.playSound("win");
    }, 1000);
  }

  /**
   * Draws the game world and all its objects on the canvas.
   */
  draw() {
    if (this.gameOver) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.level && this.level.backgroundObjects) {
      this.drawBackgroundObjects();
    }
    if (this.level) {
      this.drawLevelObjects();
    }

    this.drawStatusBars();
    this.continueDrawing();
  }

  /**
   * Draws background objects on the canvas.
   */
  drawBackgroundObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws level objects on the canvas.
   */
  drawLevelObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.endboss);
    this.addObjectsToMap(this.level.collectibles);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Continues the drawing loop using requestAnimationFrame.
   */
  continueDrawing() {
    if (!this.gameOver) {
      let self = this;
      requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  /**
   * Draws the status bars on the canvas.
   */
  drawStatusBars() {
    if (this.endboss.statusbarVisible) {
      this.addToMap(this.endbossStatusBar);
    }
    this.addToMap(this.healthstatusBar);
    this.addToMap(this.coinStatusbar);
    this.addToMap(this.bottleStatusBar);
  }

  /**
   * Adds multiple objects to the map.
   * @param {Array} objects - The objects to be added.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a movable object to the map.
   * @param {MovableObject} mo - The movable object to be added.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image of a movable object for drawing.
   * @param {MovableObject} mo - The movable object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the canvas state after flipping an image.
   * @param {MovableObject} mo - The movable object that was flipped.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
