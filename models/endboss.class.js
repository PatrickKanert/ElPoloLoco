// class Endboss extends MovableObject {

//     height = 400;
//     width = 250;
//     y = 55;
//     energy = 100;
//     hurtTimeout = null; // Um sicherzustellen, dass die Animation nur für kurze Zeit abgespielt wird


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

//     IMAGES_DEAD = [
//         'img/4_enemie_boss_chicken/5_dead/G24.png',
//         'img/4_enemie_boss_chicken/5_dead/G25.png',
//         'img/4_enemie_boss_chicken/5_dead/G26.png'
//     ];


//     constructor() {
//         super().loadImage(this.IMAGES_WALKING[0]); // Lade das erste Bild für das Gehen
//         this.loadImages(this.IMAGES_WALKING); // Lade alle Geh-Animationen
//         this.loadImages(this.IMAGES_ATTACK); // Lade alle Angriffs-Animationen
//         this.loadImages(this.IMAGES_HURT); // Lade alle "Schaden"-Animationen
//         this.loadImages(this.IMAGES_DEAD); // Lade alle Sterbe-Animationen
//         this.x = 2500;
//         this.animate();
//     }


//     animate() {
//         setInterval(() => {
//             if (!this.isHurt) { // Nur animieren, wenn der Endboss nicht verletzt ist
//                 this.playAnimation(this.IMAGES_WALKING);
//             }
//         }, 250);
//     }

//     hitEndboss() {
//         this.energy -= 20; // Reduziere die Energie um 20% bei jedem Treffer
//         if (this.energy <= 0) {
//             this.energy = 0;
//             this.die(); // Rufe eine Methode auf, die den Endboss tötet, wenn seine Energie 0 erreicht
//         } else {
//             this.showHurtAnimation(); // Spiele die "Schmerzen"-Animation ab
//             console.log(`Endboss hit! Energy left: ${this.energy}%`);
//         }
//     }

//     showHurtAnimation() {
//         if (this.hurtTimeout) { // Falls bereits eine Verletzungsanimation läuft, setze sie zurück
//             clearTimeout(this.hurtTimeout);
//         }

//         this.isHurt = true; // Setze den Zustand auf "verletzt"
//         this.playAnimation(this.IMAGES_HURT); // Spiele die "Schmerzen"-Animation ab

//         // Nach 0.5 Sekunden zur normalen Animation zurückkehren
//         this.hurtTimeout = setTimeout(() => {
//             this.isHurt = false;
//         }, 500); // Dauer der "Schmerzen"-Animation in Millisekunden
//     }

//     die() {
//         console.log('Endboss is dead');
//         this.playAnimation(this.IMAGES_DEAD); // Spiele die Sterbeanimation ab
//         // Hier kannst du den Endboss aus dem Spiel entfernen oder ihn als "tot" markieren
//     }
// }


class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    energy = 100;
    hurtTimeout = null; // Um sicherzustellen, dass die Verletzungsanimation nur für kurze Zeit läuft
    isDead = false; // Zustandsvariable für den Tod des Endbosses


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
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]); // Lade das erste Bild für das Gehen
        this.loadImages(this.IMAGES_WALKING); // Lade alle Geh-Animationen
        this.loadImages(this.IMAGES_ATTACK); // Lade alle Angriffs-Animationen
        this.loadImages(this.IMAGES_HURT); // Lade alle "Schaden"-Animationen
        this.loadImages(this.IMAGES_DEAD); // Lade alle Sterbe-Animationen
        this.x = 2500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead && !this.isHurt) { // Nur animieren, wenn der Endboss lebt und nicht verletzt ist
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 250);
    }


    hitEndboss() {
        if (this.isDead) return; // Wenn der Endboss bereits tot ist, tue nichts
        this.energy -= 20; // Reduziere die Energie um 20 bei jedem Treffer
        if (this.energy <= 0) {
            this.energy = 0;
            this.isDead = true; // Markiere den Endboss als tot
            this.dieEndboss(); // Rufe die Sterbemethode auf
        } else {
            this.showHurtAnimation(); // Spiele die "Schmerzen"-Animation ab
            console.log(`Endboss hit! Energy left: ${this.energy}%`);
        }
    }


    showHurtAnimation() {
        if (this.hurtTimeout) {
            clearTimeout(this.hurtTimeout); // Timeout zurücksetzen, wenn bereits eine Animation läuft
        }
    
        this.isHurt = true; // Setze den Zustand auf verletzt
        this.playAnimation(this.IMAGES_HURT); // Spiele die Verletzungsanimation ab
    
        // Nach 0.5 Sekunden zurück zur normalen Animation wechseln
        this.hurtTimeout = setTimeout(() => {
            this.isHurt = false; // Setze den Zustand zurück
        }, 500); // Dauer der Verletzungsanimation in Millisekunden
    }
    

    dieEndboss() {
        console.log('Endboss is dead');
        this.playAnimation(this.IMAGES_DEAD); // Spiele die Sterbeanimation ab
    }
}
