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
        }, 200);
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
        // Check collision with enemies
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthstatusBar.setPercentage(this.character.energy);
                this.character.collectCoin();  // Erhöhe die Coin-Anzahl
                this.bottleStatusBar.collectBottle;

            }
        });
    
        // Check collision with coins
        this.level.collectibles.forEach((collectible, index) => {
            if (collectible instanceof Coin && this.character.isColliding(collectible)) {
                this.character.collectCoin();
                this.coinStatusbar.setPercentage(this.character.coins);
                this.level.collectibles.splice(index, 1);
            }
        });
    
        // Check collision with bottles
        this.level.collectibles.forEach((collectible, index) => {
            if (collectible instanceof Bottle && this.character.isColliding(collectible)) {
                this.character.collectBottle();  // Increase the bottle count
                this.bottleStatusBar.setPercentage(this.character.bottles);  // Update bottle status bar
                this.level.collectibles.splice(index, 1);  // Remove collected bottle from the array
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
