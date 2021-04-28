<template>
  <div class="side-left bg-light border-dark">
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/mustache.png" alt="Population Icon" class="icon-basic-small only-right">
      Population: <span class="info-value text-500">{{player.population}}</span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/farmer.png" alt="Farmer Icon" class="icon-basic-small only-right">
      Employed: <span class="info-value text-500">{{player.employed}}</span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/brain.png" alt="Proficiency Icon" class="icon-basic-small only-right">
      Proficiency: <span class="info-value text-500">{{player.proficiency}}</span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/two-coins.png" alt="Gold Icon" class="icon-basic-small only-right">
      Gold: <span class="info-value text-500">{{player.gold}}</span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/coal-wagon.png" alt="Coal Icon" class="icon-basic-small only-right">
      Coal: <span class="info-value text-500">{{player.coal}} <span class="text-italic">({{coalPercentage()}})</span></span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/cargo-crate.png" alt="Capacity Icon" class="icon-basic-small only-right">
      Capacity: <span class="info-value text-500">{{player.capacity}}</span>
    </p>
    <hr>
  </div>
</template>

<script>
import Player from "~/scripts/playerData";

export default {
  name: "SideLeft",

  data() {
    return {
      player: Player,
    }
  },

  methods: {
    coalPercentage: function () {
      return ((this.player.coal / this.player.capacity)*100).toFixed(2) + "%";
    },
  },

  computed: {

  }

}
</script>

<style scoped>

.side-left {
  margin: 0 0 0.5em 0.5em;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
}


</style>