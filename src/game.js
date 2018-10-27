import _ from 'lodash';
import Unit from './unit';
import Player from './player';

const Game = function(params = {}) {
  this.turn = 0;
  this.lastTurn = 100;
  this.lastUnitId = 1;

  this.players = [
    new Player({ id: 1, userControlled: true }),
    new Player({ id: 2 })
  ];

  this.units = [];

  // Populate units

  this.players.forEach(player => {
    this.units.push(
      new Unit({
        player: player.id,
        id: this.lastUnitId++
      })
    );
    this.units.push(
      new Unit({
        player: player.id,
        id: this.lastUnitId++
      })
    );
  });
};

Game.prototype.attack = function() {
  this.units.forEach(unit => unit.beforeNextTurn());

  this.units = _(this.units)
    .sortBy('initiative')
    .reverse()
    .value();

  this.units.forEach(unit => unit.onNextTurn(this.units));
};

Game.prototype.nextTurn = function() {
  console.log('=============');
  this.turn++;
};

Game.prototype.generateBuyableUnits = function() {
  var unit1 = new Unit({
    id: this.lastUnitId++
  });

  var unit2 = new Unit({
    id: this.lastUnitId++
  });

  return [unit1, unit2];
};

module.exports = Game;
