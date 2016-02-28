var Button = function(x, y, image) {
  this.x = x;
  this.y = y;
  this.image = image;
  this.width = this.image.width;
  this.height = this.image.height;
};

Button.prototype.update = function(time) {  
};

Button.prototype.render = function() {
  app.video.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};




