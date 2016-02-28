var Melee = function(parent) {
  this.parent = parent;
  this.tag = "MELEE";
  this.ammo = "~";
  this.baseAmmo = 0;
  this.shootInterval = 0.2;
  this.lastTimeShoot = this.shootInterval;
};

Melee.prototype.update = function(time) {
  this.lastTimeShoot += time;

  if (this.ammo < 0) {this.ammo = 0;}
  this.softReset();
};

Melee.prototype.fire = function(x, y, time, direction) {
  if (this.lastTimeShoot >= this.shootInterval) {
    this.lastTimeShoot = 0;

    var bulletDx = 0;
    var bulletDy = 0;

    var parent = this.parent;
    var image = app.assets.get('pics/steel.png');
    var damage = Math.round(Math.random() * 50 + 2);
    var deathCondition = 0.06;

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
      bullet.x = this.parent.x - this.parent.width / 2 + 10;
      bullet.y = this.parent.y + bullet.height / 2;
    } else if (this.parent.direction == 3) {
      bullet.x = this.parent.x + this.parent.width / 2 - 10;
      bullet.y = this.parent.y + bullet.height / 2;
    } else if (this.parent.direction == 2) {
      bullet.x = this.parent.x + bullet.width / 2;
      bullet.y = this.parent.y - this.parent.height / 2;
    } 

    app.game.bullets.push(bullet);

    return true;
  }

  return false;
};

Melee.prototype.softReset = function() {
  if (app.input.isKeyDown('r')) {
    this.ammo = 0;
  }
};