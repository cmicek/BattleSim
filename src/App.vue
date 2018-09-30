<template>
  <div id="app">
    
    <h1>Test</h1>

    turn: {{game.turn}}

    <button @click=game.nextTurn() v-if="game.turn < game.lastTurn">Next turn</button>

    <div v-if="game.turn >= game.lastTurn"><strong >Game over</strong></div>

  </div>
</template>

<script>
import Game from "./game";

var game = new Game();

export default {
  name: "App",
  data: function() {
    return {
      game: game
    };
  },
  created: function() {
    this.game.nextTurn();
  },
  components: {}
};
</script>
