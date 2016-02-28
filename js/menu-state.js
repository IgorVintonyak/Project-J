var Menu = function() {};

Menu.prototype.init = function() {
  this.buttons = [];    

  // this.exitButton = new Button(450, 400, app.assets.get('pics/exit.png'));
  // this.scoreButton = new Button(450, 250, app.assets.get('pics/highscore.png'));
  // this.buttons.push(this.exitButton);
  // this.buttons.push(this.scoreButton);
  this.startButton = new Button(450, 200, app.assets.get('pics/newgame.png'));
  this.buttons.push(this.startButton);
};

Menu.prototype.update = function(time) {

  for (var i = 0; i < this.buttons.length; i++) {
    this.buttons[i].update();
  }
	if (app.input.isKeyDown("A")) {
   app.states.unpause("Game");
   for (var i = 0; i < app.game.bonuses.length; i++) {
    app.game.bonuses.splice(i, 1);
   }
	 app.states.destroy("Menu");
	}  
};

Menu.prototype.mousedown = function(x, y, button) {
  if (x > this.startButton.x && x < this.startButton.x + this.startButton.width && y > this.startButton.y && y < this.startButton.y + this.startButton.height) {
   app.states.unpause("Game");
   app.states.destroy("Menu");
  };
};

Menu.prototype.keydown = function(key) {
}


Menu.prototype.render = function() {
  for (var i = 0; i < this.buttons.length; i++) {
    this.buttons[i].render(); 
  }
  
  app.video.ctx.drawImage(app.assets.get('pics/opbackground.png'), 0, 0, app.assets.get('pics/opbackground.png').width, app.assets.get('pics/opbackground.png').height);
};




