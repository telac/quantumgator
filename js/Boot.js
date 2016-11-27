var Quantumgator = Quantumgator || {};

Quantumgator.Boot = function(){};

Quantumgator.Boot.prototype = {
  preload: function() {
    this.load.image('loadingImage', 'assets/images/loading_gato.png');
  },
  create: function() {
    //white loading screen background
    this.game.stage.backgroundColor = '#fff';
    this.state.start('Preload');
  }
}
