var Platform = function(x, y, image) {
	this.x = x;
	this.y = y;
	this.image = image;
	this.width = this.image.width;
	this.height = this.image.height;

  this.offsetX = 0;
  this.offsetY = -app.height - Math.random() * 400;
};

Platform.prototype.update = function(time) {
  this.sexyAnimation(time);

  for (var i = 0; i < app.game.platforms.length; i++) {
     var item = app.game.platforms[i];

     if (item === this) {continue;}

     if (collidesWith(this, item)) {
      var result = resolveCollision(this, item);      
     }
   }
};

Platform.prototype.render = function() {
	app.video.ctx.drawImage(this.image, this.x + this.offsetX, this.y + this.offsetY, this.width, this.height);
};

Platform.prototype.reStart = function() {
  this.offsetX = 0;
  this.offsetY = -app.height - Math.random() * 400;
};

Platform.prototype.sexyAnimation = function(time) {
  this.offsetY = this.offsetY + (0.1 - this.offsetY) * time * 6;
  if (this.offsetY > 0) { this.offsetY = 0; }
};