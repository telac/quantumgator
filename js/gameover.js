var Quantumgator = Quantumgator || {};
Quantumgator.gameover = function(){};
Quantumgator.gameover.prototype = {
	create: function(){
		this.game.stage.backgroundColor = '#555555';
		this.jaw = this.add.sprite(this.game.width/2, this.game.height/2, 'jaw');
		this.skull = this.add.sprite(this.game.width/2, this.game.height/2, 'skull');
		this.overText = this.add.sprite(this.game.width/2, 100, 'gameoverText');
		this.restartText = this.add.sprite(this.game.width/2, this.game.height-50, 'restartText');
		this.scoreText = this.add.text(100, this.game.height - 100, "score", {font:"20px Arial", fill:"#000000"});
		this.scoreText.text = 'score: ' + this.game.score;
		this.overText.anchor.setTo(0.5, 0.5);
		this.restartText.anchor.setTo(0.5, 0.5);
		this.jaw.anchor.setTo(0.5, 0.5);
		this.jaw.scale.setTo(0.25, 0.25);
		this.skull.anchor.setTo(0.5, 0.5);
		this.skull.scale.setTo(0.25, 0.25);
		this.restart = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);

	},
	update: function(){
		if(this.restart.isDown){
			this.state.start('menu')
		}
		this.jaw.y = this.game.height/2 + 100 + 20 * Math.sin(this.time.now/500);
		this.restartText.scale.setTo(0.75+0.25*Math.sin((this.time.now)/250), 0.75+0.25*Math.sin((this.time.now)/250));
		this.restartText.angle = 4 * Math.sin((this.time.now + 500)/750);
	}
}
