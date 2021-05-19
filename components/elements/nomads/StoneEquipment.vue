<template>
  <div>
    <div
      class="shop-item clickable"
      v-on:click="buy"
      v-on:mouseover="togglePopup('on', 'Increases overall competency of collecting coal by 1')"
      v-on:mouseleave="togglePopup('off', null)"
    >
      <p class="text-center text-500">STONE<br>EQUIPMENT</p>
      <hr>
      <p class="text-center text-400 text-break">COMPETENCY<br><span class="text-700">1</span></p>
      <hr>
      <CoinFormat>{{formatedValue(price)}}</CoinFormat>
    </div>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"
import CoinFormat from "../CoinFormat"

export default {
  name: "StoneEquipment",

  components: {
    CoinFormat
  },

  data () {
    return {
      player: Player,
      hovered: false,
      price: 10
    }
  },

  methods: {
    formatedValue: function (v) {
      return utils.format(v)
    },

    buy: function () {
      if ((this.player.inventory.stoneEquiment !== true) && (this.player.gold >= this.price)) {
        this.player.gold -= this.price
        this.player.inventory.stoneEquiment = true
        this.player.updateCompetency()
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