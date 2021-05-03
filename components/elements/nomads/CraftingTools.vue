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
  name: "CraftingTools",

  data () {
    return {
      player: Player,
      hovered: false,
      price: 50
    }
  },

  methods: {
    buy: function () {
      if ((this.player.inventory.craftingTools !== true) && (this.player.gold >= this.price)) {
        this.player.gold -= this.price
        this.player.inventory.craftingTools = true
        this.player.stages.craft = true
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