<template>
  <div>
    <div
      class="shop-item clickable"
      v-on:click="buy"
      v-on:mouseover="togglePopup('on', 'Acquire knowledge of the surroundings, revealing all types of useful information, materials and possibilities')"
      v-on:mouseleave="togglePopup('off', null)"
    >
      <p class="text-center text-500">MAP #1</p>
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
  name: "Map1",

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
      if ((this.player.inventory.map_1 !== true) && (this.player.gold >= this.price)) {
        this.player.gold -= this.price
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