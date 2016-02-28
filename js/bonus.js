var bonusDefs = {
  bandage: {
     innit: function(self) {
        self.image = image;
        self.width = self.image.width;
        self.height = self.image.height;
        self.maxTime = 0;
        self.isDead = false;

        self.x = -5;
        self.y = -5;

        self.healing = 0;  

     }, 

     shouldRemove: function(self) {
        if (self.maxTime < self.totalTime) {
            self.isDead = true;
        } 
     },
 
     doStuff: function(self, item) {
          var particle = new Particle('text', self.x + self.width/2, self.y - 5);
          particle.color = 'rgba(0, 255, 0, 1)';
          particle.text = "+" + self.healing;
          app.game.particles.push(particle);

          item.health += self.healing;  
          self.isDead = true;
     },

     update: function(self, time) {
        self.dy += self.gravity;

        self.maxTime = 5;
        self.healing = Math.round(Math.random() * 20 + 20);  
     },

     render: function(self) {
        app.video.ctx.drawImage(self.image, self.x, self.y, self.width, self.height);
     }
  },

  ammo: {
     innit: function(self) {
        self.maxTime = 0;
        self.isDead = false;

        self.x = -5;
        self.y = -5;

     }, 

     shouldRemove: function(self) {
        if (self.maxTime < self.totalTime) {
            self.isDead = true;
        } 
     },

     doStuff: function(self, item) {
          var particle = new Particle('text', self.x + self.width/2, self.y - 5);
          particle.color = 'rgba(190, 179, 142, 1)';
          particle.text = "+" + self.bonusAmmo;
          app.game.particles.push(particle);

          item.weapon.ammo += self.bonusAmmo;  
          self.isDead = true;
     },

     update: function(self, time) {
        self.dy += self.gravity;

        self.maxTime = 5;
        self.bonusAmmo = Math.round(Math.random() * 10 + 5); 
     },

     render: function(self) {
        app.video.ctx.drawImage(self.image, self.x, self.y, self.width, self.height);
     }
  },

  crate: {
     innit: function(self) {
        self.maxTime = 0;
        self.isDead = false;

        self.x = -5;
        self.y = -5;

        self.bonusAmmo = 0;
     }, 

     shouldRemove: function(self) {
        if (self.maxTime < self.totalTime) {
            self.isDead = true;
        } 
     },

     doStuff: function(self, item) {
          item.weaponRandom();  

          var particle = new Particle('text', self.x + self.width/2, self.y - 5);
          particle.color = 'rgba(0, 255, 255, 1)';
          particle.text = "+ " + item.weapon.tag;
          app.game.particles.push(particle);

          self.isDead = true;
     },

     update: function(self, time) {
        self.dy += self.gravity;
        self.maxTime = 10;
     },

     render: function(self) {
        app.video.ctx.drawImage(self.image, self.x, self.y, self.width, self.height);
     }
  }

};

var Bonus = function(name, x, y, image) {
  this.def = bonusDefs[name];
  this.x = x;
  this.y = y;
  this.image = image;
  this.width = this.image.width;
  this.height = this.image.height;

  this.isDead = false;
  this.dx = 0;
  this.dy = 0;

  this.gravity = 0;
  this.totalTime = 0;

  if (this.def && this.def.init) {
    this.def.init(this);
  }
};

Bonus.prototype.update = function(time) {
  this.totalTime += time;
  this.gravity = 500 * time;


  for (var i = 0; i < app.game.platforms.length; i++) {
    var item = app.game.platforms[i];

    if (collidesWith(this, item)) {
      var result = resolveCollision(this, item); 

      this.dy = 0;
      this.dx = 0;     
    }   
  } 
  
  for (var i = 0; i < app.game.players.length; i++) {
    var item = app.game.players[i];

    if (collidesWith(this, item)) {
      this.def.doStuff(this, item);

      // app.assets.get('sounds/bonus.wav').play();
    }

  }      

  if (this.def && this.def.update) {
    this.def.update(this, time);
  }

  this.x += this.dx * time;
  this.y += this.dy * time;
  
  if (this.def && this.def.shouldRemove) {
    return this.def.shouldRemove(this);
  }


  return false;
};

Bonus.prototype.render = function() {
  if (this.def && this.def.render) {
    this.def.render(this);
  }
};