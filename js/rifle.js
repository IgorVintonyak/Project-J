var Rifle = function(parent) {
  this.parent = parent;
  this.baseAmmo = 20;
	this.ammo = 20 ;
  this.tag = "RIFLE";
  this.shootInterval = 0.1;
  this.lastTimeShoot = this.shootInterval;
};

Rifle.prototype.update = function(time) {
  this.lastTimeShoot += time;

  this.softReset();
};

Rifle.prototype.fire = function(x, y, time, direction, ammo) {
  if (this.ammo > 0 && this.lastTimeShoot >= this.shootInterval) {
    this.lastTimeShoot = 0;

    this.ammo -= 1;

    var bulletDx = 0;
    var bulletDy = 0;
    var parent = this.parent;
    var image = app.assets.get('pics/steel.png');
    var damage = Math.round(Math.random() * 10 + 10);
    var deathCondition = 0.5;

    if (this.parent.direction == 1) {
      bulletDx -= 1200;
      image = app.assets.get('pics/steel.png');
    } else if (this.parent.direction == 3) {
      bulletDx += 1200;
      image = app.assets.get('pics/steel.png');
    } else if (this.parent.direction == 2) {
      bulletDy -= 1200;
      image = app.assets.get('pics/steel.png');
    } 
    var bullet = new Bullet(bulletDx, bulletDy, image, parent, damage, deathCondition);

    if (this.parent.direction == 1) {
      bullet.x = this.parent.x - this.parent.width;
      bullet.y = this.parent.y + bullet.height / 2;
    } else if (this.parent.direction == 3) {
      bullet.x = this.parent.x + this.parent.width;
      bullet.y = this.parent.y + bullet.height / 2;
    } else if (this.parent.direction == 2) {
      bullet.x = this.parent.x + bullet.width / 2;
      bullet.y = this.parent.y - this.parent.height;
    } 

    app.game.bullets.push(bullet);

    return true;
  }

  return false;
};

Rifle.prototype.softReset = function() {
  if (app.input.isKeyDown('r')) {
    this.ammo = 20  ;
  }
};