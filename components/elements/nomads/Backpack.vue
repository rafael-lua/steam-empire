<template>
  <div>
    <NomadItem v-bind:item="backpack" v-on:handler="trade">
      <p class="text-center text-400 text-break">
        CAPACITY<br /><span class="text-700">15</span>
      </p>
    </NomadItem>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"

import NomadItem from "./NomadItem"

export default {
  name: "Backpack",

  components: {
    NomadItem
  },

  data() {
    return {
      player: Player
    }
  },

  computed: {
    backpack: function() {
      return this.player.modules.nomads.getNomadData("backpack")
    }
  },

  methods: {
    formatedValue: function(v) {
      return utils.format(v)
    },

    trade: function() {
      if (
        !this.player.modules.inventory.checkIfHas("backpack") &&
        this.player.modules.gold.amount >= this.backpack.value
      ) {
        this.player.modules.gold.decreaseGold(this.backpack.value)
        this.player.modules.inventory.insert("backpack")
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
