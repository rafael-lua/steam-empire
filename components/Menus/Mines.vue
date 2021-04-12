<template>
  <div class="mines bg-light border-dark">
    <div class="flex-row flex-a-center">
      <img src="~/assets/icons/cave-entrance.png" alt="Coal Button" class="icon-basic clickable" v-on:click="collectCoal">
      <p class="info text-500">COAL MINE lv <span class="text-500">(YIELDS COMMON COAL)</span> hardness 1</p>
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
      this.player.increaseCoal(this.player.competency);
      if(this.player.coal >= 10 && this.player.stages.market === false){ this.player.setStage("market"); }
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
  font-size: 1em;
  margin: 0 .5em;
}

</style>