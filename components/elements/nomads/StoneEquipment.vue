<template>
  <div>
    <NomadItem
      v-bind:item="stoneEquipment"
      v-bind:price="formatedValue(stoneEquipment.value)"
      v-on:handler="trade"
    >
      <p class="text-center text-400 text-break">COMPETENCY<br><span class="text-700">1</span></p>
    </NomadItem>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"

import { nomadData } from "~/scripts/gameData"
import NomadItem from "./NomadItem"

export default {
  name: "StoneEquipment",

  components: {
    NomadItem
  },

  data () {
    return {
      player: Player,
      stoneEquipment: nomadData.stoneEquipment
    }
  },

  methods: {
    formatedValue: function (v) {
      return utils.format(v)
    },

    trade: function () {
      if ((this.player.inventory.stoneEquipment !== true) && (this.player.gold >= this.stoneEquipment.value)) {
        this.player.gold -= this.stoneEquipment.value
        this.player.inventory.stoneEquipment = true
      }
    }
  },
}
</script>