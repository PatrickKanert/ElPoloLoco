class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 55;


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'

    ];


    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]


    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2500;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 250);
    }

    takeHit() {
        this.hitsTaken++;
        console.log(`Hits taken: ${this.hitsTaken}`);

        if (this.hitsTaken >= 3) {
            this.die(); // Wenn 3 Treffer erreicht sind, Boss sterben lassen
        } else {
            this.playAnimation(this.IMAGES_HURT); // Bei jedem Hit Animation abspielen
        }
    }


    // Methode, um den Boss zu töten
    die() {
        console.log('Endboss killed');
        this.isDead = true; // Markiere den Boss als tot
        this.playAnimation(this.IMAGES_DEAD); // Sterbeanimation abspielen

        // Optional: Entferne den Boss nach einer Zeit
        setTimeout(() => {
            this.y = 500; // Entferne den Boss aus dem sichtbaren Bereich
        }, 800);
    }
}








// class Endboss extends MovableObject {
//     height = 400;
//     width = 250;
//     y = 55;
//     health = 100; // Lebenspunkte des Endbosses
//     hitCount = 0; // Trefferzähler
//     isHurt = false; // Status, ob der Boss verletzt ist
//     isDead = false; // Status, ob der Boss tot ist
//     moveDirection = 1; // 1 für nach rechts, -1 für nach links

//     IMAGES_WALKING = [
//         'img/4_enemie_boss_chicken/2_alert/G5.png',
//         'img/4_enemie_boss_chicken/2_alert/G6.png',
//         'img/4_enemie_boss_chicken/2_alert/G7.png',
//         'img/4_enemie_boss_chicken/2_alert/G8.png',
//         'img/4_enemie_boss_chicken/2_alert/G9.png',
//         'img/4_enemie_boss_chicken/2_alert/G10.png',
//         'img/4_enemie_boss_chicken/2_alert/G11.png',
//         'img/4_enemie_boss_chicken/2_alert/G12.png'
//     ];

//     IMAGES_ATTACK = [
//         'img/4_enemie_boss_chicken/3_attack/G13.png',
//         'img/4_enemie_boss_chicken/3_attack/G14.png',
//         'img/4_enemie_boss_chicken/3_attack/G15.png',
//         'img/4_enemie_boss_chicken/3_attack/G16.png',
//         'img/4_enemie_boss_chicken/3_attack/G17.png',
//         'img/4_enemie_boss_chicken/3_attack/G18.png',
//         'img/4_enemie_boss_chicken/3_attack/G19.png',
//         'img/4_enemie_boss_chicken/3_attack/G20.png'
//     ];

//     IMAGES_HURT = [
//         'img/4_enemie_boss_chicken/4_hurt/G21.png',
//         'img/4_enemie_boss_chicken/4_hurt/G22.png',
//         'img/4_enemie_boss_chicken/4_hurt/G23.png',
//     ];

//     IMAGES_ANGRY = [ // Füge die Wut-Animation hinzu
//         'img/4_enemie_boss_chicken/angry/G1.png',
//         'img/4_enemie_boss_chicken/angry/G2.png',
//         'img/4_enemie_boss_chicken/angry/G3.png',
//     ];

//     IMAGES_DEAD = [
//         'img/4_enemie_boss_chicken/5_dead/G24.png',
//         'img/4_enemie_boss_chicken/5_dead/G25.png',
//         'img/4_enemie_boss_chicken/5_dead/G26.png'
//     ];

//     constructor() {
//         super().loadImage(this.IMAGES_WALKING[0]);
//         this.loadImages(this.IMAGES_WALKING);
//         this.x = 2500;
//         this.animate();
//         this.moveRandomly();
//     }

//     animate() {
//         setInterval(() => {
//             if (!this.isDead) {
//                 if (this.isHurt) {
//                     this.playHurtAnimation();
//                 } else {
//                     this.playAnimation(this.IMAGES_WALKING);
//                 }
//             }
//         }, 250);
//     }

//     moveRandomly() {
//         setInterval(() => {
//             if (!this.isDead) {
//                 this.x += this.moveDirection * 2; // Bewege den Boss in die aktuelle Richtung
//                 if (Math.random() < 0.02) { // Ändere die Richtung gelegentlich
//                     this.moveDirection *= -1; // Wechsle die Bewegungsrichtung
//                 }
//             }
//         }, 100);
//     }

//     playHurtAnimation() {
//         let index = 0;
//         const interval = setInterval(() => {
//             if (index < this.IMAGES_HURT.length) {
//                 this.loadImage(this.IMAGES_HURT[index]);
//                 index++;
//             } else {
//                 clearInterval(interval);
//                 this.isHurt = false; // Setze den Status zurück
//             }
//         }, 250);
//     }

//     attack() {
//         // Hier kannst du die Logik für den Angriff implementieren, z.B. Animation abspielen
//         this.playAnimation(this.IMAGES_ATTACK);
//         // Füge hier Logik hinzu, um den Spieler zu treffen, wenn er in Reichweite ist
//     }

//     takeDamage(amount) {
//         this.health -= amount; // Gesundheit verringern
//         this.hitCount++; // Treffer zählen

//         if (this.hitCount === 1) {
//             this.playAngryAnimation(); // Wut-Animation abspielen
//         } else if (this.health <= 0) {
//             this.die();
//         } else {
//             this.isHurt = true; // Setze den Status auf verletzt
//         }
//     }

//     playAngryAnimation() {
//         let index = 0;
//         const interval = setInterval(() => {
//             if (index < this.IMAGES_ANGRY.length) {
//                 this.loadImage(this.IMAGES_ANGRY[index]);
//                 index++;
//             } else {
//                 clearInterval(interval);
//                 // Die Wut-Animation ist abgeschlossen, setze den Status zurück
//                 this.isHurt = true; // Optional: Setze den Status auf verletzt
//             }
//         }, 250);
//     }

//     die() {
//         this.isDead = true; // Setze den Status auf tot
//         this.playDeathAnimation(); // Starte die Todesanimation
//     }

//     playDeathAnimation() {
//         let index = 0;
//         const interval = setInterval(() => {
//             if (index < this.IMAGES_DEAD.length) {
//                 this.loadImage(this.IMAGES_DEAD[index]);
//                 index++;
//             } else {
//                 clearInterval(interval);
//                 this.destroy(); // Entferne den Boss aus dem Spiel
//             }
//         }, 500);
//     }

//     isHitByBottle(bottle) {
//         // Überprüfe, ob der Endboss von einer Flasche getroffen wird
//         return this.isColliding(bottle); // Stelle sicher, dass isColliding Methode vorhanden ist
//     }
// }

