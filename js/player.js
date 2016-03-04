var Player = function(x, y, image, keyConfig){
  this.orignalX = x;
  this.orignalY = y;

	this.x = x;
	this.y = y;
	this.image = image;
	this.width = this.image.width;
	this.height = this.image.height;
	this.keyConfig = keyConfig;
  this.tag = '';

	this.dy = 0;
	this.dx = 0;
	this.health = 100;
  this.HPbarWidth = 0;
	this.jumpLimit = 2;
  this.gravity = 0;
  this.lives = 3;
  this.isDead = false;
  this.immortal = false;

  this.randomWeapon = 0;
	this.jumpTimer = 0;
	this.marioTimer = 0;

  this.damagedTime = 0;

	this.immovable = false;
	this.direction = 1;

  this.weapon = new Melee(this);
};

Player.prototype.update = function(time) {
  this.gravity = 2000 * time;
  this.dy += this.gravity;
  this.randomWeapon = Math.round(Math.random() * 3);
  this.randomWeapon = Math.round(Math.random() * 3);

  
  var particle = new Particle('follow', this.x + this.width/2, this.y + this.height / 2);
  particle.color = 'rgba(10, 120, 180, 0.2)';
  app.game.particles.push(particle);
  

  this.randomWeapon = Math.round(Math.random() * 3); 

  this.damagedTime -= 1 * time;
  if (this.damagedTime < 0) { this.damagedTime = 0; }
  
  if (this.weapon.baseAmmo < this.weapon.ammo) {
      this.weapon.baseAmmo = this.weapon.ammo;
  }
  
  if (this.isAlive()) {
    this.isDead = false;
    this._timers(time);
    this.bleed();
    this.keys(time);
    this.HPbarWidth = this.width * this.health / 100;
    this.HPbarWidth = this.HPbarWidth + (0 - this.HPbarWidth) * time;
    
    if (this.weapon.ammo == 0) {
      this.weapon = new Melee(this);
    };
    
    if (this.weapon.ammo == 0) {
      this.weapon = new Melee(this);
    };
    
    this.weapon.update(time);
  }

    this.AmmoBarWidth = this.width * this.weapon.ammo / this.weapon.baseAmmo;

    this.weapon.update(time);
  
  if (!this.isAlive()) {
    this.marioTimer += time;
    this.gameOver(time);
    this.isDead = true;
    this.HPbarWidth = 0;
  }

  this.softReset(time);
  this._movement(time);

  if (this.isAlive()) {
    this._collision(time);
  }
  
  if (this.health < 0) {
    this.health = 0;
  }
  if (this.lives < 0) {
    this.lives = 0;
  }
};

Player.prototype.render = function() {
  app.video.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

  // app.video.ctx.save();

  app.video.ctx.fillStyle = 'rgba(255, 0, 0, ' + (this.damagedTime - 0.6) +')';
  app.video.ctx.fillRect(this.x, this.y, this.width, this.height);
  
  // app.video.ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  // app.video.ctx.fillRect(445, 20, this.width, 3);
  // app.video.ctx.fillStyle = 'rgba(255, 255, 255, ' + (this.damagedTime - 0.3) + ')';
  // app.video.ctx.fillRect(this.x, 20, this.width, 3);
  // app.video.ctx.fillStyle = 'rgba(0, 255, 0, 1)';
  // app.video.ctx.fillRect(this.x, 20, this.HPbarWidth, 3);
  // app.video.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  // app.video.ctx.fillRect(this.x, this.y - 6, this.width, 3);
  // app.video.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  // app.video.ctx.fillRect(this.x, this.y - 6, this.AmmoBarWidth, 3);


  
  // app.video.ctx.restore();
};

Player.prototype.isAlive = function() {
	if (this.health > 0 && this.y < app.height + 200 || this.immortal) {
		return true;
	}

};

Player.prototype.pointCounter = function() {
  if (this.isDead) {
    this.lives += 1;
  }
};

Player.prototype._movement = function(time) {
	this.dx = this.dx + (0 - this.dx) * time * 15;            // X movement improvement


	this.y += this.dy * time;
	this.x += this.dx * time;
};

Player.prototype._collision = function(time) {
	for (var i = 0; i < app.game.players.length; i++) {
		 var item = app.game.players[i];

		 if (item === this) {continue;}

		 if (collidesWith(this, item)) {
		 	var result = resolveCollision(this, item);

		 	if (result === 2) {
		 	this.dy = 0;
		 	this.jumpLimit = 2;
		 	} else if (result === 1 || result === 3) {
		 	this.dx = 0;
		 	} else if (result === 0) {
		 	this.dy = 0;
		 	}
		 }

     if (app.game.players[i].isDead) {
        this.immortal = true;
     }
	}

	for (var i = 0; i < app.game.platforms.length; i++) {
		 var item = app.game.platforms[i];
		 if (collidesWith(this, item)) {
		 	var result = resolveCollision(this, item);

		 	if (result === 2) {
		 	this.dy = 0;
		 	this.jumpLimit = 2;
		 	} else if (result === 1 || result === 3) {
		 	this.dx = 0;
		 	} else if (result === 0) {
		 	this.dy = 0;
		 	}
		 }
	}
};

