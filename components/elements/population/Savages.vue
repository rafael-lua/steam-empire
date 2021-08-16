<template>
  <div class="savages flex-row flex-a-center flex-j-center">
    <div class="flex-col flex-a-center flex-j-center pd-1x">
      <img
        src="~/assets/icons/barbarian.png"
        alt="Savage Icon"
        class="icon-basic"
      />
      <p class="text-500 text-s1">TOTAL SAVAGES</p>
      <p class="text-700">50</p>
    </div>
    <div class="hr-4em"></div>
    <div class="flex-col flex-a-center flex-j-center pd-1x">
      <img
        src="~/assets/icons/farmer.png"
        alt="Employed Icon"
        class="icon-basic"
      />
      <p class="text-500 text-s1">CONTRACTED</p>
      <p class="text-700">{{ contracted }}</p>
    </div>
    <div class="hr-4em"></div>
    <div class="flex-col flex-a-center flex-j-center pd-1x">
      <img
        src="~/assets/icons/receive-money.png"
        alt="Payment Icon"
        class="icon-basic"
      />
      <p class="text-500 text-s1 text-center">TOTAL COSTS</p>
      <CoinFormat>{{ calculatedPrice }} /s</CoinFormat>
    </div>
    <div class="hr-4em"></div>
    <div class="flex-col flex-a-center flex-j-center pd-1x">
      <img
        src="~/assets/icons/coins.png"
        alt="Payment Icon"
        class="icon-basic"
      />
      <p class="text-500 text-s1 text-center">BASE PRICE</p>
      <CoinFormat
        >{{ price }}<span class="mg-left-05">per tick</span></CoinFormat
      >
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

  data() {
    return {
      player: Player
    }
  },

  computed: {
    price: function() {
      return this.formatedValue(this.player.modules.population.price)
    },

    calculatedPrice: function() {
      return utils.format(
        this.player.modules.population.price *
          10 *
          this.player.modules.population.savages.employed
      )
    },

    contracted: function() {
      return this.player.modules.population.savages.employed
    }
  },

  methods: {
    formatedValue: function(v) {
      return utils.format(v)
    }
  }
}
</script>

<style scoped>
.savages {
  padding: 0.5em;
}
</style>
