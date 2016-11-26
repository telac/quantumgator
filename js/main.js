var Quantumgator = Quantumgator || {};

Quantumgator.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

Quantumgator.game.state.add('Boot', Quantumgator.Boot);
Quantumgator.game.state.add('Preload', Quantumgator.Preload);
Quantumgator.game.state.add('Game', Quantumgator.Game);

Quantumgator.game.state.start('Boot');
