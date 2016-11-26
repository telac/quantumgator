var Quantumgator = Quantumgator || {};

Quantumgator.Game = function(){};

Quantumgator.Game.prototype = {
  preload: function() {
    this.time.advancedTiming = true;
  },
  create: function() {
    this.background = this.add.sprite(this.world.centerX, this.world.centerY, 'background');
    this.background.anchor.setTo(0.5, 0.5);
    //game.T is the current temperature, keep between [0, 20]
    this.T = 0;
    this.temperatureText = this.add.text(100, 20, "temperature", {font:"20px Arial", fill:"#000000"});
    this.temperatureText.anchor.set(0.5);
    this.altitudeText = this.add.text(250, 20, "altitude", {font:"20px Arial", fill:"#000000"});
    this.altitudeText.anchor.set(0.5);
    this.quantumText = this.add.text(400, 20, "quantum", {font:"20px Arial", fill:"#000000"});
    this.quantumText.anchor.set(0.5);

    this.lanes = this.add.group();
    for (i = 0; i < 5; i++) {
      this.lanes.create(0, 80+100*i, 'lane');
    }

    this.lanes.forEach(function(item) {
      item.scale.setTo(window.innerWidth/item.width, 1);
    });

    this.player = this.add.sprite(100, 280, 'gator');
    this.player.anchor.setTo(0.5, 0.5);

    //keep between [0, 4]
    this.altitude = 2;
    this.quantum = false;

    // keys
    this.quantumButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this.upButton = this.input.keyboard.addKey(Phaser.KeyCode.UP);
    this.downButton = this.input.keyboard.addKey(Phaser.KeyCode.DOWN);
    this.upButton.onDown.add(this.playerUp, this);
    this.downButton.onDown.add(this.playerDown, this);

  },
  update: function() {
    if (this.quantumButton.isDown) {
      this.quantum = true;
    } else {
      this.quantum = false;
    }
    this.temperatureText.text = "temperature: " + this.T;
    this.altitudeText.text = "altitude: " + this.altitude;
    this.quantumText.text = "quantum: " + this.quantum;
    this.player.y = 80 + this.altitude*100;
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
  playerUp: function() {
    this.altitude--;
    if (this.altitude < 0) {
      this.altitude = 0;
    }
  },
  playerDown: function() {
    this.altitude++;
    if (this.altitude > 4) {
      this.altitude = 4;
    }
  },
  //changes the temperature in range [0,20]
  changeTemperature: function(num){
  this.T += num;
  }

}
