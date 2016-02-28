/* global Potion */

window.app = Potion.init(document.querySelector('.game'), {
	configure: function() {
		this.setSize(1200, 600);
		this.assets.load('image', 'pics/player.png');
		this.assets.load('image', 'pics/leftinfobar.png');
		this.assets.load('image', 'pics/rightinfobar.png');
		this.assets.load('image', 'pics/infobarbc.png');
		this.assets.load('image', 'pics/hpbar.png');
		this.assets.load('image', 'pics/hpbar2.png');
		this.assets.load('image', 'pics/hpinfobar.png');
		this.assets.load('image', 'pics/roundtimerbar.png');
		this.assets.load('image', 'pics/playerl.png');
		this.assets.load('image', 'pics/png1.png');
		this.assets.load('image', 'pics/leftborder.png');
		this.assets.load('image', 'pics/rightborder.png');
		this.assets.load('image', 'pics/middleborder.png');
		this.assets.load('image', 'pics/ammo.png');
		this.assets.load('image', 'pics/steel.png');
		this.assets.load('image', 'pics/bandage.png');
		this.assets.load('image', 'pics/crate.png');
		this.assets.load('image', 'pics/newgame.png');
		this.assets.load('image', 'pics/exit.png');
		this.assets.load('image', 'pics/resume.png');
		this.assets.load('image', 'pics/menu.png');
		this.assets.load('image', 'pics/endgame.png');
		this.assets.load('image', 'pics/opbackground.png');


		this.assets.load('sound', 'sounds/jump.wav');
		this.assets.load('sound', 'sounds/pistol.wav');
		this.assets.load('sound', 'sounds/melee.wav');
		this.assets.load('sound', 'sounds/shot.wav');
		this.assets.load('sound', 'sounds/shotgun.wav');
		this.assets.load('sound', 'sounds/bonus.wav');
		this.assets.load('sound', 'sounds/hit.wav');

	},

	init: function() {
		this.menu = this.states.add('Menu', new Menu());
		this.game = this.states.add('Game', new Game());
		this.pause = this.states.add('Pause', new Pause());
		this.gameOver = this.states.add('gameOver', new GameOver());

		this.states.pause('Pause');
		this.states.pause('gameOver');
		this.states.pause('Game');
	},

	keydown: function(key) {
		if (key === 80 && !this.states.get('Menu')) {
			var state = this.states.get('Game');
		if (state.paused) {
				this.states.unpause('Game');
				this.pause.visible = false;
				this.states.pause('Pause');
			} else {
				this.states.pause('Game');
				this.states.unpause('Pause');
				this.pause.visible = true;
			}
		}

		if (key === 77) {
			this.game.restart();
			for (var i = 0; i < app.game.bonuses.length; i++) {
 				app.game.bonuses[i].isDead = true;
 			}
			this.pause.visible = false;
			this.states.pause('Game');
			this.menu = this.states.add('Menu', new Menu());
			// if (stateMenu.paused) {
			// 	this.states.unpause('Game');
			// } else {
			// 	this.states.pause('Game');
			// }
		}
	}
}); 
