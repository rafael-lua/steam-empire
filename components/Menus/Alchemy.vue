<template>
  <div class="alchemy bg-light border-dark flex-col flex-a-center flex-j-evenly">
    <div class="infusion pd-05 flex-row flex-a-center flex-j-evenly">
      <div class="flex-col flex-a-center">
        <img src="~/assets/icons/atom.png" alt="Coin Icon" class="icon-basic">
        <p class="text-700">INFUSION</p>
        <hr class="hr-mg">
        <img src="~/assets/icons/coal-wagon.png" alt="Coin Icon" class="icon-basic-small">
        <p class="text-s2 text-500">COAL</p>
        <hr class="hr-light hr-mg hr-half">
        <p class="text-700">1.123e306 /s</p>
      </div>
    </div>
    <hr>
    <div class="chrysopoeia pd-05 flex-row flex-a-center flex-j-evenly">
      <div class="flex-col flex-a-center">
        <img src="~/assets/icons/triple-beak.png" alt="Coin Icon" class="icon-basic">
        <p class="text-700">CHRYSOPOEIA</p>
        <hr class="hr-mg">
        <img src="~/assets/icons/two-coins.png" alt="Coin Icon" class="icon-basic-small">
        <p class="text-s2 text-500">GOLD</p>
        <hr class="hr-light hr-mg hr-half">
        <p class="text-700">1.123e306 /s</p>
      </div>
    </div>
  </div>
</template>

<script>
// import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"

export default {
  name: "Alchemy",

  data () {
    return {
      player: Player,
    }
  }
}
</script>

<style scoped>

.alchemy {
  height: 100%;
  padding: 0.5em;
}

.infusion {
  width: 100%;
}

.chrysopoeia {
  width: 100%;
}

</style>