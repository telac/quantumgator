var Quantumgator = Quantumgator || {};

Quantumgator.Preload = function(){};

Quantumgator.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.loadingImage = this.add.sprite(0, 0, 'loadingImage');
    this.load.setPreloadSprite(this.loadingImage);

    //load game assets
    this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/images/Pigsheets/PigSheet_Normal.png');
    this.load.image('tilesQ', 'assets/images/Pigsheets/PigSheet_Quantum.png');
    this.load.image('background', 'assets/images/alligator_BG.png');
    this.load.image('star', 'assets/images/star.png');
    this.load.image('Playerobject', 'assets/images/Playerobject.png');
    this.load.image('gatorUpperHead', 'assets/images/gator/head_quantum.png');
    this.load.image('gatorLowerHead', 'assets/images/gator/jaw_quantum.png');
    this.load.image('gatorBody', 'assets/images/gator/body_quantum.png');
    this.load.image('gatorFrontLeg', 'assets/images/gator/frontleg_quantum.png');
    this.load.image('gatorBackLeg', 'assets/images/gator/backleg_quantum.png');
    this.load.image('gatorTail', 'assets/images/gator/tailpice_quantum.png');
    this.load.image('gatorTailTip', 'assets/images/gator/tailtip_quantum.png');
    this.load.image('wallBlackhole', 'assets/images/wall_blackhole.png');
    this.load.image('qGatorUpperHead', 'assets/images/Quantumcrocodile_Colour/Quantumhead_Top.png');
    this.load.image('qGatorLowerHead', 'assets/images/Quantumcrocodile_Colour/Quantumhead_Bottom.png');
    this.load.image('qGatorBody', 'assets/images/Quantumcrocodile_Colour/Quantumbody.png');
    this.load.image('qGatorFrontLeg', 'assets/images/Quantumcrocodile_Colour/Quantumforearm.png');
    this.load.image('qGatorBackLeg', 'assets/images/Quantumcrocodile_Colour/Quantumbackleg.png');
    this.load.image('chili', 'assets/images/Legacy Sprites/chili.png');
    this.load.image('icecream', 'assets/images/Legacy Sprites/icecream.png');
    this.load.image('ice', 'assets/images/Legacy Sprites/icecube.png');
    this.load.image('bonfire', 'assets/images/Legacy Sprites/nuotio.png');
    this.load.image('dwarf', 'assets/images/Legacy Sprites/reddwarf.png');
    this.load.image('snowman', 'assets/images/Legacy Sprites/snowman.png');
    this.load.image('chiliQ', 'assets/images/Legacy Sprites/chiliQ.png');
    this.load.image('icecreamQ', 'assets/images/Legacy Sprites/icecreamQ.png');
    this.load.image('iceQ', 'assets/images/Legacy Sprites/icecubeQ.png');
    this.load.image('bonfireQ', 'assets/images/Legacy Sprites/nuotioQ.png');
    this.load.image('dwarfQ', 'assets/images/Legacy Sprites/reddwarfQ.png');
    this.load.image('snowmanQ', 'assets/images/Legacy Sprites/snowmanQ.png');
    this.load.image('menu', 'assets/images/StartScreen/QuantumGator_StartScreen.png');
    this.load.image('menutext', 'assets/images/StartScreen/StartText.png');
    this.load.image('skull', 'assets/images/GameOver_Screen/gatorhead.png');
		this.load.image('jaw', 'assets/images/GameOver_Screen/gatorjaw.png');
		this.load.image('gameoverText', 'assets/images/GameOver_Screen/GatorOverText.png');
		this.load.image('restartText', 'assets/images/GameOver_Screen/RestartText.png');
    this.load.image('startScreen', 'assets/images/StartScreen/QuantumGator_StartScreen.png');
		this.load.image('startText', 'assets/images/StartScreen/StartText.png');
    this.load.spritesheet('qGatorTail', 'assets/images/QuantumPropulsionEffect/QuantumCrocofire.png', 64, 64, 4);
    this.load.audio('backgroundmusic', 'assets/audio/QGJ2016_quantumgator_bg-default.mp3');
    this.load.audio('quantummusic', 'assets/audio/QGJ2016_quantumgator_bg-quantum.mp3');
    this.load.audio('good(s)hit', 'assets/audio/QGJ2016_Quantumgator_SFX_pickup-good.mp3');
  },
  create: function() {
    this.state.start('menu');
  }
}
