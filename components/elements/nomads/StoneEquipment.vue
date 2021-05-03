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
      <p class="text-center text-italic flex-row flex-a-center">
        <img src="~/assets/icons/two-coins.png" alt="Coin Icon" class="icon-basic-mini">
        {{price}}
      </p>
    </div>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"

export default {
  name: "StoneEquipment",

  data () {
    return {
      player: Player,
      hovered: false,
      price: 10
    }
  },

  methods: {
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