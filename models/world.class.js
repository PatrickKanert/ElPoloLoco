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

  setLevel(level) {
    this.level = level;
  }

  setWorld() {
    this.character.world = this;
    this.level = level1;
  }

  run() {
    this.gameInterval = setStoppableInterval(() => {
      if (!this.gameOver) {
        this.checkCollisions();
        this.checkThrowObjects();
      }
    }, 1000 / 60);
  }

  checkThrowObjects() {
    if (this.keyboard.D && !this.dKeyPressed && this.character.bottles > 0) {
      this.dKeyPressed = true;
      let bottle = new ThrowableObject(
        this.character.x + 38,
        this.character.y + 60
      );
      this.throwableObjects.push(bottle);
      this.character.bottles--;
      this.bottleStatusBar.setPercentage(this.character.bottles);

      setTimeout(() => {
        this.dKeyPressed = false;
      }, 500);
    }

    if (!this.keyboard.D) {
      this.dKeyPressed = false;
    }
  }

  checkCollisions() {
    if (this.level) {
      this.checkCharacterEnemyCollision();
      this.checkBottleEnemyCollision();
      this.checkCollectibleCollision();
      this.checkBottleEndbossCollision();
      this.winLose();
    }
  }

  checkCollectibleCollision() {
    this.level.collectibles.forEach((collectible, index) => {
      if (this.character.isColliding(collectible)) {
        if (collectible instanceof Coin) {
          this.character.collectCoin();
          collect.play();
          this.coinStatusbar.setPercentage(this.character.coins);
          this.level.collectibles.splice(index, 1);
        } else if (collectible instanceof Bottle) {
          collect.play();
          this.character.collectBottle();
          this.bottleStatusBar.setPercentage(this.character.bottles);
          this.level.collectibles.splice(index, 1);
        }
      }
    });
  }

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

  checkBottleEndbossCollision() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      if (bottle.isColliding(this.endboss)) {
        this.endboss.hitEndboss();
        this.throwableObjects.splice(bottleIndex, 1);
      }
    });
  }

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

  displayWinLoseScreen(isWin) {
    const winOrLoseScreen = document.getElementById("winOrLoseScreen");
    winOrLoseScreen.classList.remove("d-none");
    winOrLoseScreen.classList.add(isWin ? "win" : "lose");
    winOrLoseScreen.innerHTML = isWin ? htmlWin() : htmlLose();
  }

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

  checkGameEndConditions(showScreen) {
    if (this.character.energy <= 0) {
      this.handleGameLoss(showScreen);
    } else if (this.endboss.isEndbossDead()) {
      this.handleGameWin(showScreen);
    }
  }

  handleGameLoss(showScreen) {
    loseSound.play();
    showScreen(false);
    stopGame();
  }

  handleGameWin(showScreen) {
    winSound.play();
    setTimeout(() => {
      showScreen(true);
      stopGame();
    }, 1000);
  }

  draw() {
    if (this.gameOver) {
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.level && this.level.backgroundObjects) {
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.ctx.translate(-this.camera_x, 0);
    }

    if (this.endboss.statusbarVisible) {
      this.addToMap(this.endbossStatusBar);
    }

    this.addToMap(this.healthstatusBar);
    this.addToMap(this.coinStatusbar);
    this.addToMap(this.bottleStatusBar);

    if (this.level) {
      this.ctx.translate(this.camera_x, 0);
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.clouds);
      this.addObjectsToMap(this.level.enemies);
      this.addToMap(this.endboss);
      this.addObjectsToMap(this.level.collectibles);
      this.addObjectsToMap(this.throwableObjects);
      this.ctx.translate(-this.camera_x, 0);
    }

    if (!this.gameOver) {
      let self = this;
      requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

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

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
