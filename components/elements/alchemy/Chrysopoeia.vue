<template>
 <div class="chrysopoeia pd-05 flex-row flex-a-center flex-j-between">

      <div class="fixed-box flex-col flex-a-center flex-j-center">
        <img src="~/assets/icons/triple-beak.png" alt="Coin Icon" class="icon-basic">
        <p class="text-700">CHRYSOPOEIA</p>
        <hr class="hr-mg">
        <img src="~/assets/icons/two-coins.png" alt="Coin Icon" class="icon-basic-small">
        <p class="text-s2 text-500">GOLD</p>
        <hr class="hr-light hr-mg hr-half">
        <p class="text-700">{{chrysopoeiaReport}} /s</p>
      </div>

      <div class="flex-col flex-a-center">
        <p class="text-500 text-s1">CURRENT CLASS</p>
        <p class="text-700">{{player.alchemy.chrysopoeia.class}}</p>
        <hr class="hr-light hr-mg">
        <p class="text-500 text-s1">MULTIPLIER</p>
        <p class="text-700">{{player.alchemy.chrysopoeia.multiplier}}</p>
      </div>

      <div class="border-light flex-row flex-a-center flex-j-center pd-1">
        <div class="button-aqua clickable flex-col flex-a-center mg-right-1" v-on:click="upgradeChrysopoeia()">
          <p class="text-500">UPGRADE</p>
        </div>

        <div class="flex-col flex-a-center">
          <p class="text-500 text-s2">REQUIREMENTS</p>
          <hr class="hr-half hr-light">
          <p class="text-700">ABC 123</p>
          <p class="text-700">ABC 123</p>
          <p class="text-700">ABC 123</p>
        </div>
      </div>

    </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"

export default {
  name: "Chrysopoeia",

  data () {
    return {
      player: Player,
    }
  },

  methods: {
    upgradeChrysopoeia: function () {

    },
  },

  computed: {
    chrysopoeiaReport: function () {
      return utils.format(this.player.reports.infusion.reported)
    },
  }
}
</script>

<style scoped>

.chrysopoeia {
  width: 100%;
}

.fixed-box {
  width: 150px;
}

</style>