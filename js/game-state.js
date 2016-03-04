var Game = function() {
};

Game.prototype.init = function() {
	this.players = [];	
	this.platforms = [];
	this.bullets = [];
	this.bonuses = [];
	this.particles = [];

	this.winner = '';

	this.spawnInterval = 0;
	this.spawnIntervalB = 0;
	this.spawnIntervalAmmo = 0;
	this.spawnIntervalR = 0;

	this.shakeX = 0;
	this.shakeY = 0;
	this.shakeValue = 0;

	this.spawnLimitAmmo = Math.random() * 15 + 7;
	this.spawnLimitB = Math.random() * 15 + 9;
	this.spawnLimitR = Math.random() * 15 + 7;

	this.roundTimer = 91;
	this.ggTimer = 3;
	this.spawnWait = 0;
	this.score1 = 0;
	this.score2 = 0;
	this.initialized = false;

	this._spawnBlocksAt();

	
};	

	
Game.prototype.update = function(time) {
	this.spawnWait += time;
	this.roundTimer -= time;

	if (this.roundTimer <= 0) {
		this.spawnInterval = 0;
		this.spawnIntervalB = 0;
		this.spawnIntervalAmmo = 0;
		this.spawnIntervalR = 0;

		this.spawnLimitAmmo = Math.random() * 15 + 7;
		this.spawnLimitB = Math.random() * 15 + 9;
		this.spawnLimitR = Math.random() * 15 + 7;

		this.spawnWait = 0;

		this.shakeX = 0;
		this.shakeY = 0;
		this.shakeValue = 0;

 		for (var i = 0; i < this.platforms.length; i++) {
 			this.platforms[i].reStart();
 		}
 		for (var i = 0; i < this.bonuses.length; i++) {
 			this.bonuses[i].isDead = true;
 		}
		this.players.splice(1, 1);
		this.players.splice(0, 1);
		
		this.initialized = false;
		this.roundTimer = 91;
	
	}

	// Howler.mute();

	

	if (!this.initialized && this.spawnWait > 1) {
		this.initialized = true;

		var playerOne = new Player(400, 400, app.assets.get('pics/player.png'), {
			jump: 'w',
			left: 'a',
			right: 'd',
			fire: 's',
			reset: 'r',
			});
		playerOne.tag = '1';

		var playerTwo = new Player(800, 400, app.assets.get('pics/playerl.png'), {
			jump: 'up',
			left: 'left',
			right: 'right',
			fire: 'down',
			reset: 'r',
		});
		playerTwo.tag = '2';

		this.players.push(playerOne); 
		this.players.push(playerTwo);
		
	}

	this.timers(time);
	this.spawns(time);

	this.shakeValue = this.shakeValue + (0 - this.shakeValue) * time * 10;

	var randomAngle = Math.random() * Math.PI * 2;
	this.shakeX = Math.cos(randomAngle) * this.shakeValue;
	this.shakeY = Math.sin(randomAngle) * this.shakeValue;

	if (app.input.isKeyDown('t')) {
		time /= 7;
	}
	
	var shouldGameOver = false;

	for (var i = 0; i < this.players.length; i++) {
		this.players[i].update(time);
		if (!this.players[i].isAlive()) {
			this.ggTimer -= time;

			if (this.ggTimer <= 0) {
				this.players[0].roundReset(time);
				this.players[1].roundReset(time);
				this.ggTimer = 3;
				this.roundTimer = 91;
			}	
		}

		if (this.players[i].lives <= 0) {
			shouldGameOver = true;
		}
	}

	if (shouldGameOver) {
		this.gameOver();
		return;
	}

	for (var i = 0; i < this.platforms.length; i++) {
		this.platforms[i].update(time);
	}
	for (var i = 0; i < this.bullets.length; i++) {
		this.bullets[i].update(time);
		if (this.bullets[i].isDead) {
      this.bullets.splice(i, 1);
    }
	}
	for (var i = 0; i < this.particles.length; i++) {
		if (this.particles[i].update(time)) {
      this.particles.splice(i, 1);
    }
	}
	for (var i = 0; i < this.bonuses.length; i++) {
		this.bonuses[i].update(time);
		if (this.bonuses[i].isDead) {
      this.bonuses.splice(i, 1);
    }
	}
	
};

Game.prototype.render = function() {
	app.video.ctx.save();
	app.video.ctx.translate(this.shakeX, this.shakeY);

	for (var i = 0; i < this.particles.length; i++) {
		this.particles[i].render();
	}
	for (var i = 0; i < this.players.length; i++) {
		this.players[i].render();
  	this.stats();
  	this.healthBar();
	}
	for (var i = 0; i < this.platforms.length; i++) {
		this.platforms[i].render();
	}
	for (var i = 0; i < this.bullets.length; i++) {
		this.bullets[i].render();
	}
	for (var i = 0; i < this.bonuses.length; i++) {
		this.bonuses[i].render();
	}
	
	app.video.ctx.restore();
};

