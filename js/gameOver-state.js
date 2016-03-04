var GameOver = function() {};

GameOver.prototype.init = function() {
  this.buttons = [];

  this.visible = true;

  this.newGame = new Button(450, 270, app.assets.get('pics/newgame.png'));
  this.buttons.push(this.newGame);
  this.menuButton = new Button(450, 390, app.assets.get('pics/menu.png'));
  this.buttons.push(this.menuButton);
};

GameOver.prototype.update = function(time) {
	for (var i = 0; i < this.buttons.length; i++) {
    this.buttons[i].update();
  }
};

GameOver.prototype.keydown = function(key) {

}

GameOver.prototype.mousedown = function(x, y, button) {
  if (x > this.newGame.x && x < this.newGame.x + this.newGame.width && y > this.newGame.y && y < this.newGame.y + this.newGame.height) {
   app.states.unpause("Game");
   app.game.restart();
	 this.visible = false;
   app.states.pause("gameOver");
  }

  if (x > this.menuButton.x && x < this.menuButton.x + this.menuButton.width && y > this.menuButton.y && y < this.menuButton.y + this.menuButton.height) {
   app.states.unpause("Game");
   app.game.restart();
   app.states.pause("Game");
	 this.visible = false;
	 app.menu = app.states.add('Menu', new Menu());
   app.states.pause("gameOver");

  }
};

GameOver.prototype.render = function() {
	if (this.visible) {
		for (var i = 0; i < this.buttons.length; i++) {
    	this.buttons[i].render(); 
  	}

  	app.video.ctx.fillStyle = 'rgba(37, 125, 176, 1)';
 		app.video.ctx.font = '70px sans-serif';
  	app.video.ctx.textAlign = 'center';
		app.video.ctx.textBaseline = 'bottom';

  	var winner = app.states.get('Game').state.winner;
 		app.video.ctx.fillText(winner, app.width / 2, 180);

		app.video.ctx.drawImage(app.assets.get('pics/endgame.png'), app.width / 2 - app.assets.get('pics/endgame.png').width / 2, 40);
		// app.video.ctx.drawImage(app.assets.get('pics/opbackground.png'), 0, 0, app.assets.get('pics/opbackground.png').width, app.assets.get('pics/opbackground.png').height);
	};


};




