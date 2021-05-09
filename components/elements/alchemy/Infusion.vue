<template>
 <div class="infusion pd-05 flex-row flex-a-center flex-j-between">

    <div class="fixed-box flex-col flex-a-center flex-j-center">
      <img src="~/assets/icons/atom.png" alt="Coin Icon" class="icon-basic">
      <p class="text-700">INFUSION</p>
      <hr class="hr-mg">
      <img src="~/assets/icons/coal-wagon.png" alt="Coin Icon" class="icon-basic-small">
      <p class="text-s2 text-500">COAL</p>
      <hr class="hr-light hr-mg hr-half">
      <p class="text-700">{{infusionReport}} /s</p>
    </div>

    <div class="flex-col flex-a-center">
      <p class="text-500 text-s1">CURRENT CLASS</p>
      <p class="text-700">{{player.alchemy.infusion.class}}</p>
      <hr class="hr-light hr-mg">
      <p class="text-500 text-s1">MULTIPLIER</p>
      <p class="text-700">{{player.alchemy.chrysopoeia.multiplier}}</p>
    </div>

    <div class="border-light flex-row flex-a-center flex-j-center pd-1">
      <div class="button-aqua clickable flex-col flex-a-center mg-right-1" v-on:click="upgradeInfusion()">
        <p class="text-500">UPGRADE</p>
      </div>

      <div class="flex-col flex-a-center">
        <p class="text-700 text-s2">REQUIREMENTS</p>
        <hr class="hr-half hr-light">
        <p
          v-for="required in requiredMaterials()"
          v-bind:key="required.name"
          v-bind:class="required.has === true ? hasStyle : hasntStyle"
        >
          <span>{{required.name}}</span>
          <span class="text-italic">{{formatNumber(required.amount)}}</span>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"
import { infusionData } from "~/scripts/gameData"

export default {
  name: "Infusion",

  data () {
    return {
      player: Player,
      hasStyle: {
        "text-500": true,
        "text-s1": true
      },
      hasntStyle: {
        "text-500": true,
        "text-s1": true,
        "low-opacity": true
      }
    }
  },

  methods: {
    upgradeInfusion: function () {
      switch (this.player.alchemy.infusion.class) {
        case "weak": {
          const upgradeData = infusionData["weak"].canUpgrade(this.player)
          if (upgradeData) {
            this.player.decreaseAny(upgradeData)
            this.player.upgradeAlchemy("infusion")
          }
          break
        }

        case "median": {

          break
        }

        default:
          break
      }
    },

    requiredMaterials: function () {
      switch (this.player.alchemy.infusion.class) {
        case "weak": {
          return infusionData["weak"].getRequiredList(this.player)
        }

        case "median": {
          const required = [
            { name: "Material A", amount: 5, has: false },
            { name: "Material B", amount: null, has: true },
            { name: "Material C", amount: null, has: false },
            { name: "Material D", amount: 999999999, has: false },
          ]
          return required
        }

        default:
          break
      }
    },

    formatNumber: function (n) {
      return n === null ? null : utils.format(n)
    }
  },

  computed: {
    infusionReport: function () {
      return utils.format(this.player.reports.infusion.reported)
    },
  }
}
</script>

<style scoped>

.infusion {
  width: 100%;
}

.fixed-box {
  width: 150px;
}

.low-opacity {
  opacity: 0.5;
}

</style>