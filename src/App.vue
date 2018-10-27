<template>
  <div id="app">
    
    <header class="game-header">
      turn: {{game.turn}} ~ {{userControlledPlayer.gold}} Gold
      <div v-if="gameIsOver"><strong >Game over</strong></div>
    </header>

     <section class="board">
       <div class="player" v-for="player in unitsByPlayer">
         <ul class="units">
           <li class="unit" v-for="unit in player" v-if="unit.currentHP > 0">
             <strong>{{unit.name}}</strong><br/>
             hp: {{unit.currentHP}}/{{unit.maxHP}}<br/>
             xp: {{unit.xp}}<br/>
             initiative: {{unit.initiative}}
           </li>
         </ul>
       </div>
     </section>


    <section class="overlay" v-if="state.buying">
        <buy-units
          class="overlay-content"
          :units="buyableUnits"
          :gold="userControlledPlayer.gold"
          @buyUnit="buyUnit"
          @close="close"></buy-units>
    </section>

     <section class="game-actions">
        <button class="menu-button" @click="buy">Buy</button>
        <button class="menu-button" @click="attack">Attack</button>
        <button class="menu-button" @click="train">Train</button>
    </section>
    
  </div>
</template>

<script>

import Game from './game';
import BuyUnits from './components/BuyUnits';
import _ from 'lodash';


var game = new Game();

export default {
  name: 'App',
  computed: {
    gameIsOver: function() {
      if (_.map(this.unitsByPlayer).length < 2) {
        return true;
      }
      if (game.turn >= game.lastTurn) {
        return true;
      }
    },
    unitsAlive: function() {
      return _.filter(game.units, unit => unit.currentHP > 0);
    },
    unitsByPlayer: function() {
      return _(this.unitsAlive)
        .sortBy('id')
        .groupBy('player')
        .value();
    },
    userControlledPlayer: function() {
      return _.find(game.players, { userControlled: true });
    }
  },

  data: function() {
    return {
      game: game,
      buyableUnits: [],
      state: {
        buying: false,
        training: false,
        attacking: false
      }
    };
  },
  created: function() {
    //     this.game.nextTurn();
  },
  components: {
    'buy-units': BuyUnits
  },
  methods: {
    close: function() {
      this.state.buying = false;
      this.state.attacking = false;
      this.state.training = false;
    },
    buy: function() {
      this.state.buying = true;
      var units = this.game.generateBuyableUnits();
      _.assign(this.buyableUnits, units)
      // this.game.nextTurn();
    },
    buyUnit: function(unit){
      unit.player = this.userControlledPlayer.id;
      this.userControlledPlayer.gold -= unit.price;
      this.buyableUnits = _.without(this.buyableUnits, {id: unit.id})
      game.units.push(unit);
    },
    attack: function() {
      console.log('attack');
      this.game.attack();
      this.game.nextTurn();
    },
    train: function() {
      console.log('train');
      this.game.nextTurn();
    }
  }
};
</script>


<style>
* {
  box-sizing: border-box;
}

html,
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  margin: 0;
  padding: 0;
}

body:before {
  background: #999;
  content: '';
  display: block;
  position: absolute;
  left: 50%;
  width: 1px;
  height: 100%;
}

.game-header {
  background: #fff;
  border-bottom: solid 1px #999;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 1vh 1vw;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 3;
}

.game-actions{
  display: flex;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  z-index: 3;
}

.overlay {
  background: rgba(255, 255, 255, 0.90);
  box-shadow: 0 1px 5px rgba(255, 255, 255, 0.25);
  display: block;
  position: fixed;
  border: solid 1px #999;
  left: 10vh;
  top: 50%;
  right: 10vh;
  transform: translateY(-50%);
  z-index: 2;
}
  .overlay-content{
    padding: 1em;
  }

.menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-item {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-button {
  -webkit-apppearance: none;
  border: outset 3px;
  background: #e6e6e6;
  color: #333;
  cursor: pointer;
  display: block;
  font-family: times;
  margin: 0;
  font-size: 2em;
  padding: 0.5em 0;
  position: relative;
  text-shadow: 0 1px 0 #fff;
  width: 100%;
}

.menu-button:hover {
  background: #d2d2d2;
}

.menu-button:active {
  background: #c9c9c9;
  top: 1px;
}

.board {
  display: flex;
  z-index: 1;
  position: absolute;
  padding-top: 30px;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}

.player {
  flex-basis: 50%;
  padding: 5vh 5vw;
}

.units {
  margin: 0;
  padding: 0;
}

.unit {
  list-style: none;
  padding: 0;
  margin-bottom: 1em;
}
</style>
