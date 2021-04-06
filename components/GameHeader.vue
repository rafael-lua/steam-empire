<template>
  <header class="header bg-light flex-row flex-a-center flex-j-evenly">
    <p>Gold: <span class="info-value text-500">{{player.gold}}</span></p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/coal-wagon.png" alt="Coal Wagon" class="icon-basic-mini">
      Coal: <span class="info-value text-500">{{player.coal}} <span class="text-italic">({{coalPercentage()}})</span></span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/cargo-crate.png" alt="Coal Wagon" class="icon-basic-mini">
      Capacity: <span class="info-value text-500">{{player.capacity}}</span>
    </p>
    <p>Other... </p>
  </header>
</template>

<script>
import Player from "../scripts/playerData";

export default {

  name: "GameHeader",

  data() {
    return {
      player: Player,
    }
  },

  methods: {
    coalPercentage: function () {
      return ((this.player.coal / this.player.capacity)*100).toFixed(2) + "%";
    }
  }

}
</script>

<style scoped>

.header {
  width: 100%;
  border-bottom: 2px solid rgb(var(--dark-shadow));
  grid-area: header;
  padding: 0.5em 1em;
}

</style>