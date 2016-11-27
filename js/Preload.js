var Quantumgator = Quantumgator || {};

Quantumgator.Preload = function(){};

Quantumgator.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.loadingImage = this.add.sprite(0, 0, 'loadingImage');
    this.load.setPreloadSprite(this.loadingImage);

    //load game assets
    this.load.tilemap('testlevel', 'assets/tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/images/Pigsheets/PigSheet_Normal.png');
    this.load.image('tilesQ', 'assets/images/Pigsheets/PigSheet_Quantum.png');
    this.load.image('background', 'assets/images/alligator_BG.png');
    this.load.image('gator', 'assets/images/gator.png');
    this.load.image('cold', 'assets/images/cold.png');
    this.load.image('hot', 'assets/images/hot.png');
    this.load.image('lane', 'assets/images/placeholderLaneTile.png');
    this.load.image('wall', 'assets/images/wall.png');
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
    this.load.image('chili', 'assets/images/Quantum_chili.png');
    this.load.image('icecream', 'assets/images/Quantum_icecream.png');
    this.load.image('ice', 'assets/images/Quantum_icecube.png');
    this.load.image('bonfire', 'assets/images/Quantum_nuotio.png');
    this.load.image('dwarf', 'assets/images/Quantum_reddwarf.png');
    this.load.image('snowman', 'assets/images/Quantum_snowman.png');
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
    this.load.audio('healthHot', 'assets/images/healthHot.png');
    this.load.audio('healthCold', 'assets/images/healthCold.png');
    this.load.audio('healthWrap', 'assets/images/healthWrap.png');
  },
  create: function() {
    this.state.start('menu');
  }
}
