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
    //this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockLayer = this.map.createLayer('blockedLayer');
    this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');
    this.objectsLayer = this.map.createLayer('objectsLayer');
    this.blockLayer.resizeWorld();
    this.blockLayer.position.set(0, 100);
    this.background.scale.setTo(this.game.world.bounds.width/this.background.width, 1);
    //create objects
    this.createCollectables();
    //game.T is the current temperature, keep between [0, 20]
    this.T = 2;
    //initilize velocity
    this.velocity = 250;
    //create emitter
    this.emitter = this.createEmitter();

    //add lanes
    this.lanes = this.add.group();
    for (i = 1; i < 6; i++) {
      this.lanes.create(0, 84+84*i, 'lane');
    }

    var worldWidth = this.game.world.bounds.width;
    this.lanes.forEach(function(item) {
      item.anchor.setTo(0, 1);
      item.scale.setTo(worldWidth/item.width, 1);
      item.alpha = 0;
    });

    this.player = this.add.sprite(-200, 280, 'player');
    this.game.physics.arcade.enable(this.player);
    //this.player = this.add.sprite(-200, 280, 'gatorUpperHead');
    this.player.scale.setTo(0.5, 0.5);
    this.player.anchor.setTo(0.5, 0.5);
    //this.player.alpha = 0;
    this.createGator();
    this.createQuantumGator();

    //keep between [0, 4]
    this.altitude = 2;
    this.quantum = false;

    // keys
    this.upButton = this.input.keyboard.addKey(Phaser.KeyCode.UP);
    this.downButton = this.input.keyboard.addKey(Phaser.KeyCode.DOWN);
    // reset for debug!
    this.reset = this.input.keyboard.addKey(Phaser.KeyCode.R);
    this.reset.onDown.add(this.resetPosition, this);

    this.upButton.onDown.add(this.playerUp, this);
    this.downButton.onDown.add(this.playerDown, this);
    this.quantumButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this.lastQuantumState = this.quantum;
  },
  update: function() {

  if (this.quantumButton.isDown && false) {
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
    }
    this.player.body.velocity.x = 300;
    this.passiveHeat();
    this.player.body.velocity.x = this.velocity;

    if (this.quantum != this.lastQuantumState) {
      if (this.quantum) {
        this.map.addTilesetImage('tiles_spreadsheet', 'tilesQ');
        this.quantumGatorParts.visible = true;
        this.gatorParts.visible = false;
      } else {
        this.map.addTilesetImage('tiles_spreadsheet', 'tiles');
        this.quantumGatorParts.visible = false;
        this.gatorParts.visible = true;
      }
    }
    this.lastQuantumState = this.quantum;

    if (this.quantumButton.isDown) {
      this.quantum = true;
    } else {
      this.quantum = false;
    }

    this.player.y = 84 + this.altitude*84;
    if(this.quantum == false){
       if (this.physics.arcade.collide(this.player, this.blockLayer)) {
         this.gameOver();
       }
    }

    if (!this.quantum) {
      this.gatorAnimation();
    } else {
      this.quantumGatorAnimation();
    }

    this.game.camera.x = this.player.body.x - 150;
    this.game.camera.y = this.player.body.y;
    },

  quantumGatorAnimation: function() {
    freq = 50;
    this.player.y = 84 + 42 + this.altitude*84 + 6 * Math.sin(this.time.now/freq);
    this.quantumGatorParts.x = this.player.body.x;
    this.quantumGatorParts.y = this.player.body.y - 6 * Math.sin(this.time.now/freq);
    this.quantumGatorParts.children[4].y = 6 * Math.sin(this.time.now/freq);
    this.quantumGatorParts.children[3].y = 20 + 6 * Math.sin(this.time.now/freq);
    this.quantumGatorParts.children[3].angle = 10 * Math.sin(this.time.now/100) + 15;
    this.quantumGatorParts.children[0].y = 20 + 6 * Math.sin((this.time.now-freq)/freq);
    this.quantumGatorParts.children[1].y = 30 + 6 * Math.sin((this.time.now-freq)/freq);
    this.quantumGatorParts.children[1].angle = 10 * Math.sin(this.time.now/100);
    this.quantumGatorParts.children[2].y = 30 + 4 * Math.sin((this.time.now-freq)/freq);
    this.quantumGatorParts.children[2].angle = 10 * Math.sin(this.time.now/100);
  },

  gatorAnimation: function(){
    freq = 100;
    this.player.y = 84 + 42 + this.altitude*84 + 4 * Math.sin(this.time.now/freq);
    this.gatorParts.x = this.player.body.x;
    this.gatorParts.y = this.player.body.y - 4 * Math.sin(this.time.now/freq);
    this.gatorParts.children[5].y = 4 * Math.sin(this.time.now/freq);
    this.gatorParts.children[4].y = 20 + 4 * Math.sin(this.time.now/freq);
    this.gatorParts.children[4].angle = 8 * Math.sin(this.time.now/100) + 15;
    this.gatorParts.children[3].y = 20 + 4 * Math.sin((this.time.now-freq)/freq);
    this.gatorParts.children[2].y = 5 + 5 * Math.sin((this.time.now-2*freq)/freq);
    this.gatorParts.children[1].y = 10 + 6 * Math.sin((this.time.now-3*freq)/freq);
    this.gatorParts.children[0].y = 15 + 7 * Math.sin((this.time.now-4*freq)/freq);
    this.gatorParts.children[6].y = 30 + 4 * Math.sin((this.time.now-freq)/freq);
    this.gatorParts.children[6].angle = 8 * Math.sin(this.time.now/100);
    this.gatorParts.children[7].y = 30 + 4 * Math.sin((this.time.now-freq)/freq);
    this.gatorParts.children[7].angle = 10 * Math.sin(this.time.now/100);
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
    if (this.T > 25) {
      this.velocity = 0;
      this.gameOver();
    }
    this.velocity = 250 + 50*this.T;
  },
  //detect player collision
  playerHit: function(player, blocklayer) {

  },
  //detection for hitting collectables
  collect: function(player, collectable) {

  },
  //generated collectables to the game view
  //....tää on iha helvetin paska idea, en oikeesti tiedä mikä saa mut tekemään tän. mut teen kuitenki.
  //anteeks.
  createCollectables: function() {
    this.collectables = this.add.group();
    this.collectables.enablebody = true;
    var cold_objects = this.locateObjects('cold', this.map, 'objectsLayer');
    var hot_objects = this.locateObjects('hot', this.map, 'objectsLayer');
    
    cold_objects.forEach(function(element){
      this.createNiceSprites(element, this.collectables)
    }, this);
    
  },

  createGator: function(){
    this.gatorParts = this.add.group();

    this.gatorParts.create(-125, 0, 'gatorTailTip');
    this.gatorParts.create(-100, 0, 'gatorTail');
    this.gatorParts.create(-75, 0, 'gatorTail');
    this.gatorParts.create(-20, 0, 'gatorBody');
    this.gatorParts.create(8, 0, 'gatorLowerHead');
    this.gatorParts.create(0, 0, 'gatorUpperHead');
    this.gatorParts.create(-5, 0, 'gatorFrontLeg');
    this.gatorParts.create(-55, 0, 'gatorBackLeg');

    //tailtip
    this.gatorParts.children[0].scale.setTo(0.5, 0.3);

    //backtail
    this.gatorParts.children[1].scale.setTo(0.5, 0.4);

    //fronttail
    this.gatorParts.children[2].scale.setTo(0.5, 0.5);

    //body
    this.gatorParts.children[3].scale.setTo(0.5, 0.5);
    this.gatorParts.children[3].anchor.setTo(0.5, 0.5);

    //lower jaw
    this.gatorParts.children[4].scale.setTo(0.5, 0.5);
    this.gatorParts.children[4].anchor.setTo(0.1, 0.5);

    //upper jaw
    this.gatorParts.children[5].scale.setTo(0.5, 0.5);

    //frontleg
    this.gatorParts.children[6].scale.setTo(0.5, 0.5);
    this.gatorParts.children[6].anchor.setTo(0.75, 0.2);

    //backleg
    this.gatorParts.children[7].scale.setTo(0.5, 0.5);
    this.gatorParts.children[7].anchor.setTo(0.6, 0.3);
  },

  createQuantumGator: function(){
    this.quantumGatorParts = this.add.group();

    this.quantumGatorParts.create(-20, 100, 'qGatorBody');
    this.quantumGatorParts.create(-5, 100, 'qGatorFrontLeg');
    this.quantumGatorParts.create(-55, 100, 'qGatorBackLeg');
    this.quantumGatorParts.create(8, 100, 'qGatorLowerHead');
    this.quantumGatorParts.create(0, 0, 'qGatorUpperHead');

    //body
    this.quantumGatorParts.children[0].scale.setTo(0.5, 0.5);
    this.quantumGatorParts.children[0].anchor.setTo(0.5, 0.5);

    //frontleg
    this.quantumGatorParts.children[1].scale.setTo(0.5, 0.5);
    this.quantumGatorParts.children[1].anchor.setTo(0.5, 0.33);

    //backleg
    this.quantumGatorParts.children[2].scale.setTo(0.5, 0.5);
    this.quantumGatorParts.children[2].anchor.setTo(0.5, 0.33);

    //lower jaw
    this.quantumGatorParts.children[3].scale.setTo(1, 1);
    this.quantumGatorParts.children[3].anchor.setTo(0.1, 0.5);

    //upper jaw
    this.quantumGatorParts.children[4].scale.setTo(1, 0.75);

    this.quantumGatorParts.visible = false;
  },

  //declare game over
  gameOver: function(){
    this.velocity = 0;
    this.game.state.start('Game');
  },

  resetPosition: function () {
    this.player.x = -200;
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
//idea behind adding new objects borrowed from this guide:
//https://software.intel.com/en-us/html5/hub/blogs/how-to-make-a-sidescroller-game-with-html5/
locateObjects: function(type, lvl, layer) {
  var objects = new Array();
  lvl.objects[layer].forEach(function(element){
    console.log(element);
    if(element.type === type) {
      element.y -= lvl.tileHeight;
      objects.push(element);
    }
  });
  return objects;
},

createNiceSprites: function(element, group){
  var sprite = group.create(element.x, element.y, element.sprite);
  Object.keys(element).forEach(function(key){
      //console.log(element.type);
      //console.log(element.x);
      //console.log(element.y);
      sprite[key] = (element.x, element.y, element.name);
      console.log(sprite);
  });

},

  render: function(){
    this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.text("temperature: " + this.T, 400, 20);
    this.game.debug.text("altitude: " + this.altitude, 400, 30);
    this.game.debug.text("quantum: " + this.quantum, 400, 40);
    this.game.debug.text("x: " + this.game.camera.x + " y: " + this.game.camera.y, 400, 50);
  }
}
