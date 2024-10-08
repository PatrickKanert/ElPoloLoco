class World {
  character = new Character();
  level = level1;

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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 1000 / 60);
  }

  checkThrowObjects() {
    // Prüfen, ob die Taste D gedrückt wurde und der Charakter Flaschen hat
    if (this.keyboard.D && !this.dKeyPressed && this.character.bottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 38,
        this.character.y + 60
      );
      this.throwableObjects.push(bottle);
      this.character.bottles--; // Reduziere die Anzahl der Flaschen
      this.bottleStatusBar.setPercentage(this.character.bottles); // Aktualisiere die Statusleiste

      this.dKeyPressed = true; // Merken, dass die Taste gedrückt wurde
    }

    // Wenn die Taste D losgelassen wird, setze den Zustand zurück
    if (!this.keyboard.D) {
      this.dKeyPressed = false; // Zurücksetzen, um auf den nächsten Tastendruck zu warten
    }
  }

  checkCollisions() {
    this.checkCharacterEnemyCollision(); // Kollision zwischen Charakter und Feinden
    this.checkBottleEnemyCollision(); // Kollision zwischen Flaschen und Feinden
    this.checkCollectibleCollision(); // Kollision mit Sammelobjekten
    this.checkBottleEndbossCollision(); // Kollision zwischen Flaschen und Endboss
  }

  checkCollectibleCollision() {
    this.level.collectibles.forEach((collectible, index) => {
      if (this.character.isColliding(collectible)) {
        if (collectible instanceof Coin) {
          this.character.collectCoin(); // Münze sammeln
          this.coinStatusbar.setPercentage(this.character.coins); // Statusbalken für Münzen aktualisieren
          this.level.collectibles.splice(index, 1); // Entferne die gesammelte Münze aus dem Array
          console.log("Münze gesammelt");
        } else if (collectible instanceof Bottle) {
          this.character.collectBottle(); // Anzahl der Flaschen erhöhen
          this.bottleStatusBar.setPercentage(this.character.bottles); // Statusbalken für Flaschen aktualisieren
          this.level.collectibles.splice(index, 1); // Entferne die gesammelte Flasche aus dem Array
          console.log("Flasche gesammelt");
        }
      }
    });
  }

  checkBottleEnemyCollision() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          console.log("Bottle hit the chicken");
          enemy.kill(); // Hühnchen töten
          this.throwableObjects.splice(bottleIndex, 1); // Entferne die Flasche nach Kollision
        }
      });
    });
  }

  checkBottleEndbossCollision() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      if (bottle.isColliding(this.level.endboss)) {
        console.log("Bottle hit the Endboss");
        this.level.endboss.hitEndboss();
        this.throwableObjects.splice(bottleIndex, 1); // Flasche entfernen
      }
    });
  }

  checkCharacterEnemyCollision() {
    this.level.enemies.forEach((enemy) => {
      // Wenn das Hühnchen tot ist, ignoriere es
      if (enemy.isDead) {
        return; // Überspringe die weiteren Überprüfungen für dieses Hühnchen
      }

      // Prüfe, ob der Charakter auf das Hühnchen springt
      if (this.character.isColliding(enemy) && this.character.isFalling()) {
        console.log("Character jumped on the chicken");
        enemy.kill(); // Hühnchen töten
        this.character.jump(); // Charakter springt nach dem Töten erneut
      }
      // Prüfe, ob der Charakter seitlich mit dem Hühnchen kollidiert
      else if (this.character.isColliding(enemy)) {
        console.log("Character hit by the chicken");
        this.character.hit(); // Charakter wird verletzt
        console.log(this.character.energy);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Zeichne den Hintergrund
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);

    if (this.level.endboss.statusbarVisible) {
      this.addToMap(this.endbossStatusBar);
    }

    // ------ Space for fixed objects ------
    // Stelle sicher, dass die Statusleisten hier gezeichnet werden
    this.addToMap(this.healthstatusBar);
    this.addToMap(this.coinStatusbar);
    this.addToMap(this.bottleStatusBar);

    // Zeichne die anderen Objekte
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    if (this.level.endboss.statusbarVisible) {
      this.addToMap(this.level.endboss); // Zeichne den Endboss, wenn sichtbar
    }
    this.addToMap(this.level.endboss);
    this.addObjectsToMap(this.level.collectibles);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    // Draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
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
