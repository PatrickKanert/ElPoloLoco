// class Endboss extends MovableObject {
//     height = 400;
//     width = 250;
//     y = 55;
//     energy = 100;
//     hurtTimeout = null;
//     isDead = false;
//     isHurt = false;
//     isWatching = true; // Anfangszustand: Beobachtungsmodus
//     isWalking = false; // Gehmodus ist zu Beginn nicht aktiv

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

//     IMAGES_WATCHING = [
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
//         super().loadImage(this.IMAGES_WATCHING[0]); // Lade das erste Bild für die Beobachtungsanimation
//         this.loadImages(this.IMAGES_WATCHING);
//         this.loadImages(this.IMAGES_WALKING); // Lade alle Geh-Animationen
//         this.loadImages(this.IMAGES_ATTACK); // Lade alle Angriffs-Animationen
//         this.loadImages(this.IMAGES_HURT); // Lade alle "Schaden"-Animationen
//         this.loadImages(this.IMAGES_DEAD); // Lade alle Sterbe-Animationen
//         this.x = 2500;
//         this.animate(); // Starte die Animation
//     }

//     // Animation für den Endboss - Beobachtung, Bewegung oder Angriff
//     animate() {
//         setInterval(() => {
//             if (this.isDead) {
//                 this.playAnimation(this.IMAGES_DEAD); // Sterbeanimation abspielen
//             } else if (this.isHurt) {
//                 this.playAnimation(this.IMAGES_HURT); // Verletzungsanimation abspielen
//             } else if (this.isWatching) {
//                 this.playAnimation(this.IMAGES_WATCHING); // Beobachtungsanimation abspielen
//             } else if (this.isWalking) {
//                 this.playAnimation(this.IMAGES_WALKING); // Gehanimation abspielen
//             }
//         }, 200);
//     }


//     hitEndboss() {
//         if (this.isDead) return; // Wenn der Endboss bereits tot ist, tue nichts
//         this.energy -= 20; // Reduziere die Energie um 20 bei jedem Treffer
//         if (this.energy <= 0) {
//             this.energy = 0;
//             this.isDead = true; // Markiere den Endboss als tot
//             this.dieEndboss(); // Rufe die Sterbemethode auf
//         } else {
//             this.showHurtAnimation(); // Spiele die "Schmerzen"-Animation ab
//             console.log(`Endboss hit! Energy left: ${this.energy}%`);
//         }
//     }

    
//     // Verletzungsanimation abspielen
//     showHurtAnimation() {
//         if (this.hurtTimeout) {
//             clearTimeout(this.hurtTimeout); // Timeout zurücksetzen, wenn bereits eine Animation läuft
//         }
    
//         this.isHurt = true; // Setze den Zustand auf verletzt
//         this.playAnimation(this.IMAGES_HURT); // Spiele die Verletzungsanimation ab
    
//         // Nach 0.5 Sekunden zurück zur normalen Animation wechseln
//         this.hurtTimeout = setTimeout(() => {
//             this.isHurt = false; // Setze den Zustand zurück
//             if (!this.isDead) {
//                 this.isWalking = true; // Nach Verletzung wieder zurück zur Laufanimation
//             }
//         }, 500); // Dauer der Verletzungsanimation in Millisekunden
//     }

//     dieEndboss() {
//         console.log('Endboss is dead');
//         this.isDead = true; // Markiere als tot
//         this.playAnimation(this.IMAGES_DEAD); // Spiele die Sterbeanimation ab
//     }
// }


class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    energy = 100;
    speed = 10; // Geschwindigkeit des Endbosses beim Laufen
    hurtTimeout = null;
    isDead = false;
    isHurt = false;
    isWatching = true; // Anfangszustand: Beobachtungsmodus
    isWalking = false; // Gehmodus ist zu Beginn nicht aktiv
    isAttacking = false; // Zustand für den Angriff


        IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    
    IMAGES_WATCHING = [
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
        super().loadImage(this.IMAGES_WATCHING[0]); // Lade das erste Bild für die Beobachtungsanimation
        this.loadImages(this.IMAGES_WATCHING);
        this.loadImages(this.IMAGES_WALKING); // Lade alle Geh-Animationen
        this.loadImages(this.IMAGES_ATTACK); // Lade alle Angriffs-Animationen
        this.loadImages(this.IMAGES_HURT); // Lade alle "Schaden"-Animationen
        this.loadImages(this.IMAGES_DEAD); // Lade alle Sterbe-Animationen
        this.x = 2500;
        this.animate(); // Starte die Animation
    }

    // Animation für den Endboss - Beobachtung, Bewegung, Angriff oder Verletzung
    animate() {
        setInterval(() => {
            this.moveToCharacter(world.character); // Stelle sicher, dass der Endboss den Charakter verfolgt
            
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD); // Sterbeanimation abspielen
            } else if (this.isHurt) {
                this.playAnimation(this.IMAGES_HURT); // Verletzungsanimation abspielen
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK); // Angriffsanimation abspielen
            } else if (this.isWalking) {
                this.playAnimation(this.IMAGES_WALKING); // Gehanimation abspielen
            } else if (this.isWatching) {
                this.playAnimation(this.IMAGES_WATCHING); // Beobachtungsanimation abspielen
            }
        }, 120);
    }

    // Methode, um den Endboss auf den Charakter zulaufen zu lassen
    moveToCharacter(character) {
        if (this.isDead || this.isHurt || this.isAttacking) return; // Kein Laufen, wenn der Endboss tot, verletzt oder im Angriff ist
        
        let distanceToCharacter = this.x - character.x; // Berechne die Distanz zum Charakter

        // Wenn der Charakter nah genug ist, soll der Endboss auf ihn zulaufen (z.B. bei einer Entfernung von 400px)
        if (distanceToCharacter < 900 && distanceToCharacter > 0) { 
            this.isWalking = true; // Gehen aktivieren
            this.moveLeft(); // Boss bewegt sich nach links
        }

        // Wenn der Charakter sehr nah ist (z.B. bei einer Entfernung von 200px), wechselt der Boss in den Angriffsmodus
        if (distanceToCharacter <= 0) {
            this.attack(); // Angriff wird ausgeführt
        }
    }


    // Angriffsmethode für den Endboss
    attack() {
        if (this.isAttacking) return; // Wenn der Boss bereits angreift, tue nichts
        
        this.isAttacking = true; // Wechsel in den Angriffsmodus
        this.playAnimation(this.IMAGES_ATTACK); // Spiele Angriffsanimation ab
    
        // Überprüfe, ob der Endboss den Charakter trifft
        setTimeout(() => {
            if (this.isColliding(world.character)) { // Prüfe, ob der Endboss mit dem Charakter kollidiert
                world.character.takeDamagefromEndboss(20); // Charakter erleidet Schaden
                console.log('Character hit by Endboss! Energy left: ' + world.character.energy + '%');
            }
    
            this.isAttacking = false; // Nach der Angriffsanimation den Zustand zurücksetzen
            if (!this.isDead) {
                this.isWalking = true; // Zurück zum Laufen, wenn der Charakter noch am Leben ist
            }
        }, 500); // Dauer des Angriffs (z.B. 0,5 Sekunden)
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
            if (!this.isDead) {
                this.isWalking = true; // Nach Verletzung wieder zurück zur Laufanimation
            }
        }, 500); // Dauer der Verletzungsanimation in Millisekunden
    }

    dieEndboss() {
        console.log('Endboss is dead');
        this.isDead = true; // Markiere als tot
        this.playAnimation(this.IMAGES_DEAD); // Spiele die Sterbeanimation ab
    }
}
