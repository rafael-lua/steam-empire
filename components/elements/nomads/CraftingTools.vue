<template>
  <div>
    <NomadItem v-bind:item="craftingTools" v-on:handler="trade" />
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"

import NomadItem from "./NomadItem"

export default {
  name: "CraftingTools",

  components: {
    NomadItem
  },

  data() {
    return {
      player: Player
    }
  },

  computed: {
    craftingTools: function() {
      return this.player.modules.nomads.getNomadData("craftingTools")
    }
  },

  methods: {
    formatedValue: function(v) {
      return utils.format(v)
    },

    trade: function() {
      if (
        !this.player.modules.inventory.checkIfHas("craftingTools") &&
        this.player.modules.gold.amount >= this.craftingTools.value
      ) {
        this.player.modules.gold.decreaseGold(this.craftingTools.value)
        this.player.modules.inventory.insert("craftingTools")
        this.player.modules.stage.setStage("craft")
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
