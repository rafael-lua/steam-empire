<template>
  <div class="chrysopoeia-manual flex-col flex-j-center flex-a-center">
    <p class="text-700 text-b2 text-center">CHRYSOPOEIA</p>
    <hr class="hr-25 hr-mg" />
    <div class="wrapper flex-row flex-a-center flex-j-evenly pd-1">
      <div class="fixed-width">
        <Button
          v-bind:title="
            !player.alchemy.chrysopoeia.manualState ? 'Process' : 'Processing'
          "
          v-on:handler="handleClick"
          v-bind:disabledStatus="player.alchemy.chrysopoeia.manualState"
        />
      </div>
      <div class="fixed-width flex-col flex-a-center flex-j-center">
        <p class="text-500 text-s1">COST</p>
        <p class="text-700 text-b1" v-bind:class="canProcessClass">
          <CoalFormat>{{ chrysopoeia.costValue }}</CoalFormat>
        </p>
      </div>
      <div class="fixed-width flex-col flex-a-center flex-j-center">
        <p class="text-500 text-s1">PROGRESS</p>
        <p class="text-700 text-b1">{{ progress }}/100%</p>
      </div>
      <div class="fixed-width flex-col flex-a-center flex-j-center">
        <p class="text-500 text-s1">GOLD AMOUNT</p>
        <p class="text-700 text-b1">
          <CoinFormat>+{{ chrysopoeia.rawValue }}</CoinFormat>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"
import { chrysopoeiaData } from "~/scripts/gameData"
import Button from "../Button"
import CoinFormat from "../CoinFormat"
import CoalFormat from "../CoalFormat"

export default {
  name: "ChrysopoeiaManual",

  components: {
    Button,
    CoinFormat,
    CoalFormat
  },

  data() {
    return {
      player: Player,
      chrysopoeia: chrysopoeiaData
    }
  },

  methods: {
    handleClick: function() {
      if (this.player.coal >= this.chrysopoeia.costValue) {
        this.player.decreaseCoal(this.chrysopoeia.costValue)
        this.player.setManualState("chrysopoeia", true)
      }
    }
  },

  computed: {
    progress: function() {
      return utils.format(this.player.alchemy.chrysopoeia.manualTick * 100)
    },

    canProcessClass: function() {
      const classes = {}
      const c =
        "text-" +
        (this.player.coal >= this.chrysopoeia.costValue ? "green" : "red")
      classes[c] = true
      return classes
    }
  }
}
</script>

<style scoped>
.chrysopoeia-manual {
  width: 100%;
}

.wrapper {
  width: 100%;
}

.fixed-width {
  width: 20%;
}
</style>
