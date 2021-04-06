<template>
  <div class="mines bg-light border-dark">
    <div class="flex-row flex-a-center">
      <img src="~/assets/icons/cave-entrance.png" alt="Coal Button" class="icon-basic clickable" v-on:click="collectCoal">
      <p class="info">COAL MINE (COMMON)</p>
    </div>
  </div>
</template>

<script>
import Player from "../../scripts/playerData";

export default {
  name: "Mines",
  data() {
    return {
      player: Player,
    }
  },
  methods: {
    collectCoal: function() {
      this.player.increaseCoal(1);
      if(this.player.coal >= 10 && this.player.stage < 1){ this.player.setStage(1); }
    },
  }
}
</script>

<style scoped>

.mines {
  height: 100%;
  padding: 0.5em;
}

.info {
  font-weight: 700;
  font-size: 1em;
  margin: 0 .5em;
}

</style>