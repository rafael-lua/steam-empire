<template>
  <div>
    <NomadItem v-bind:item="map_1" v-on:handler="trade" />
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"

import NomadItem from "./NomadItem"

export default {
  name: "Map1",

  components: {
    NomadItem
  },

  data() {
    return {
      player: Player
    }
  },

  computed: {
    map_1: function() {
      return this.player.modules.nomads.getNomadData("map_1")
    }
  },

  methods: {
    formatedValue: function(v) {
      return utils.format(v)
    },

    trade: function() {
      if (
        !this.player.modules.inventory.checkIfHas("map_1") &&
        this.player.modules.gold.amount >= this.map_1.value
      ) {
        this.player.modules.gold.decreaseGold(this.stoneEquipment.value)
        this.player.modules.inventory.insert("stoneEquipment")
        this.player.modules.materials.insert("water")
        this.player.modules.materials.insert("barley")
        this.player.modules.materials.insert("wood")
        this.player.modules.stage.setStage("savages")
      }
    },

    togglePopup: function(e, t) {
      if (e === "on") {
        utils.popup.text = t
        utils.popup.hovered = true
      } else {
        utils.popup.hovered = false
      }
    }
  }
}
</script>
