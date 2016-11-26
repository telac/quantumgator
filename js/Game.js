var Quantumgator = Quantumgator || {};

Quantumgator.Game = function(){};

Quantumgator.Game.prototype = {
  preload: function() {
    this.game.time.advancedTiming = true;
  },
  create: function() {
    this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
    this.background.anchor.setTo(0.5, 0.5);
  },
  update: function() {

  }
}
