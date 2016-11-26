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

  },
  //detect player collision
  playerHit: function(player, blocklayer) {
    
  },
  //detection for hitting collectables
  collect: function(player, collectable) {
    
  },
  //generated collectables to the game view
  createCollectables: function() {
    
  },
  //declare game over
  gameOver: function(){
    
  },
  //moves player up, down and allows to enter QUANTUM MODE!!!!!!!!!
  playerControl: function(){
    
  }
  
}
