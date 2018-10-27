const Player = function(params = {}) {
  this.id = params.id;
  this.gold = params.gold || chance.integer({ min: 0, max: 100 });
  this.userControlled = params.userControlled || false;
};

module.exports = Player;
