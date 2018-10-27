import _ from 'lodash';
import Chance from 'chance';
const chance = new Chance();

const Unit = function(params = {}) {
  this.id = params.id;
  this.name = params.name || chance.name();
  this.age = params.age || chance.age();
  this.class = params.class || 'archer';
  this.xp = params.xp || 0;
  this.price = params.price || chance.integer({ min: 2, max: 5 });
  this.player = params.player || false;

  var threed6 = () => chance.d6() + chance.d6() + chance.d6();

  this.maxHP = chance.integer({ min: 20, max: 40 }) || params.maxHP;
  this.currentHP = this.maxHP || params.currentHP;

  this.attributes =
    {
      strength: threed6(),
      dexterity: threed6(),
      constitution: threed6(),
      intelligence: threed6(),
      wisdom: threed6(),
      charisma: threed6()
    } || params.attributes;

  this.attack = () => chance.d6() + this.attributes.strength;
  this.getAllies = unit => unit.currentHP > 0 && unit.player == this.player;
  this.getEnemies = unit => unit.currentHP > 0 && unit.player !== this.player;
};

Unit.prototype.beforeNextTurn = function() {
  if (this.currentHP <= 0) {
    return false;
  }

  this.initiative = chance.d6() + this.attributes.dexterity;
};

Unit.prototype.onNextTurn = function(units) {
  if (this.currentHP <= 0) {
    return false;
  }

  var allies = _.filter(units, this.getAllies);
  var enemies = _.filter(units, this.getEnemies);

  var target = _.sample(enemies);
  if (target) {
    target.defend(this.attack);
  }
};

Unit.prototype.defend = function(attack) {
  var defense = chance.d6() + this.attributes.constitution;
  var offense = attack();
  var diff = _.clamp(offense - defense, 0, offense - defense);

  this.currentHP = this.currentHP - diff;
  console.log(
    `${
      this.name
    } was attacked with ${offense}, defended with ${defense}: took ${diff} damage`
  );
};

module.exports = Unit;
