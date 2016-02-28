var Magazine = function(x, y, image) {
	this.x = x;
	this.y = y;
	this.image = image;
	this.width = this.image.width * 0.8;
	this.height = this.image.height * 0.8;

	this.isDead = false;
	this.lifeSpan = 0;
};

Magazine.prototype.update = function(time) {
	this.lifeSpan += time;

	if (this.lifeSpan > 8) {
		this.isDead = true;
	}

	this.collision(time);
};

Magazine.prototype.render = function() {
	app.video.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};

Magazine.prototype.collision = function(time) {
	for (var i = 0; i < app.game.players.length; i++) {
		 var item = app.game.players[i];

		 if (item === this) {continue;}

		 if (collidesWith(this, item)) {
		 	var result = resolveCollision(this, item);

		 	item.weapon.ammo += Math.round(Math.random() * 5);

		 	if (result === 2) {
		 	this.isDead = true;
		 	} else if (result === 1) {
		 	this.isDead = true;
		 	} else if (result === 0) {
		 	this.isDead = true;
		 	} else if (result === 3){
		 		this.isDead = true;
		 	}

		 }
	}

	for (var i = 0; i < app.game.platforms.length; i++) {
		 var item = app.game.platforms[i];

		 if (item === this) {continue;}

		 if (collidesWith(this, item)) {
		 	var result = resolveCollision(this, item);
		 }
	}

	for (var i = 0; i < app.game.bonuses.length; i++) {
     var item = app.game.bonuses[i];

     if (item === this) {continue;}

     if (collidesWith(this, item)) {
      var result = resolveCollision(this, item);
    }
  }
};
