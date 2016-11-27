var Quantumgator = Quantumgator || {};

Quantumgator.Preload = function(){};

Quantumgator.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(3);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.tilemap('testlevel', 'assets/tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/images/tilemap.png');
    this.load.image('tilesQ', 'assets/images/tilemap_QuantumMode.png');
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
    this.load.image('player', 'assets/images/snowflake.png');
    this.load.image('chili', 'assets/images/Quantum_chili.png');
    this.load.image('icecream', 'assets/images/Quantum_icecream.png');
    this.load.image('ice', 'assets/images/Quantum_icecube.png');
    this.load.image('bonfire', 'assets/images/Quantum_nuotio.png');
    this.load.image('dwarf', 'assets/images/Quantum_reddwarf.png');
    this.load.image('snowman', 'assets/images/Quantum_snowman.png');
    this.load.audio('backgroundmusic', 'assets/audio/QGJ2016_quantumgator_bg-default.mp3');
    this.load.audio('quantummusic', 'assets/audio/QGJ2016_quantumgator_bg-quantum.mp3');
    this.load.audio('healthHot', 'assets/images/healthHot.png');
    this.load.audio('healthCold', 'assets/images/healthCold.png');
    this.load.audio('healthWrap', 'assets/images/healthWrap.png');
  },
  create: function() {
    this.state.start('Game');
  }
}
