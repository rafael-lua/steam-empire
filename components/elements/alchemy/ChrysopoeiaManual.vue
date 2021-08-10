<template>
  <div class="chrysopoeia-manual flex-col flex-j-center flex-a-center">
    <p class="text-700 text-b2 text-center">CHRYSOPOEIA</p>
    <hr class="hr-25 hr-mg" />
    <div class="wrapper flex-row flex-a-center flex-j-evenly pd-1">
      <div class="fixed-width">
        <Button
          v-bind:title="!manualState ? 'Process' : 'Processing'"
          v-on:handler="handleClick"
          v-bind:disabledStatus="manualState"
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
      player: Player
    }
  },

  computed: {
    chrysopoeia: function() {
      return this.player.modules.alchemy.getAlchemyData("chrysopoeia")
    },

    progress: function() {
      return utils.format(
        this.player.modules.alchemy.getManualTick("chrysopoeia") * 100
      )
    },

    manualState: function() {
      return this.player.modules.alchemy.getManualState("chrysopoeia")
    },

    canProcessClass: function() {
      const classes = {}
      const c = `text-${
        this.player.modules.resources.get("coal") >= this.chrysopoeia.costValue
          ? "green"
          : "red"
      }`
      classes[c] = true
      return classes
    }
  },

  methods: {
    handleClick: function() {
      if (
        this.player.modules.resources.get("coal") >= this.chrysopoeia.costValue
      ) {
        this.player.modules.coal.decreaseCoal(this.chrysopoeia.costValue)
        this.player.setManualState("chrysopoeia", true)
      }
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
