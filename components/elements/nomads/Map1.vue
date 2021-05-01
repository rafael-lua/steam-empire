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
      <p class="text-center text-italic flex-row flex-a-center">
        <img src="~/assets/icons/two-coins.png" alt="Coin Icon" class="icon-basic-mini">
        {{price}}
      </p>
    </div>
  </div>
</template>

<script>
import utils from "~/scripts/utils";
import Player from "~/scripts/playerData";

export default {
  name: "Map1",

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
    },

    togglePopup: function(e, t) {
      if(e === "on") {
        utils.popup.text = t;
        utils.popup.hovered = true;
      } else {
        utils.popup.hovered = false;
      }
    }
  },
}
</script>