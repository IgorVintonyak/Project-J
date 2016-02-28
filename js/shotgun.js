var Shotgun = function(parent) {
  this.parent = parent;
  this.baseAmmo = 12;
	this.ammo = 12;
  this.tag = "SHOTGUN";
  this.shootInterval = 1;
  this.lastTimeShoot = this.shootInterval;
  this.dmgCalc = 0;
};

Shotgun.prototype.update = function(time) {
  this.dmgCalc = Math.round(Math.random() * 30 + 25);
  this.lastTimeShoot += time;

  this.softReset();
};

Shotgun.prototype.fire = function(x, y, time, direction, ammo, dmgCalc) {
  if (this.ammo > 2 && this.lastTimeShoot >= this.shootInterval) {
    this.lastTimeShoot = 0;
    this.ammo -= 3;
    var damage = this.dmgCalc;

    var deathCondition = 0.05;

    var parent = this.parent;
    var bulletDx = 0;
    var bullet2Dx = 0;
    var bullet3Dx = 0;

    var bulletDy = 0;
    var bullet2Dy = 0;
    var bullet3Dy = 0;
    
    var image = app.assets.get('pics/steel.png');

    if (this.parent.direction == 1) {
      bulletDx -= 1000;
      bullet2Dx -= 1000;
      bullet3Dx -= 1000;

      bullet2Dy -= 500;
      bullet3Dy += 500;

      image = app.assets.get('pics/steel.png');
    } else if (this.parent.direction == 3) {
      bulletDx += 1000;
      bullet2Dx += 1000;
      bullet3Dx += 1000;

      bullet2Dy -= 500;
      bullet3Dy += 500;
      image = app.assets.get('pics/steel.png');
    } else if (this.parent.direction == 2) {
      bulletDy -= 1000;
      bullet2Dy -= 1000;
      bullet3Dy -= 1000;

      bullet2Dx -= 500;
      bullet3Dx += 500;
      image = app.assets.get('pics/steel.png');
    } 
    var bullet = new Bullet(bulletDx, bulletDy, image, parent, damage, deathCondition);
    var bullet2 = new Bullet(bullet2Dx, bullet2Dy, image, parent, damage, deathCondition);
    var bullet3 = new Bullet(bullet3Dx, bullet3Dy, image, parent, damage, deathCondition);


    if (this.parent.direction == 1) {
      bullet.x = this.parent.x - this.parent.width;
      bullet.y = this.parent.y + bullet.height / 2;

      bullet2.x = this.parent.x - this.parent.width;
      bullet2.y = this.parent.y + bullet2.height / 2;

      bullet3.x = this.parent.x - this.parent.width;
      bullet3.y = this.parent.y + bullet3.height / 2;
    } else if (this.parent.direction == 3) {
      bullet.x = this.parent.x + this.parent.width;
      bullet.y = this.parent.y + bullet.height / 2;

      bullet2.x = this.parent.x + this.parent.width;
      bullet2.y = this.parent.y + bullet2.height / 2;

      bullet3.x = this.parent.x + this.parent.width;
      bullet3.y = this.parent.y + bullet3.height / 2;
    } else if (this.parent.direction == 2) {
      bullet.x = this.parent.x + bullet.width / 2;
      bullet.y = this.parent.y - this.parent.height;

      bullet2.x = this.parent.x + bullet2.width / 2;
      bullet2.y = this.parent.y - this.parent.height;

      bullet3.x = this.parent.x + bullet3.width / 2;
      bullet3.y = this.parent.y - this.parent.height;
    } 


    app.game.bullets.push(bullet);
    app.game.bullets.push(bullet2);
    app.game.bullets.push(bullet3);

    return true;
  }
  return false;
};

Shotgun.prototype.softReset = function() {
  if (app.input.isKeyDown('r')) {
    this.ammo = 12;
  }
};
