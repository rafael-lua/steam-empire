<template>
  <div>
    <Popup v-if="hovered" text="Acquire knowledge of the surroundings, revealing all types of useful information and possibilities" /> 
    <div class="shop-item clickable" v-on:click="buy" v-on:mouseover="hovered = true" v-on:mouseleave="hovered = false">
      <p class="text-center text-500">MAP #1</p>
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
  name: "Map1",

  components: {
    Popup
  },

  data() {
    return {
      player: Player,
      hovered: false,
      price: 100
    }
  },

  methods: {
    buy: function() {
      if((this.player.inventory.map_1 !== true) && (this.player.gold >= this.price)) {
        this.player.gold -= this.price;
        this.player.inventory.map_1 = true;
        this.player.stages.savage = true;
      }
    }
  },
}
</script>