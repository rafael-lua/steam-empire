<template>
  <div class="savages flex-row flex-a-center flex-j-center">
    <div class="flex-col flex-a-center flex-j-center pd-1x">
      <img src="~/assets/icons/barbarian.png" alt="Savage Icon" class="icon-basic">
      <p class="text-500 text-s1">TOTAL SAVAGES</p>
      <p class="text-700">50</p>
    </div>
    <div class="hr-4em"></div>
    <div class="flex-col flex-a-center flex-j-center pd-1x">
      <img src="~/assets/icons/farmer.png" alt="Employed Icon" class="icon-basic">
      <p class="text-500 text-s1">CONTRACTED</p>
      <p class="text-700">0</p>
    </div>
    <div class="hr-4em"></div>
    <div class="flex-col flex-a-center flex-j-center pd-1x">
      <img src="~/assets/icons/receive-money.png" alt="Payment Icon" class="icon-basic">
      <p class="text-500 text-s1 text-center">TOTAL COSTS</p>
      <CoinFormat v-bind:value="calculatedPrice">/s</CoinFormat>
    </div>
    <div class="hr-4em"></div>
    <div class="flex-col flex-a-center flex-j-center pd-1x">
      <img src="~/assets/icons/coins.png" alt="Payment Icon" class="icon-basic">
      <p class="text-500 text-s1 text-center">BASE PRICE</p>
      <CoinFormat v-bind:value="player.price"><span class="mg-left-05">per tick</span></CoinFormat>
    </div>
  </div>
</template>

<script>
import Player from "~/scripts/playerData"
import utils from "~/scripts/utils"

import CoinFormat from "../CoinFormat"

export default {
  name: "Savages",

  components: {
    CoinFormat
  },

  data () {
    return {
      player: Player,
      price: 0.01
    }
  },

  computed: {
    unemployedSavages: function () {
      let unemployed = this.player.getUnemployed()
      if (unemployed === 0) {
        return 0
      } else {
        return utils.format(unemployed >= this.player.amount ? this.player.amount : unemployed)
      }
    },

    calculatedPrice: function () {
      return (this.player.price * 10) * this.player.savages.employed
    }
  }
}
</script>

<style scoped>

.savages {
  padding: 0.5em;
}

</style>