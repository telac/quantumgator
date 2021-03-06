var Quantumgator = Quantumgator || {};
Quantumgator.Game = function(){};

Quantumgator.Game.prototype = {
  preload: function() {

    this.time.advancedTiming = true;
  },
  create: function() {
    this.background = this.add.sprite(0, 0, 'background');
    this.map = this.game.add.tilemap('level1');
    this.map.addTilesetImage('tiles_spreadsheet', 'tiles');
    this.blockLayer = this.map.createLayer('blockedLayer');
    this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');
    this.objectsLayer = this.map.createLayer('objectsLayer');
    this.blockLayer.resizeWorld();
    this.blockLayer.position.set(0, 100);
    this.music1 = this.add.audio('backgroundmusic');
    this.music = this.add.audio('quantummusic');
    this.coldsound = this.add.audio('good(s)hit');
    this.music.mute = true;
    this.music1.play();
    this.music.play();
    this.game.scoreText = this.add.text(100, 20, "score", {font: "20px Arial", fill:"#000000"});
    this.game.scoreText.fixedToCamera = true;
    //health bar
    var barConfig = {x: 250, y: 550,
      bg: {
      color: '#3366ff'
    },
    bar: {
      color: '#ff0000'},
      width: 400,
    };

    this.temperatureBar = new HealthBar(this.game, barConfig);
    this.temperatureBar.setFixedToCamera(true);
    this.temperatureBar.setPercent((2 / 25) * 100);

    //game.T is the current temperature, keep between [0, 20]
    this.T = 2;
    //initilize velocity
    this.velocity = 250;
    this.createEmitter();

    this.player = this.add.sprite(-200, 280, 'Playerobject');
    this.game.physics.arcade.enable(this.player);
    this.player.scale.setTo(0.5, 0.5);
    this.player.anchor.setTo(0.5, 0.5);
    this.player.alpha = 0;
    this.createGator();
    this.createQuantumGator();
    this.createCollectables();

    this.ice = this.add.sprite(-500, -500, 'ice');
    this.iceQ = this.add.sprite(-500, -500, 'iceQ');
    this.dwarf = this.add.sprite(-500, -500, 'dwarf');
    this.dwarfQ = this.add.sprite(-500, -500, 'dwarfQ');
    this.chili = this.add.sprite(-500, -500, 'chili');
    this.chiliQ = this.add.sprite(-500, -500, 'chiliQ');
    this.bonfire = this.add.sprite(-500, -500, 'bonfire');
    this.bonfireQ = this.add.sprite(-500, -500, 'bonfireQ');
    this.snowman = this.add.sprite(-500, -500, 'snowman');
    this.snowmanQ = this.add.sprite(-500, -500, 'snowmanQ');
    this.icecream = this.add.sprite(-500, -500, 'icecream');
    this.icecreamQ = this.add.sprite(-500, -500, 'icecreamQ');

    //keep between [0, 4]
    this.altitude = 2;
    this.quantum = false;
    this.game.score = 0;

    // keys
    this.upButton = this.input.keyboard.addKey(Phaser.KeyCode.UP);
    this.downButton = this.input.keyboard.addKey(Phaser.KeyCode.DOWN);
    // reset for debug!
    this.reset = this.input.keyboard.addKey(Phaser.KeyCode.R);
    //this.reset.onDown.add(this.resetPosition, this);

    this.upButton.onDown.add(this.playerUp, this);
    this.downButton.onDown.add(this.playerDown, this);
    this.quantumButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this.lastQuantumState = this.quantum;
  },
  update: function() {
    this.game.scoreText.text = 'score: ' + this.game.score;
    this.passiveHeat();
    this.player.body.velocity.x = this.velocity;
    if (this.quantum != this.lastQuantumState) {
      this.collectables.forEach(function(element){
        if (element.key == 'ice') {
          element.setTexture(this.iceQ.texture);
          element.key = 'iceQ';
        } else if (element.key == 'iceQ') {
          element.setTexture(this.ice.texture);
          element.key = 'ice';
        } else if (element.key == 'dwarf') {
          element.setTexture(this.dwarfQ.texture);
          element.key = 'dwarfQ';
        } else if (element.key == 'dwarfQ') {
          element.setTexture(this.dwarf.texture);
          element.key = 'dwarf';
        } else if (element.key == 'chili') {
          element.setTexture(this.chiliQ.texture);
          element.key = 'chiliQ';
        } else if (element.key == 'chiliQ') {
          element.setTexture(this.chili.texture);
          element.key = 'chili';
        } else if (element.key == 'bonfire') {
          element.setTexture(this.bonfireQ.texture);
          element.key = 'bonfireQ';
        } else if (element.key == 'bonfireQ') {
          element.setTexture(this.bonfire.texture);
          element.key = 'bonfire';
        } else if (element.key == 'snowman') {
          element.setTexture(this.snowmanQ.texture);
          element.key = 'snowmanQ';
        } else if (element.key == 'snowmanQ') {
          element.setTexture(this.snowman.texture);
          element.key = 'snowman';
        } else if (element.key == 'icecream') {
          element.setTexture(this.icecreamQ.texture);
          element.key = 'icecreamQ';
        } else if (element.key == 'icecreamQ') {
          element.setTexture(this.icecream.texture);
          element.key = 'icecream';
        }
      }, this);
      if (this.quantum) {
        this.map.addTilesetImage('tiles_spreadsheet', 'tilesQ');
        this.quantumGatorParts.visible = true;
        this.gatorParts.visible = false;
        this.emitter.on = true;
      } else {
        this.map.addTilesetImage('tiles_spreadsheet', 'tiles');
        this.quantumGatorParts.visible = false;
        this.gatorParts.visible = true;
        this.emitter.on = false;
      }
    }
    this.lastQuantumState = this.quantum;

    if (this.quantumButton.isDown) {
      this.quantum = true;
    } else {
      this.quantum = false;
    }

    var angle = 25 * Math.sin(this.time.now/500);
    this.collectables.forEach(function(element){
      element.angle = angle;
    }, this);

    this.player.y = 84 + this.altitude*84;
    if(this.quantum == false){
       if (this.physics.arcade.collide(this.player, this.blockLayer)) {
         this.gameOver();
       }
    }
    this.game.physics.arcade.overlap(this.player, this.collectables, this.collect, null, this);

    this.emitter.x = this.player.x + 500;
    this.emitter.y = 0;

    if (this.player.x > this.game.world.bounds.width) {
      this.resetPosition();
    }

    if (!this.quantum) {
      this.gatorAnimation();
      this.music1.mute = false;
      this.music.mute = true;
          }
          if(this.quantum) {
      this.quantumGatorAnimation();
      this.music1.mute = true;
      this.music.mute = false;
    }

    var percent = this.player.x/this.game.world.bounds.width;
    this.background.x = this.player.x - 200 - percent*(this.background.width-600);
    if (this.player.x > this.game.world.bounds.width - 600) {
      this.background.x = this.game.world.bounds.width - this.background.width;
    }

    this.game.camera.x = this.player.body.x - 150;
    this.game.camera.y = this.player.body.y;
    },

  quantumGatorAnimation: function() {
    var freq = 50;
    this.player.y = 84 + 42 + this.altitude*84 + 6 * Math.sin(this.time.now/freq);
    this.quantumGatorParts.x = this.player.body.x;
    this.quantumGatorParts.y = this.player.body.y - 6 * Math.sin(this.time.now/freq);
    this.quantumGatorParts.children[5].y = 6 * Math.sin(this.time.now/freq);
    this.quantumGatorParts.children[4].y = 20 + 6 * Math.sin(this.time.now/freq);
    this.quantumGatorParts.children[4].angle = 10 * Math.sin(this.time.now/100) + 15;
    this.quantumGatorParts.children[1].y = 20 + 6 * Math.sin((this.time.now-freq)/freq);
    this.quantumGatorParts.children[2].y = 30 + 6 * Math.sin((this.time.now-freq)/freq);
    this.quantumGatorParts.children[2].angle = 10 * Math.sin(this.time.now/100);
    this.quantumGatorParts.children[3].y = 30 + 4 * Math.sin((this.time.now-freq)/freq);
    this.quantumGatorParts.children[3].angle = 10 * Math.sin(this.time.now/100);
    this.quantumGatorParts.children[0].y = 20 + 6 * Math.sin(this.time.now/freq);
  },

  gatorAnimation: function(){
    var freq = 100;
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
    this.emitter = this.add.emitter(0, 200, 200);
    this.emitter.width = 800;
    this.emitter.makeParticles('star');
    this.emitter.minParticleSpeed.set(0, 300);
    this.emitter.maxParticleSpeed.set(0, 400);
    this.emitter.setRotation(0, 0);
    this.emitter.setAlpha(0.3, 0.8);
    this.emitter.setScale(0.5, 0.5, 1, 1);
    this.emitter.gravity = -100;
    this.emitter.start(false, 5000, 50);
    this.emitter.on = false;
  },

  passiveHeat: function(){
    this.changeTemperature(0.01);
    if (this.quantum) {
      this.changeTemperature(0.07);
    }
    if (this.T > 25) {
      this.velocity = 0;
      this.gameOver();
    }
    this.velocity = 300 + 20*this.T;
  },
  //detect player collision
  playerHit: function(player, blocklayer) {

  },
  //detection for hitting collectables
  collect: function(player, collectable) {
    switch (collectable.key) {
      case 'chili':
        this.game.score += 50;
        this.changeTemperature(2);
        break;
      case 'bonfire':
        this.game.score += 100;
        this.changeTemperature(5);
        break;
      case 'dwarf':
        this.game.score += 250;
        this.changeTemperature(10);
        break;
      case 'icecream':
        this.game.score += 20;
        this.changeTemperature(-2);
        break;
      case 'ice':
        this.game.score += 5;
        this.changeTemperature(-5);
        break;
      case 'snowman':
        this.game.score += 150;
        this.changeTemperature(-10);
        break;
    }
    this.coldsound.play();
    collectable.destroy();
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
    this.quantumGatorParts.create(-75, 0, 'qGatorTail');
    this.anim = this.quantumGatorParts.children[0].animations.add('anim');
    this.quantumGatorParts.children[0].animations.play('anim', 24, true);

    this.quantumGatorParts.create(-20, 0, 'qGatorBody');
    this.quantumGatorParts.create(-5, 0, 'qGatorFrontLeg');
    this.quantumGatorParts.create(-55, 0, 'qGatorBackLeg');
    this.quantumGatorParts.create(8, 0, 'qGatorLowerHead');
    this.quantumGatorParts.create(0, 0, 'qGatorUpperHead');

    //tail
    this.quantumGatorParts.children[0].scale.setTo(1.2, 0.8);
    this.quantumGatorParts.children[0].anchor.setTo(0.5, 0.5);

    //body
    this.quantumGatorParts.children[1].scale.setTo(0.5, 0.5);
    this.quantumGatorParts.children[1].anchor.setTo(0.5, 0.5);

    //frontleg
    this.quantumGatorParts.children[2].scale.setTo(0.5, 0.5);
    this.quantumGatorParts.children[2].anchor.setTo(0.5, 0.33);

    //backleg
    this.quantumGatorParts.children[3].scale.setTo(0.5, 0.5);
    this.quantumGatorParts.children[3].anchor.setTo(0.5, 0.33);

    //lower jaw
    this.quantumGatorParts.children[4].scale.setTo(1, 1);
    this.quantumGatorParts.children[4].anchor.setTo(0.1, 0.5);

    //upper jaw
    this.quantumGatorParts.children[5].scale.setTo(1, 0.75);

    this.quantumGatorParts.visible = false;
  },

  //declare game over
  gameOver: function(){
    this.velocity = 0;
    this.music.stop();
    this.music1.stop();
    this.game.state.start('gameover');
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
  if (this.T < 0) this.T = 0;
  this.temperatureBar.setPercent((this.T / 25)*100);
},

locateObjects: function(type, lvl, layer) {
 var objects = new Array();
 lvl.objects[layer].forEach(function(element){
   if(element.properties.type === type) {
     element.y -= lvl.tileHeight;
     objects.push(element);
   }
 });
 return objects;
},

createNiceSprites: function(element, group){
 var sprite = group.create(element.x, element.y, element.properties.sprite);
 Object.keys(element.properties).forEach(function(key){
     sprite[key] = element.properties[key];
 });

},
createCollectables: function() {
   this.collectables = this.add.group();
   this.collectables.enableBody = true;
   var cold_objects = this.locateObjects('cold', this.map, 'objectsLayer');
   var hot_objects = this.locateObjects('hot', this.map, 'objectsLayer');

   cold_objects.forEach(function(element){
     this.createNiceSprites(element, this.collectables)
   }, this);
   hot_objects.forEach(function(element){
     this.createNiceSprites(element, this.collectables)
   }, this);

   this.collectables.forEach(function(element){
     element.anchor.setTo(0.5, 0.5);
     element.x += 32;
     element.y += 32;
   }, this);

 },
  render: function(){
    //this.game.debug.cameraInfo(this.game.camera, 32, 32);
    //this.game.debug.text("temperature: " + this.T, 400, 20);
    //this.game.debug.text("altitude: " + this.altitude, 400, 30);
    //this.game.debug.text("quantum: " + this.quantum, 400, 40);
    //this.game.debug.text("x: " + this.game.camera.x + " y: " + this.game.camera.y, 400, 50);
    //this.game.debug.text("score: " + this.game.score, 400, 60);
  }
}
