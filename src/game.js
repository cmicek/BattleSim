var Game = function() {
  this.turn = 0;
  this.lastTurn = 10;
};

Game.prototype.nextTurn = function() {
  this.turn++;
};

module.exports = Game;
