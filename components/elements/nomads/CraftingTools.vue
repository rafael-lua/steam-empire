<template>
  <div>
    <NomadItem
      v-bind:item="craftingTools"
      v-bind:price="formatedValue(craftingTools.value)"
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
  name: "CraftingTools",

  components: {
    NomadItem
  },

  data () {
    return {
      player: Player,
      craftingTools: nomadData.craftingTools
    }
  },

  methods: {
    formatedValue: function (v) {
      return utils.format(v)
    },

    trade: function () {
      if ((this.player.inventory.craftingTools !== true) && (this.player.gold >= this.craftingTools.value)) {
        this.player.gold -= this.craftingTools.value
        this.player.inventory.craftingTools = true
        this.player.setStage("craft")
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