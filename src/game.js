const Game = function () {
  this.turn = 0;
  this.lastTurn = 10;
};

Game.prototype.nextTurn = function () {
  this.turn = this.turn + 1;
};


module.exports = Game;
