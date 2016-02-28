var Pistol = function(parent) {
  this.parent = parent;
  this.baseAmmo = 7;
	this.ammo = 7;
  this.tag = "PISTOL";
  this.shootInterval = 0.4;
  this.lastTimeShoot = this.shootInterval;
};

Pistol.prototype.update = function(time) {
  this.lastTimeShoot += time;

  this.softReset();
};

Pistol.prototype.fire = function(x, y, time, direction, ammo) {
  if (this.ammo > 0 && this.lastTimeShoot >= this.shootInterval) {
    this.lastTimeShoot = 0;

    this.ammo -= 1;


    var bulletDx = 0;
    var bulletDy = 0;

    var parent = this.parent;
    var image = app.assets.get('pics/steel.png');
    var damage = Math.round(Math.random() * 10 + 20);
    var deathCondition = 0.3;

    if (this.parent.direction == 1) {
      bulletDx -= 1000;
      image = app.assets.get('pics/steel.png');
    } else if (this.parent.direction == 3) {
      bulletDx += 1000;
      image = app.assets.get('pics/steel.png');
    } else if (this.parent.direction == 2) {
      bulletDy -= 1000;
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

Pistol.prototype.softReset = function() {
  if (app.input.isKeyDown('r')) {
    this.ammo = 7;
  }
};