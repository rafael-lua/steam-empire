<template>
  <div>
    <NomadItem v-bind:item="sellCoal" v-on:handler="trade">
      <p class="text-center text-500">MAX ({{ maxSold }})</p>
    </NomadItem>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"

import NomadItem from "./NomadItem"

export default {
  name: "SellCoal",

  components: {
    NomadItem
  },

  data() {
    return {
      player: Player
    }
  },

  computed: {
    sellCoal: function() {
      return this.player.modules.nomads.getNomadData("sellCoal")
    },

    maxSold: function() {
      return (
        utils.format(this.player.modules.nomads.coalSelling.sold) +
        "/" +
        this.sellCoal.max
      )
    }

    // TODO: if not using this, then just remove it!
    // calculatedValue: function() {
    //   const available = this.sellCoal.max - this.player.nomads.sellCoal.sold
    //   const limit = available <= this.player.coal ? available : this.player.coal
    //   const amount = utils.clamp(this.player.amount, 1, limit)
    //   return this.player.nomads.sellCoal.sold !== this.sellCoal.max
    //     ? utils.format(amount * this.sellCoal.value)
    //     : 0
    // }
  },

  methods: {
    trade: function() {
      const available =
        this.sellCoal.max - this.player.modules.nomads.coalSelling.sold
      const playersCoal = this.player.modules.resources.get("coal")
      if (available > 0) {
        const limit = available <= playersCoal ? available : playersCoal
        const amount = utils.clamp(this.player.amount, 1, limit)
        if (playersCoal >= amount) {
          this.player.modules.nomads.increaseCoalSold(amount)
          this.player.modules.coal.decreaseCoal(amount)
          this.player.module.gold.increaseGold(amount * this.sellCoal.value)
        }
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
