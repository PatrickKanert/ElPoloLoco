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
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
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
        if (this.keyboard.D && this.character.bottles > 0) {  // Check if the player has bottles to throw
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 60);
            this.throwableObjects.push(bottle);
            this.character.bottles--;  // Reduce bottle count when thrown
            this.bottleStatusBar.setPercentage(this.character.bottles);  // Update bottle status bar
        }
    }

    checkCollisions() {
        // Check collision with enemies (specifically chickens)
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isFalling()) {
                console.log('Character jumped on the chicken');
                enemy.kill(); // Hühnchen töten
                this.character.jump(); // Charakter springt nach dem Töten erneut
            } else if (this.character.isColliding(enemy)) {
                console.log('Character hit by the chicken');
                this.character.hit(); // Charakter wird verletzt, wenn er seitlich kollidiert
                this.healthstatusBar.setPercentage(this.character.energy);
            }
        });

        // Überprüfe die Kollision mit Sammelobjekten (Münzen und Flaschen)
        this.level.collectibles.forEach((collectible, index) => {
            if (this.character.isColliding(collectible)) {
                if (collectible instanceof Coin) {
                    this.character.collectCoin(); // Münze sammeln
                    this.coinStatusbar.setPercentage(this.character.coins); // Statusbalken für Münzen aktualisieren
                    this.level.collectibles.splice(index, 1); // Entferne die gesammelte Münze aus dem Array
                    console.log('Münze gesammelt');
                } else if (collectible instanceof Bottle) {
                    this.character.collectBottle();  // Anzahl der Flaschen erhöhen
                    this.bottleStatusBar.setPercentage(this.character.bottles);  // Statusbalken für Flaschen aktualisieren
                    this.level.collectibles.splice(index, 1);  // Entferne die gesammelte Flasche aus dem Array
                    console.log('Flasche gesammelt');
                }
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Zeichne den Hintergrund
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);

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
        objects.forEach(o => {
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