Player.prototype._timers = function(time) {
	this.jumpTimer += time;
};

Player.prototype.keys = function(time) {
  if (app.input.isKeyDown(this.keyConfig.jump) && this.jumpLimit > 0 && this.jumpTimer > 0.3) {

    // app.assets.get('sounds/jump.wav').play();

    for (var i = 0; i < 10; i++) {
      var particle = new Particle('jump', this.x + this.width/2 + (Math.random() + i), this.y + this.height);
      particle.color = 'rgba(255, 255, 255, 0.2)';
      app.game.particles.push(particle);
    }

    this.dy = 0;
    this.dy -= 32000 * time;
    if (this.jumpLimit > 0) {
      this.jumpLimit -= 1;
    }
    this.direction = 2;
    this.jumpTimer = 0;

  }

  if (app.input.isKeyDown(this.keyConfig.fire)) {
    this.fire(time);
  }
  if (app.input.isKeyDown(this.keyConfig.left)) {
    this.dx -= 6000 * time;
    this.direction = 1;
  }
  if (app.input.isKeyDown(this.keyConfig.right)) {
    this.dx += 6000 * time;
    this.direction = 3;
  }

  if (app.input.isKeyDown(49)) {
   this.weapon = new Shotgun(this);
  }
  if (app.input.isKeyDown(50)) {
   this.weapon = new Pistol(this);
  }
  if (app.input.isKeyDown(51)) {
   this.weapon = new Rifle(this);
  }
};

Player.prototype.fire = function(time) {
  if (this.weapon.fire()) {
    if (this.weapon.tag == "RIFLE") {
      // app.assets.get('sounds/shot.wav').play();


      app.game.shake(4);
      if (this.direction == 1) {
        this.dx += 35000 * time;
      } else if (this.direction == 3) {
        this.dx -= 35000 * time;
      } else {
        this.dy += 15000 * time;
      }
    }
    if (this.weapon.tag == "SHOTGUN") {
      // app.assets.get('sounds/shotgun.wav').play();


      app.game.shake(10);
      if (this.direction == 1) {
        this.dx += 65000 * time;
      } else if (this.direction == 3) {
        this.dx -= 65000 * time;
      } else {
        this.dy += 35000 * time;
      }
    }
    if (this.weapon.tag == "PISTOL") {
      // app.assets.get('sounds/pistol.wav').play();


      app.game.shake(3);
      if (this.direction == 1) {
        this.dx += 25000 * time;
      } else if (this.direction == 3) {
        this.dx -= 25000 * time;
      } else {
        this.dy += 5000 * time;
      }
    }
    if (this.weapon.tag == "MELEE") {
      // app.assets.get('sounds/melee.wav').play();


      if (this.direction == 1) {
        this.dx += 15000 * time;
      } else if (this.direction == 3) {
        this.dx -= 15000 * time;
      } else {
        this.dy += 5000 * time;
      }
    }
  }
};

Player.prototype.gameOver = function(time) {
	if (this.marioTimer < 0.1) {
		this.dy = 0;
		this.dy -= 3000 * time;
	}
};

Player.prototype.softReset = function(time) {
	 if (app.input.isKeyDown(this.keyConfig.reset)) {
    this.x = this.orignalX;
    this.y = this.orignalY;
    this.dy = 0;
    this.dx = 0;
    this.health = 100;
    this.lives = 3;
    this.marioTimer = 0;
    this.immortal = false;
    this.isDead = false;
    this.weapon = new Melee(this);
  }
};

Player.prototype.roundReset = function(time) {
    this.x = this.orignalX;
    this.y = this.orignalY;
    this.dy = 0;
    this.dx = 0;
    if (this.isDead) {
      this.lives -= 1;
    }
    this.health = 100;
    this.marioTimer = 0;
    for (var i = 0; i < app.game.bonuses.length; i++) {
      app.game.bonuses[i].isDead = true;
    }

    this.immortal = false;
    this.isDead = false;
    this.weapon = new Melee(this);

};


Player.prototype.weaponRandom = function() {
  if (this.randomWeapon == 0) {
    this.weapon = new Rifle(this);
  } else if (this.randomWeapon == 1) {
    this.weapon = new Shotgun(this); 
  } else {
    this.weapon = new Pistol(this);
  };
};

Player.prototype.bleed = function() {
  if (this.health < 100) {
    var particle = new Particle('blood', this.x + this.width/2, this.y + this.height/2)
    particle.color = 'rgba(255, 0, 0, 0.2)';
    app.game.particles.push(particle);
  }

  if (this.health > 100) {
    this.health = 100;
  }
};

Player.prototype.isHit = function() {
  this.damagedTime = 1;
};
