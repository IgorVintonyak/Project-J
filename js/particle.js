var particleDefs = {
  blood: {
    init: function(self) {
      self.color = 'rgba(255, 255, 255, 0.2)';
      self.dy = 50 + Math.random() * 20;
      self.dx = Math.random() * 60 - 30;
      self.alphaSpeed = 0.6 + Math.random() / 5;
      self.rotaitonSpeed = 2 + Math.random() * 4 - 2;
      self.scaleSpeed = -1;

      self.x -= 5;
      self.y -= 5;
    },

    shouldRemove: function(self) {
      return self.alpha <= 0;
    },

    update: function(self, time) {
      self.dx = self.dx + (0 - self.dx) * time;
    },

    render: function(self) {
      app.video.ctx.save();
      app.video.ctx.fillStyle = self.color;

      app.video.ctx.translate(self.x + 5, self.y + 5);
      app.video.ctx.scale(self.scale, self.scale);
      app.video.ctx.rotate(self.rotation);
      app.video.ctx.translate(-self.x - 5, -self.y - 5);
      app.video.ctx.fillRect(self.x, self.y, 10, 10);

      app.video.ctx.restore();
    }
  },

  follow: {
    init: function(self) {
      self.color = 'rgba(150, 40, 128, 0.2)';
      self.dy = 0;
      self.dx = 0;
      self.alphaSpeed = 0.6 + Math.random() / 5;
      self.rotaitonSpeed = 2 + Math.random() * 4 - 2;
      self.scaleSpeed = -1;

      self.x -= 5;
      self.y -= 5;
    },

    shouldRemove: function(self) {
      return self.alpha <= 0;
    },

    update: function(self, time) {
      self.dx = self.dx + (0 - self.dx) * time;
    },

    render: function(self) {
      app.video.ctx.save();
      app.video.ctx.fillStyle = self.color;

      app.video.ctx.translate(self.x + 5, self.y + 5);
      app.video.ctx.scale(self.scale, self.scale);
      app.video.ctx.rotate(self.rotation);
      app.video.ctx.translate(-self.x - 5, -self.y - 5);
      app.video.ctx.fillRect(self.x, self.y, 10, 10);

      app.video.ctx.restore();
    }
  },

  jump: {
    init: function(self) {
      self.color = 'rgba(255, 255, 255, 0.2)';
      self.dy = -20 + Math.random() * 20;
      self.dx = 20;
      self.alphaSpeed = 0.6 + Math.random() / 5;
      self.rotaitonSpeed = 2 + Math.random() * 4 - 2;
      self.scaleSpeed = -1;

      self.x -= 5;
      self.y -= 5;
    },

    shouldRemove: function(self) {
      return self.alpha <= 0;
    },

    update: function(self, time) {
      self.dx = self.dx + (0 - self.dx) * time;
    },

    render: function(self) {
      app.video.ctx.fillStyle = self.color;

      app.video.ctx.translate(self.x + 5, self.y + 5);
      app.video.ctx.scale(self.scale, self.scale);
      app.video.ctx.rotate(self.rotation);
      app.video.ctx.translate(-self.x - 5, -self.y - 5);
      app.video.ctx.fillRect(self.x, self.y, 10, 10);
    }
  },

  text: {
    init: function(self) {
      self.text = null;
      self.dy = -20;
      self.maxTime = 0.5;
      self.scaleSpeed = -2;
      self.color = 'rgba(255, 255, 255, 1)';
      self.outline = 'rgba(0, 0, 0, 1)';
    },

    shouldRemove: function(self) {
      return self.maxTime < self.totalTime;
    },

    update: function(self, time) {
      self.dx = self.dx + (0 - self.dx) * time;
    },

    render: function(self) {
      app.video.ctx.strokeStyle = self.outline;
      app.video.ctx.fillStyle = self.color;
      app.video.ctx.textAlign = 'center';
      app.video.ctx.textBaseline = 'bottom';
      app.video.ctx.font = '17px sans-serif';
      app.video.ctx.lineJoin = 'round';
      app.video.ctx.lineWidth = 2;
      app.video.ctx.strokeText(self.text, self.x, self.y);
      app.video.ctx.fillText(self.text, self.x, self.y);
    }
  }
};

var Particle = function(name, x, y) {
  this.def = particleDefs[name];
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  
  this.alpha = 1;
  this.alphaSpeed = 0;

  this.totalTime = 0;

  this.rotation = 0;
  this.rotaitonSpeed = 0;

  this.scale = 1;
  this.scaleSpeed = 0;

  if (this.def && this.def.init) {
    this.def.init(this);
  }
};

Particle.prototype.update = function(time) {
  this.totalTime += time;

  if (this.def && this.def.update) {
    this.def.update(this, time);
  }

  this.x += this.dx * time;
  this.y += this.dy * time;

  this.rotation += this.rotaitonSpeed * time;

  this.scale += this.scaleSpeed * time;

  this.alpha -= this.alphaSpeed * time;
  if (this.alpha < 0) { this.alpha = 0; }
  if (this.alpha > 1) { this.alpha = 1; }

  if (this.scale < 0) { this.scale = 0; }
  if (this.scale > 1) { this.scale = 1; }

  if (this.def && this.def.shouldRemove) {
    return this.def.shouldRemove(this);
  }

  return false;
};

Particle.prototype.render = function() {
  app.video.ctx.save();
  app.video.ctx.globalAlpha = this.alpha;

  if (this.def && this.def.render) {
    this.def.render(this);
  }

  app.video.ctx.globalAlpha = 1;
  app.video.ctx.restore();

};
