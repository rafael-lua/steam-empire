<template>
  <div class="infusion-manual flex-col flex-j-center flex-a-center">
    <p class="text-700 text-b2">INFUSION</p>
    <hr class="hr-25 hr-mg">
    <div class="wrapper flex-row flex-a-center flex-j-evenly pd-1">
      <Button
        v-bind:title="!player.alchemy.infusion.manualState ? 'Infuse' : 'Infusing'"
        v-on:handler="handleClick"
        v-bind:disabledStatus="player.alchemy.infusion.manualState"
      />
      <div class="fixed-width flex-col flex-a-center flex-j-center">
        <p class="text-500 text-s1">PROGRESS</p>
        <p class="text-700 text-b1">{{ progress }}/100%</p>
      </div>
      <div class="flex-col flex-a-center flex-j-center">
        <p class="text-500 text-s1">COAL AMOUNT</p>
        <p class="text-700 text-b1"><CoalFormat>+{{infusion.rawValue}}</CoalFormat></p>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"
import { infusionData } from "~/scripts/gameData"
import Button from "../Button"
import CoalFormat from "../CoalFormat"

export default {
  name: "InfusionManual",

  components: {
    Button,
    CoalFormat
  },

  data () {
    return {
      player: Player,
      infusion: infusionData
    }
  },

  methods: {
    handleClick: function () {
      console.log(true)
      this.player.setManualState("infusion", true)
    }
  },

  computed: {
    progress: function () {
      return utils.format(this.player.alchemy.infusion.manualTick * 100)
    }
  }
}
</script>

<style scoped>

.infusion-manual {
  width: 100%;
}

.wrapper {
  width: 100%;
}

.fixed-width {
  width: 100px;
}

</style>