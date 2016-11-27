Quantumgator.menu = function(){};

Quantumgator.menu.prototype = {
  create: function() {
    this.startback = this.add.sprite(0, 0, 'startScreen');
    this.starttext = this.add.sprite(this.game.width/2, this.game.height - 50, 'startText');
		this.starttext.anchor.setTo(0.5, 0.5);
    this.restart = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);
  },
	update: function(){
		if(this.restart.isDown){
			this.state.start('Game');
		}
    this.starttext.scale.setTo(0.75+0.25*Math.sin((this.time.now)/250), 0.75+0.25*Math.sin((this.time.now)/250));
    this.starttext.angle = 4 * Math.sin((this.time.now + 500)/750);
	}
}
