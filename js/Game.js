var Quantumgator = Quantumgator || {};
var emitter;

Quantumgator.Game = function(){};

Quantumgator.Game.prototype = {
  preload: function() {

    this.time.advancedTiming = true;
  },
  create: function() {
    this.background = this.add.sprite(0, 0, 'background');

    this.map = this.game.add.tilemap('testlevel');
    this.map.addTilesetImage('tiles_spreadsheet', 'tiles');
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockLayer = this.map.createLayer('blockedLayer');
    this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');
    this.objectsLayer = this.map.createLayer('objectsLayer');
    this.backgroundlayer.resizeWorld();

    this.background.scale.setTo(this.game.world.bounds.width/this.background.width, 1);

    //game.T is the current temperature, keep between [0, 20]
    this.T = 0;

    //initilize velocity
    this.velocity = 250;
    //create emitter
    this.emitter = this.createEmitter();

    //add lanes
    this.lanes = this.add.group();
    for (i = 0; i < 5; i++) {
      this.lanes.create(0, 100+84*i, 'lane');
    }

    var worldWidth = this.game.world.bounds.width;
    this.lanes.forEach(function(item) {
      item.anchor.setTo(0, 0.5);
      item.scale.setTo(worldWidth/item.width, 1);
    });

    this.player = this.add.sprite(84, 280, 'gator');
    this.player.anchor.setTo(0.5, 0.5);
    this.square = this.add.sprite(50,50, 'cold');
    this.game.physics.arcade.enable(this.player);

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

    this.passiveHeat();
    this.gameOver();
    this.player.body.velocity.x = this.velocity;

    if (this.quantumButton.isDown) {
      this.quantum = true;
    } else {
      this.quantum = false;
    }

    this.player.y = 100 + this.altitude*84;

    this.square.y = ((this.player.y+Math.sin(this.time.now)));
    this.square.x = this.player.x;

    this.game.camera.x = this.player.body.x;
    this.game.camera.y = this.player.body.y;
    },

  createEmitter: function(){
    emitter = this.add.emitter(this.world.centerX, 200, 200);
    emitter.width = 800;
    emitter.makeParticles('star');
    emitter.minParticleSpeed.set(0, 300);
    emitter.maxParticleSpeed.set(0, 400);
    emitter.setRotation(0, 0);
    emitter.setAlpha(0.3, 0.8);
    emitter.setScale(0.5, 0.5, 1, 1);
    emitter.gravity = -200;
    emitter.start(false, 5000, 100);
  },

  passiveHeat: function(){
    this.T += 0.01;
    this.velocity = 250 + 50*this.T;
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
    if (this.T > 25) {
      this.velocity = 0;
      this.game.state.start('Game');
    }
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
},

  render: function(){
    this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.text("temperature: " + this.T, 400, 20);
    this.game.debug.text("altitude: " + this.altitude, 400, 30);
    this.game.debug.text("quantum: " + this.quantum, 400, 40);
    this.game.debug.text("x: " + this.game.camera.x + " y: " + this.game.camera.y, 400, 50);
  }
}
