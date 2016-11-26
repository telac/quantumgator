var Quantumgator = Quantumgator || {};

Quantumgator.Boot = function(){};

Quantumgator.Boot.prototype = {
  preload: function() {
    this.load.image('preloadbar', 'assets/images/preloadbar.png');
  },

  create: function() {
    //white loading screen background
    this.game.stage.backgroundColor = '#fff';

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.state.start('Preload');
  }
}
