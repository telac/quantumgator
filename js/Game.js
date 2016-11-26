var Quantumgator = Quantumgator || {};

Quantumgator.Game = function(){};

Quantumgator.Game.prototype = {
  preload: function() {
    this.game.time.advancedTiming = true;
  },
  create: function() {
    this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
    this.background.anchor.setTo(0.5, 0.5);
    //game.T is the current temperature
    this.game.T = 0;
    this.game.temperatureText = this.game.add.text(100,20, "temperature", {font:"12px Arial", fill:"#000000"});
    this.game.temperatureText.anchor.set(0.5);
    
  },
  update: function() {
    this.game.temperatureText.text = "temperature: " + this.game.T;
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
    
  },
  //changes the temperature in range [0,20]
  changeTemperature: function(num){
  this.game.T += num;
  }
  
}
