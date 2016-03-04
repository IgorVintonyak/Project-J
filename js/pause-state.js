var Pause = function() {};

Pause.prototype.init = function() {
  this.buttons = [];

  this.visible = true;

  this.resumeButton = new Button(450, 150, app.assets.get('pics/resume.png'));
  this.buttons.push(this.resumeButton);
  this.exitButton = new Button(450, 350, app.assets.get('pics/exit.png'));
  this.buttons.push(this.exitButton);
};

Pause.prototype.update = function(time) {
	for (var i = 0; i < this.buttons.length; i++) {
    this.buttons[i].update();
  }
};

Pause.prototype.keydown = function(key) {

}

Pause.prototype.mousedown = function(x, y, button) {
  if (x > this.resumeButton.x && x < this.resumeButton.x + this.resumeButton.width && y > this.resumeButton.y && y < this.resumeButton.y + this.resumeButton.height) {
   app.states.unpause("Game");
	 this.visible = false;
   app.states.pause("Pause");
  }

  if (x > this.exitButton.x && x < this.exitButton.x + this.exitButton.width && y > this.exitButton.y && y < this.exitButton.y + this.exitButton.height) {
   app.states.unpause("Game");
   app.game.restart();
   app.states.pause("Game");
	 this.visible = false;
	 app.menu = app.states.add('Menu', new Menu());
   app.states.pause("Pause");

  }
};

Pause.prototype.render = function() {
  if (this.visible) {
	  app.video.ctx.drawImage(app.assets.get('pics/opbackground.png'), 0, 0, app.assets.get('pics/opbackground.png').width, app.assets.get('pics/opbackground.png').height);
    for (var i = 0; i < this.buttons.length; i++) {
      this.buttons[i].render(); 
    }
	};


};




