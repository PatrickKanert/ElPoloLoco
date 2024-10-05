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
  isFollowing = false;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_WATCHING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
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
      this.moveToCharacter(world.character); // Überprüfe die Distanz und lasse den Boss laufen oder beobachten

      // Zuerst prüfen, ob der Endboss verletzt oder tot ist
      if (this.isDead) {
        this.playAnimation(this.IMAGES_DEAD); // Sterbeanimation abspielen
      } else if (this.isHurt) {
        this.playAnimation(this.IMAGES_HURT); // Verletzungsanimation abspielen
      } else if (this.isAttacking) {
        this.playAnimation(this.IMAGES_ATTACK); // Angriffsanimation abspielen
      } else if (this.isWalking) {
        this.playAnimation(this.IMAGES_WALKING); // Gehanimation abspielen
      } else {
        this.playAnimation(this.IMAGES_WATCHING); // Standardanimation: Beobachtungsanimation abspielen
      }
    }, 120); // Zeitintervall der Animation
  }

  // Methode, um den Endboss auf den Charakter zulaufen zu lassen
  moveToCharacter(character) {
    const distanceToCharacter = this.x - character.x;

    // Wenn der Boss bereits verfolgt, dann bewege ihn
    if (this.isFollowing) {
      if (distanceToCharacter > 0) {
        this.otherDirection = true; // Blickt nach links
        this.isWalking = true; // Setze isWalking auf true
        this.moveLeft(); // Bewege nach links
      } else {
        this.otherDirection = false; // Blickt nach rechts
        this.isWalking = true; // Setze isWalking auf true
        this.moveRight(); // Bewege nach rechts
      }
    } else {
      // Der Boss verfolgt den Charakter nur, wenn er in Reichweite ist
      if (Math.abs(distanceToCharacter) < 400) {
        // Beispiel: 400 Pixel Reichweite
        this.isFollowing = true; // Setze isFollowing auf true, um die Verfolgung zu aktivieren
      }
    }
  }

  // Angriffsmethode für den Endboss
  attack() {
    if (this.isAttacking) return; // Wenn der Boss bereits angreift, tue nichts

    this.isAttacking = true; // Wechsel in den Angriffsmodus
    this.playAnimation(this.IMAGES_ATTACK); // Spiele Angriffsanimation ab

    // Sofort den Schaden zufügen, wenn der Endboss den Charakter trifft
    if (this.isColliding(world.character)) {
      world.character.takeDamagefromEndboss(15); // Charakter erleidet Schaden
      console.log(
        "Character hit by Endboss! Energy left: " + world.character.energy + "%"
      );
    }

    // Nach der Angriffsanimation den Zustand zurücksetzen
    setTimeout(() => {
      this.isAttacking = false; // Nach der Animation den Angriff beenden
      if (!this.isDead) {
        this.isWalking = true; // Nach dem Angriff wieder in den Gehmodus wechseln
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
    console.log("Endboss is dead");
    this.isDead = true; // Markiere als tot
    this.y = 100;
    this.playAnimation(this.IMAGES_DEAD); // Spiele die Sterbeanimation ab
  }
}
