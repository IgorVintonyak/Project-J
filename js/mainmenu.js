var Menu = function() {};

Menu.prototype.init = function() {
	app.debug.log("press A to start game");

	  
};

Menu.prototype.update = function(time) {

	if (app.input.isKeyDown("A")) {
		app.debug.clear();
		app.states.unpause("Game");
		app.states.destroy("Menu");
	}

};

Menu.prototype.keydown = function(key) {
  // for (var i=0; i<this.Menus.length; i++) {
  //   this.Menus[i].keydown(key);
  // }
}


Menu.prototype.render = function() {
	app.video.ctx.fillStyle = 'rgb(255, 0, 0)';
  app.video.ctx.fillRect(10, 40, 50, 50);
  app.video.ctx.strokeStyle = self.outline;
  app.video.ctx.fillStyle = 'rgb(255, 150, 0)';
  app.video.ctx.textAlign = 'center';
  app.video.ctx.textBaseline = 'bottom';
  app.video.ctx.font = '17px munro';
  app.video.ctx.lineJoin = 'round';
  app.video.ctx.lineWidth = 3;
  app.video.ctx.strokeText("To Start a game press A", app.width / 2, app.height /2);
  app.video.ctx.fillText("To Start a game press A", app.width / 2, app.height /2);
};




