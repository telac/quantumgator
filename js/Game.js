var Quantumgator = Quantumgator || {};

Quantumgator.Game = function(){};

Quantumgator.Game.prototype = {
  preload: function() {

    this.time.advancedTiming = true;
  },
  create: function() {
    this.background = this.add.sprite(this.world.centerX, this.world.centerY, 'background');
    this.background.anchor.setTo(0.5, 0.5);

    this.map = this.game.add.tilemap('testlevel');
    this.map.addTilesetImage('tiles_spreadsheet', 'tiles');
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockLayer = this.map.createLayer('blockedLayer');
    this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');
    this.objectsLayer = this.map.createLayer('objectsLayer');

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
      this.lanes.create(0, 100+84*i, 'lane');
    }

    this.lanes.forEach(function(item) {
      item.anchor.setTo(0, 0.5);
      item.scale.setTo(window.innerWidth/item.width, 1);
    });

    this.player = this.add.sprite(84, 280, 'gator');
    this.player.anchor.setTo(0.5, 0.5);
    this.square = this.add.sprite(50,50, 'cold');
    this.game.physics.arcade.enable(this.player);


    //follow the player
    this.game.camera.follow(this.player);

    //keep between [0, 4]
    this.altitude = 2;
    this.quantum = false;

    // keys
    this.quantumButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this.upButton = this.input.keyboard.addKey(Phaser.KeyCode.UP);
    this.downButton = this.input.keyboard.addKey(Phaser.KeyCode.DOWN);
    // reset for debug!
    this.reset = this.input.keyboard.addKey(Phaser.KeyCode.R);
    this.reset.onDown.add(this.resetPosition, this);

    this.upButton.onDown.add(this.playerUp, this);
    this.downButton.onDown.add(this.playerDown, this);

  },
  update: function() {
    this.player.body.velocity.x = 300;
    if (this.quantumButton.isDown) {
      this.quantum = true;
    } else {
      this.quantum = false;
    }
    this.temperatureText.text = "temperature: " + this.T;
    this.altitudeText.text = "altitude: " + this.altitude;
    this.quantumText.text = "quantum: " + this.quantum;

    this.player.y = 100 + this.altitude*84;
    //console.log(Math.sin(this.time.now));
   //this.square.angle = (Math.sin(-this.player.x)*100);
  this.square.y = ((this.player.y+Math.sin(this.time.now));
   this.square.x = this.player.x;
   //this.square.pivot.y = 75;
   //this.square.rotation =+ 0.5
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

  resetPosition: function () {
    this.player.y = 50;
    this.player.x = 100;
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
