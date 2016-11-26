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
    this.load.tilemap('testlevel', 'assets/tilemaps/tilemap2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/images/tilemap.png');
    this.load.image('background', 'assets/images/alligator_BG.png');
    this.load.image('gator', 'assets/images/gator.png');
    this.load.image('cold', 'assets/images/cold.png');
    this.load.image('hot', 'assets/images/hot.png');
    this.load.image('lane', 'assets/images/placeholderLaneTile.png');
    this.load.image('wall', 'assets/images/wall.png');
    this.load.image('star', 'assets/images/star.png');
    this.load.image('gatorUpperHead', 'assets/images/gator/head_quantum.png');
    this.load.image('gatorLowerHead', 'assets/images/gator/jaw_quantum.png');
    this.load.image('gatorBody', 'assets/images/gator/body_quantum.png');
    this.load.image('gatorFrontLeg', 'assets/images/gator/frontleg_quantum.png');
    this.load.image('gatorBackLeg', 'assets/images/gator/backleg_quantum.png');
    this.load.image('gatorTail', 'assets/images/gator/tailpice_quantum.png');
    this.load.image('gatorTailTip', 'assets/images/gator/tailtip_quantum.png');
    this.load.image('snowflake', 'assets/images/snowflake.png');
    this.load.image('wallBlackhole', 'assets/images/wall_blackhole.png');
  },
  create: function() {
    this.state.start('Game');
  }
}
