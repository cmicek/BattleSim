<template>
  <div>
    <h3>Buy Units</h3>
    <p>Component</p>
    <table>
      <tr v-for="unit in units">
        <td>{{unit.class}}</td>
        <td>{{unit.price}}</td>
        <td><button>Buy</button></td>
      </tr>
    </table>
    
  </div>
</template>

<script>
export default {
  name: "BuyUnits",
  data() {
    return {
      availableUnits: []
    };
  },
  props: [ 'units' ],
  methods: {
    generateAvailableUnits: function () {
     
    }
  }
};
</script>

<style>

</style>
