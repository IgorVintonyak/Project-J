var Bullet = function(dx, dy, image, parent, damage, deathCondition) {
	this.x = 0;
	this.y = 0;
	this.image = image;
	this.width = this.image.width / 2;
	this.height = this.image.height / 2;
	this.isDead = false;
	this.parent = parent;
	this.damage = damage;
	this.deathCondition = deathCondition;

	this.lifeSpan = 0;

	this.dx = dx;
	this.dy = dy;
};

Bullet.prototype.update = function(time) {
	this.lifeSpan += time;
	this.collision(time);

	this.x += this.dx * time;
	this.y += this.dy * time;

	this.dead();
};

Bullet.prototype.render = function() {
	app.video.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};


Bullet.prototype.dead = function() {
	if (this.lifeSpan > this.deathCondition || this.x + this.width < 0 || this.x > 1200 || this.y < 0 || this.y + this.height > 800) {
		this.isDead = true;
	}
};


Bullet.prototype.collision = function(time) {
	for (var i = 0; i < app.game.players.length; i++) {
		var item = app.game.players[i];

		if (item === this || item === this.parent) {continue;}

		if (collidesWith(this, item)) {
		 	var result = resolveCollision(this, item);
      // app.assets.get('sounds/hit.wav').play();

		 	item.health -= this.damage;
		 	item.isHit();

		 	var particle = new Particle('text', item.x + item.width/2, item.y - 5);
  		particle.text = "-" + this.damage;
      particle.color = 'rgba(255, 0, 0, 1)';
  		app.game.particles.push(particle);

  		item.dx += this.dx;
  		item.dy += this.dy;

	 		this.isDead = true;
		}
	}

	for (var i = 0; i < app.game.platforms.length; i++) {
		 var item = app.game.platforms[i];

		 	if (collidesWith(this, item)) {
		 	var result = resolveCollision(this, item);

		 	this.isDead = true;
		 }
	}
};
