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
    this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/images/tiles_spritesheet.png');
    this.load.image('background', 'assets/images/background.png');
    this.load.image('gator', 'assets/images/gator.png');
    this.load.image('cold', 'assets/images/cold.png');
    this.load.image('hot', 'assets/images/hot.png');
    this.load.image('lane', 'assets/images/lane.png');
    this.load.image('wall', 'assets/images/wall.png');
  },
  create: function() {
    this.state.start('Game');
  }
}
