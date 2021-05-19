<template>
  <div>
    <div
      class="shop-item clickable"
      v-on:click="sell"
      v-on:mouseover="togglePopup('on', 'Sell a limited amount of coal to a traveling nomad. Resets every 7 days')"
      v-on:mouseleave="togglePopup('off', null)"
    >
      <p class="text-center text-500">COAL</p>
      <hr>
      <p class="text-center text-500">MAX ({{maxSold}})</p>
      <hr>
      <CoinFormat>{{calculatedValue}}</CoinFormat>
    </div>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"
import CoinFormat from "../CoinFormat"

export default {
  name: "SellCoal",

  components: {
    CoinFormat
  },

  data () {
    return {
      player: Player,
      hovered: false
    }
  },

  methods: {
    sell: function () {
      let sellCoal = this.player.nomads.sellCoal
      let available = sellCoal.max - sellCoal.sold
      if (available > 0) {
        let limit = (available <= this.player.coal) ? available : this.player.coal
        let amount = utils.clamp(this.player.amount, 1, limit)
        if (this.player.coal >= amount) {
          sellCoal.sold += amount
          this.player.decreaseCoal(amount)
          this.player.increaseGold(amount * sellCoal.value)
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
      let sellCoal = this.player.nomads.sellCoal
      return utils.format(sellCoal.sold) + "/" + sellCoal.max
    },
    calculatedValue: function () {
      let sellCoal = this.player.nomads.sellCoal
      let available = sellCoal.max - sellCoal.sold
      let limit = (available <= this.player.coal) ? available : this.player.coal
      let amount = utils.clamp(this.player.amount, 1, limit)
      return sellCoal.sold !== sellCoal.max ? utils.format(amount * sellCoal.value) : 0
    },
  }
}
</script>