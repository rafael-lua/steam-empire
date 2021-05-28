<template>
  <div class="infusion-manual flex-col flex-j-center flex-a-center">
    <p class="text-700 text-b2">INFUSION</p>
    <hr class="hr-25 hr-mg">
    <div class="wrapper flex-row flex-a-center flex-j-evenly pd-1">
      <Button title="Infuse" v-bind:handler="handleClick" />
      <div class="flex-col flex-a-center flex-j-center">
        <p class="text-500 text-s1">PROGRESS</p>
        <p class="text-700 text-b1">0/100%</p>
      </div>
      <div class="flex-col flex-a-center flex-j-center">
        <p class="text-500 text-s1">COAL AMOUNT</p>
        <p class="text-700 text-b1"><CoalFormat>+5</CoalFormat></p>
      </div>
    </div>
  </div>
</template>

<script>
import Player from "~/scripts/playerData"
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
      player: Player
    }
  },

  methods: {
    handleClick: function () {

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

</style>