Game.prototype.mousedown = function() {
		// this._buildBlock(app.input.mouse.x, app.input.mouse.y);
		// this._spawnAmmo(app.input.mouse.x, app.input.mouse.y);
		// this._spawnCrate(app.input.mouse.x + 24, app.input.mouse.y);
		// this._spawnBandages(app.input.mouse.x + 48, app.input.mouse.y);
};

Game.prototype.shake = function(value) {
	this.shakeValue += value;
};

Game.prototype._spawnMainBlock = function(x, y) {
	var platform = new Platform(0, 0, app.assets.get('pics/leftborder.png'));
	platform.x = x - platform.width / 2;
	platform.y = y - platform.height / 2;
	for (var i = 0; i < 41; i++) {
		var platform3 = new Platform(0, 0, app.assets.get('pics/middleborder.png'));
		platform3.x = x - platform3.width/2 + (24 * i) + 24;
		platform3.y = y - platform3.height / 2;
		this.platforms.push(platform3);
	}
	var platform2 = new Platform(0, 0, app.assets.get('pics/rightborder.png'));
	platform2.x = x - platform2.width / 2 + 24 * 42;
	platform2.y = y - platform2.height / 2;
	this.platforms.push(platform);
	this.platforms.push(platform2);
};

Game.prototype._spawnBlock = function(x, y) {
	// for (var i = 0; i < 2; i++) {
	var platform = new Platform(0, 0, app.assets.get('pics/leftborder.png'));
	platform.x = x - platform.width / 2;
	platform.y = y - platform.height / 2;
	var platform2 = new Platform(0, 0, app.assets.get('pics/rightborder.png'));
	platform2.x = x - platform2.width / 2 + 24;
	platform2.y = y - platform2.height / 2;
	this.platforms.push(platform);
	this.platforms.push(platform2);
	// };
};

Game.prototype._buildBlock = function(x, y) {
	var platform = new Platform(0, 0, app.assets.get('pics/png1.png'));
	platform.x = x - platform.width / 2;
	platform.y = y - platform.height / 2;
	this.platforms.push(platform);
	console.log(platform.x, platform.y);	
};

Game.prototype._spawnAmmo = function(x, y) {
	var	ammo = new Bonus('ammo', 0, 0, app.assets.get('pics/ammo.png'));
	ammo.x = x - ammo.width / 2;
	ammo.y = y - ammo.height / 2;
	this.bonuses.push(ammo);
};

Game.prototype._spawnBandages = function(x, y) {
	var bandage = new Bonus('bandage', 0, 0, app.assets.get('pics/bandage.png'));
	bandage.x = x - bandage.width / 2;
	bandage.y = y - bandage.height / 2;
 	this.bonuses.push(bandage);
};

Game.prototype._spawnCrate = function(x, y) {
	var crate = new Bonus('crate', 0, 0, app.assets.get('pics/crate.png'));
	crate.x = x - crate.width / 2;
	crate.y = y - crate.height / 2;
 	this.bonuses.push(crate);
};

Game.prototype.timers = function(time) {
	this.spawnInterval += time;
	this.spawnIntervalB += time;
	this.spawnIntervalAmmo += time;
	this.spawnIntervalR += time;
};

Game.prototype._spawnBlocksAt = function() {	
	this._spawnBlock(180, 430);
	this._spawnBlock(260, 430);
	this._spawnBlock(940, 430);
	this._spawnBlock(1020, 430);
	
	this._spawnBlock(360, 340);
	this._spawnBlock(860, 340);
	this._spawnBlock(560, 340);
	this._spawnBlock(660, 340);
	this._spawnBlock(760, 340);
	this._spawnBlock(460, 340);
	
	this._spawnBlock(180, 210);
	this._spawnBlock(460, 210);
	this._spawnBlock(610, 210);
	this._spawnBlock(760, 210);
	this._spawnBlock(260, 210);
	this._spawnBlock(940, 210);
	this._spawnBlock(1020, 210);

	this._spawnMainBlock(100, 520);

};

Game.prototype.gameOver = function() {
	for (var i = 0; i < this.players.length; i++) {
		if (!this.players[i].isDead) {
			this.winner = this.players[i].tag;
			break;
		}
	}
	app.game.restart();
	app.states.unpause("gameOver");
	app.gameOver.visible = true;
	app.states.pause("Game");

};

