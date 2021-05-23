<template>
  <div class="population bg-light border-dark">
    <div class="citizens">
      <p class="text-center text-700 text-b3 flex-row flex-a-center flex-j-center">
        {{player.population}}
        <img src="~/assets/icons/mustache.png" alt="Population Icon" class="icon-basic-mini only-left">
      </p>
      <p class="text-center text-500 text-b2">CITIZENS</p>
    </div>

    <div v-if="player.inventory.map_1 === false">
      <p class="text-center text-500 initial-text">
        The alchemist observes a flat land ahead.<br>
        It seems empty and large.<br>
        He sees small mountains behind.<br>
        There is an unexplored coal mine nearby.<br>
      </p>
    </div>

    <div v-if="player.crafting.tavern.completed === true">
      <p class="text-center text-500 initial-text">
        The tavern attracts travelers passing by.<br>
        They find it comfortable and some of them decide to live here.
      </p>
      <div class="flex-row flex-a-center flex-j-center">
        <div class="flex-row flex-a-center flex-j-center pd-1x">
          <div class="flex-col flex-a-center flex-j-center pd-1x">
            <img src="~/assets/icons/team-upgrade.png" alt="Growth Icon" class="icon-basic">
            <p class="text-s2 text-700 transparent">GROWTH</p>
          </div>
          <p class="text-500"><span class="text-green">+{{(player.growth * 100).toFixed(2)}}</span>/DAY</p>
        </div>
        <div class="hr-4em"></div>
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <img src="~/assets/icons/love-mystery.png" alt="Happiness Icon" class="icon-basic">
          <p class="text-s2 text-700 transparent">HAPPINESS</p>
          <p class="text-s2 text-700">{{(player.happiness * 100).toFixed(2)}}%</p>
        </div>
        <div class="hr-4em"></div>
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <img src="~/assets/icons/brain.png" alt="Proficiency Icon" class="icon-basic">
          <p class="text-s2 text-700 transparent">PROFICIENCY</p>
          <p class="text-s2 text-700">{{player.proficiency}}</p>
        </div>
        <div class="hr-4em"></div>
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <img src="~/assets/icons/coins.png" alt="Payment Icon" class="icon-basic">
          <p class="text-700 text-s2 transparent">BASE PRICE</p>
          <CoinFormat>{{formatedValue(player.price)}}<span class="mg-left-05">per tick</span></CoinFormat>
        </div>
      </div>
    </div>

    <div v-if="player.inventory.map_1 === true && player.stages.savages === true">
      <p v-if="player.crafting.tavern.completed === false" class="text-center text-500 initial-text mg-top-2">
        The alchemist learns about the savages in the surroundings.<br>
        They accept doing work for gold.
      </p>
      <p v-else class="text-center text-500 initial-text mg-top-2">
        The savages notice the new residents on the tavern. Savages don't like citizens.<br>
        They start to <em class="text-red">move away</em> as new citizens move in.
      </p>
      <hr class="hr-light">
      <Savages />
    </div>

  </div>
</template>

<script>
import Player from "~/scripts/playerData"
import utils from "~/scripts/utils"

import Savages from "../elements/population/Savages"
import CoinFormat from "../elements/CoinFormat"

export default {
  name: "Population",

  components: {
    Savages,
    CoinFormat
  },

  methods: {
    formatedValue: function (v){
      return utils.format(v)
    }
  },

  data () {
    return {
      player: Player,
    }
  }
}
</script>

<style scoped>

.population {
  height: 100%;
  padding: 0.5em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.citizens p {
  line-height: 1.3;
}

.initial-text {
  padding: 1em;
}

.transparent {
  opacity: 0.75
}

</style>