<template>
  <div>
    <NomadItem
      v-bind:item="map_1"
      v-bind:price="formatedValue(map_1.value)"
      v-on:handler="trade"
    />
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"

import { nomadData } from "~/scripts/gameData"
import NomadItem from "./NomadItem"

export default {
  name: "Map1",

  components: {
    NomadItem
  },

  data () {
    return {
      player: Player,
      map_1: nomadData.map_1
    }
  },

  methods: {
    formatedValue: function (v) {
      return utils.format(v)
    },

    trade: function () {
      if ((this.player.inventory.map_1 !== true) && (this.player.gold >= this.map_1.value)) {
        this.player.gold -= this.map_1.value
        this.player.inventory.map_1 = true
        this.player.rawMaterials.water = true
        this.player.rawMaterials.barley = true
        this.player.rawMaterials.wood = true
        this.player.setStage("savages")
      }
    },

    togglePopup: function (e, t) {
      if (e === "on") {
        utils.popup.text = t
        utils.popup.hovered = true
      } else {
        utils.popup.hovered = false
      }
    }
  },
}
</script>