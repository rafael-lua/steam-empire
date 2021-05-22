<template>
  <div>
    <NomadItem
      v-bind:item="sellCoal"
      v-bind:price="calculatedValue"
      v-on:handler="trade"
    >
      <p class="text-center text-500">MAX ({{maxSold}})</p>
    </NomadItem>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"
import { nomadData } from "~/scripts/gameData"

import NomadItem from "./NomadItem"

export default {
  name: "SellCoal",

  components: {
    NomadItem
  },

  data () {
    return {
      player: Player,
      sellCoal: nomadData.sellCoal
    }
  },

  methods: {
    trade: function () {
      let available = this.sellCoal.max - this.player.nomads.sellCoal.sold
      if (available > 0) {
        let limit = (available <= this.player.coal) ? available : this.player.coal
        let amount = utils.clamp(this.player.amount, 1, limit)
        if (this.player.coal >= amount) {
          this.player.nomads.sellCoal.sold += amount
          this.player.decreaseCoal(amount)
          this.player.increaseGold(amount * this.sellCoal.value)
        }
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

  computed: {
    maxSold: function () {
      return utils.format(this.player.nomads.sellCoal.sold) + "/" + this.sellCoal.max
    },

    calculatedValue: function () {
      let available = this.sellCoal.max - this.player.nomads.sellCoal.sold
      let limit = (available <= this.player.coal) ? available : this.player.coal
      let amount = utils.clamp(this.player.amount, 1, limit)
      return (this.player.nomads.sellCoal.sold !== this.sellCoal.max)
        ? utils.format(amount * this.sellCoal.value)
        : 0
    }
  }
}
</script>