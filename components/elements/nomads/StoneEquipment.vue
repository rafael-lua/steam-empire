<template>
  <div>
    <Popup v-if="hovered" pos="top" text="Increases overall competency of collecting coal by 1" /> 
    <div class="shop-item clickable" v-on:click="buy" v-on:mouseover="hovered = true" v-on:mouseleave="hovered = false">
      <p class="text-center text-500">STONE<br>EQUIPMENT</p>
      <hr>
      <p class="text-center text-500 text-break">COMPETENCY<br><span class="text-700">1</span></p>
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
  name: "StoneEquipment",
  
  components: {
    Popup
  },

  data() {
    return {
      player: Player,
      hovered: false,
      price: 10
    }
  },

  methods: {
    buy: function() {
      if((this.player.inventory.stoneEquiment !== true) && (this.player.gold >= this.price)) {
        this.player.gold -= this.price;
        this.player.inventory.stoneEquiment = true;
        this.player.updateCompetency();
      }
    },
  },
}
</script>