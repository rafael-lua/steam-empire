<template>
  <div class="mines bg-light border-dark">

    <div class="flex-row flex-a-center flex-j-center">
      <div class="flex-col flex-a-center flex-j-center pd-1x">
        <img src="~/assets/icons/cave-entrance.png" alt="Coal Button" class="icon-basic clickable" v-on:click="collectCoal">
        <p class="text-500">COAL MINE</p>
        <p class="text-italic line-s">(common)</p>
      </div>
      <div class="flex-col flex-a-center flex-j-center hr-left pd-1x">
        <p class="text-400">HARDNESS</p>
        <p class="text-700 text-b2">1</p>
      </div>
      <div class="flex-col flex-a-center flex-j-center hr-left pd-1x">
        <p class="text-400">YIELD VALUE</p>
        <p class="text-700 text-b2">{{(player.competency * 10) / 1}} /day</p>
      </div>
    </div>
    <hr class="hr-mg">

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

</style>