Game.prototype.stats = function() {
	app.video.ctx.drawImage(app.assets.get('pics/infobarbc.png'), 0, 0, app.assets.get('pics/infobarbc.png').width, app.assets.get('pics/infobarbc.png').height);
	app.video.ctx.drawImage(app.assets.get('pics/roundtimerbar.png'), 403, 540, app.assets.get('pics/roundtimerbar.png').width, app.assets.get('pics/roundtimerbar.png').height);

	app.video.ctx.fillStyle = 'rgba(37, 125, 176, 1)';
 	app.video.ctx.font = '20px sans-serif';
  app.video.ctx.textAlign = 'center';
	app.video.ctx.textBaseline = 'bottom';

 	app.video.ctx.fillText(this.players[0].health, 545, 26);
 	app.video.ctx.fillText(this.players[1].health, 655, 26);

 	app.video.ctx.fillText(this.players[1].lives, 485, 26);
 	app.video.ctx.fillText(this.players[0].lives, 715, 26);

 	app.video.ctx.font = '15px sans-serif';

 	app.video.ctx.fillText("vs", 600, 26);

 	app.video.ctx.font = '30px sans-serif';

 	app.video.ctx.fillText(Math.round(this.roundTimer), 600, 600);
	

 	app.video.ctx.fillStyle = 'red';
 	app.video.ctx.font = '50px sans-serif';

 	for (var i = 0; i < this.players.length; i++) {
 		if(this.players[i].isDead) {
 			app.video.ctx.fillText(Math.round(this.ggTimer), 600, 300);
 		}
 	}

  app.video.ctx.font = '11px sans-serif';
	app.video.ctx.fillStyle = 'rgba(37, 125, 176, 1)';
	app.video.ctx.lineJoin = 'round';
  app.video.ctx.textAlign = 'left';

 	app.video.ctx.fillText("Ammo: " + this.players[0].weapon.ammo, 410, 598);
 	app.video.ctx.fillText("Ammo: " + this.players[1].weapon.ammo, 683, 598);
 	app.video.ctx.fillText("Weapon: " + this.players[0].weapon.tag, 410, 584);
 	app.video.ctx.fillText("Weapon: " + this.players[1].weapon.tag, 683, 584);
};

Game.prototype.healthBar = function() {
	app.video.ctx.drawImage(app.assets.get('pics/hpbar2.png'), 0, 5, this.players[0].width * 20 - 8, 20);
	app.video.ctx.drawImage(app.assets.get('pics/hpbar2.png'), 730, 5, this.players[1].width * 20 - 8, 20);


  app.video.ctx.fillStyle = 'rgba(255, 255, 255, ' + (this.players[0].damagedTime - 0.3) + ')';
  app.video.ctx.fillRect(0, 5, this.players[0].width * 20 - 8, 20);
  app.video.ctx.fillStyle = 'rgba(255, 255, 255, ' + (this.players[1].damagedTime - 0.3) + ')';
  app.video.ctx.fillRect(730, 5, this.players[1].width * 20 - 8, 20);

	app.video.ctx.drawImage(app.assets.get('pics/hpbar.png'), 0, 5, this.players[0].HPbarWidth * 20, 20);
	app.video.ctx.drawImage(app.assets.get('pics/hpbar.png'), 1200, 5, this.players[1].HPbarWidth * 20 * -1, 20);

  // app.video.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  // app.video.ctx.fillRect(this.x, this.y - 6, this.players[0].width, 3);

  // app.video.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  // app.video.ctx.fillRect(this.x, this.y - 6, this.AmmoBarWidth, 3);
};

Game.prototype.spawns = function(time) {

	if (this.spawnIntervalB > this.spawnLimitB) {
		this._spawnBandages(200 + Math.random() * 400, -30 - Math.random() * 30);
		this.spawnLimitB = Math.random() * 15 + 9;
		this.spawnIntervalB = 0;
	}

	if (this.spawnIntervalR > this.spawnLimitR) {
		this._spawnCrate(100 + Math.random() * 300, Math.random() * 380 - 300);
		this._spawnCrate(400 + Math.random() * 300,  Math.random() * 380 - 300);
		this.spawnLimitR = Math.random() * 15 + 9;
		this.spawnIntervalR = 0;
	}

	if (this.spawnIntervalAmmo > this.spawnLimitAmmo) {
		this._spawnAmmo(200 + Math.random() * 400, -30 - Math.random() * 30);
		this.spawnLimitAmmo = Math.random() * 15 + 9;
		this.spawnIntervalAmmo = 0;
	}
};

Game.prototype.restart = function() {
	 	this.bonuses.length = 0;
		this.spawnInterval = 0;
		this.spawnIntervalB = 0;
		this.spawnIntervalAmmo = 0;
		this.spawnIntervalR = 0;

		this.spawnLimitAmmo = Math.random() * 15 + 7;
		this.spawnLimitB = Math.random() * 15 + 9;
		this.spawnLimitR = Math.random() * 15 + 7;

		this.spawnWait = 0;

		this.shakeX = 0;
		this.shakeY = 0;
		this.shakeValue = 0;

 		for (var i = 0; i < this.platforms.length; i++) {
 			this.platforms[i].reStart();
 		}
		this.players.splice(1, 1);
		this.players.splice(0, 1);
		
		this.initialized = false;
};

Game.prototype.keydown = function(key) {
	// if (key === 77) {
	// 	if (Howler._muted) {
	// 		Howler.unmute();
	// 	} else {
	// 		Howler.mute();
	// 	}
	// }

	if (key === 82) {
		this.restart();
	}
};
