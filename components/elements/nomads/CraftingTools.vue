<template>
  <div>
    <div
      class="shop-item clickable"
      v-on:click="buy"
      v-on:mouseover="togglePopup('on', 'Open the crafting capability, allowing the construction of buildings and instruments')"
      v-on:mouseleave="togglePopup('off', null)"
    >
      <p class="text-center text-500">CRAFTING<br>TOOLS</p>
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
  name: "CraftingTools",

  components: {
    CoinFormat
  },

  data () {
    return {
      player: Player,
      hovered: false,
      price: 50
    }
  },

  methods: {
    formatedValue: function (v) {
      return utils.format(v)
    },

    buy: function () {
      if ((this.player.inventory.craftingTools !== true) && (this.player.gold >= this.price)) {
        this.player.gold -= this.price
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