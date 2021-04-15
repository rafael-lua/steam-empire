<template>
  <div>
    <Popup v-if="hovered" pos="top" text="Open the crafting capability, allowing the construction of buildings and instruments" /> 
    <div class="shop-item clickable" v-on:click="buy" v-on:mouseover="hovered = true" v-on:mouseleave="hovered = false">
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
import Player from "~/scripts/playerData";
import Popup from "../../Popup";

export default {
  name: "CraftingTools",

  components: {
    Popup
  },

  data() {
    return {
      player: Player,
      hovered: false,
      price: 50
    }
  },

  methods: {
    buy: function() {
      if((this.player.inventory.craftingTools !== true) && (this.player.gold >= this.price)) {
        this.player.gold -= this.price;
        this.player.inventory.craftingTools = true;
        this.player.stages.craft = true;
      }
    }
  },
}
</script>