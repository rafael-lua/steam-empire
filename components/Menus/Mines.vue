<template>
  <div class="mines bg-light border-dark">
    <img src="~/assets/icons/cave-entrance.png" alt="Coal Button" class="icon-basic clickable" v-on:click="collectCoal">
    <p class="info">Coal: {{player.getCoal()}}</p>
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
    },
  }
}
</script>

<style scoped>

.mines {
  height: 100%;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info {
  font-weight: 700;
  font-size: 1em;
}

</style>