var Quantumgator = Quantumgator || {};
Quantumgator.gameover = function(){};
Quantumgator.gameover.prototype = {
	preload: function () {
		this.load.image('skull', 'assets/images/gatorhead.png');

	},
	create: function(){
		this.background = this.add.sprite(0,0, 'skull');
		this.restart = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

	},
	update: function(){
		if(this.restart.isDown){
			this.state.start('Game')
		}

	}
}