<template>
  <div class="side-left bg-light border-dark noselect">
    <p class="text-b1 text-700 text-italic text-center">
      CITY STATUS
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/mustache.png" alt="Population Icon" class="icon-basic-small only-right">
      Population: <span class="info-value text-500">{{formatedValue(player.population)}}<span v-if="player.stages.savages === true" class="text-s1"> + {{player.savages.total}}</span></span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/farmer.png" alt="Farmer Icon" class="icon-basic-small only-right">
      Employed: <span class="info-value text-500">{{formatedValue(player.employed)}}<span v-if="player.stages.savages === true" class="text-s1"> + {{player.savages.employed}}</span></span>
    </p>
    <p class="flex-row flex-a-center text-s2">
      <span class="mg-left-05">\_ Ratio:</span> <span class="info-value text-500">({{employedPercentage()}})</span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/brain.png" alt="Proficiency Icon" class="icon-basic-small only-right">
      Proficiency: <span class="info-value text-500">{{formatedValue(player.proficiency)}}</span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/teleport.png" alt="Competency Icon" class="icon-basic-small only-right">
      Competency: <span class="info-value text-500">{{formatedValue(player.competency)}}</span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/two-coins.png" alt="Gold Icon" class="icon-basic-small only-right">
      Gold: <span class="info-value text-500">{{formatedValue(player.gold)}}</span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/coal-wagon.png" alt="Coal Icon" class="icon-basic-small only-right">
      Coal: <span class="info-value text-500">{{formatedValue(player.coal)}}</span>
    </p>
    <p class="flex-row flex-a-center text-s2">
      <span class="mg-left-05">\_ Ratio:</span> <span class="info-value text-500">({{coalPercentage()}})</span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/cargo-crate.png" alt="Capacity Icon" class="icon-basic-small only-right">
      Capacity: <span class="info-value text-500">{{formatedValue(player.capacity)}}</span>
    </p>
    <hr>
    <p class="text-b1 text-700 text-italic text-center">
      REPORTINGS
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/two-coins.png" alt="Gold Icon" class="icon-basic-small only-right">
      Gold gains: <span class="info-value text-500 text-green">{{formatedValue(player.reports.goldGains.reported)}} /s</span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/two-coins.png" alt="Gold Icon" class="icon-basic-small only-right">
      Gold losses: <span class="info-value text-500 text-red">{{formatedValue(player.reports.goldLosses.reported)}} /s</span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/coal-wagon.png" alt="Coal Icon" class="icon-basic-small only-right">
      Coal gains: <span class="info-value text-500 text-green">{{formatedValue(player.reports.coalGains.reported)}} /s</span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/coal-wagon.png" alt="Coal Icon" class="icon-basic-small only-right">
      Coal losses: <span class="info-value text-500 text-red">{{formatedValue(player.reports.coalLosses.reported)}} /s</span>
    </p>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"

export default {
  name: "SideLeft",

  data () {
    return {
      player: Player
    }
  },

  methods: {
    coalPercentage: function () {
      return ((this.player.coal / this.player.capacity)*100).toFixed(2) + "%"
    },

    employedPercentage: function () {
      if (this.player.stages.savages === true){
        return (((this.player.employed + this.player.savages.employed) / (this.player.population + this.player.savages.total))*100).toFixed(2) + "%"
      } else {
        return ((this.player.employed / this.player.population)*100).toFixed(2) + "%"
      }
    },

    formatedValue: function (v) {
      return utils.format(v)
    }
  },
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