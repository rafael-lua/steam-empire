<template>
  <div>
    <Popup v-if="hovered" pos="top" text="Sell a limited amount of coal to a traveling nomad. Resets every 7 days." /> 
    <div class="shop-item clickable" v-on:click="sell" v-on:mouseover="hovered = true" v-on:mouseleave="hovered = false">
      <p class="text-center text-500">COAL</p>
      <hr>
      <p class="text-center text-500">MAX ({{maxSold}})</p>
      <hr>
      <p class="text-center text-italic flex-row flex-a-center">
        <img src="~/assets/icons/two-coins.png" alt="Coin Icon" class="icon-basic-mini">
        {{calculatedValue}}
      </p>
    </div>
  </div>
</template>

<script>
import utils from "~/scripts/utils";
import Player from "~/scripts/playerData";
import Popup from "../../Popup";

export default {
  name: "SellCoal",

  components: {
    Popup
  },

  data() {
    return {
      player: Player,
      hovered: false
    }
  },

  methods: {
    sell: function() {
      let sellCoal = this.player.nomads.sellCoal;
      let available = sellCoal.max - sellCoal.sold;
      if(available > 0) {
        let limit = (available <= this.player.coal) ? available : this.player.coal;
        let amount = utils.clamp(this.player.amount, 1, limit);
        if(this.player.coal >= amount) {
          sellCoal.sold += amount;
          this.player.decreaseCoal(amount);
          this.player.increaseGold(amount * sellCoal.value);
        }
      }
    },
  },

  computed: {
    maxSold: function() {
      let sellCoal = this.player.nomads.sellCoal;
      return utils.format(sellCoal.sold) + "/" + sellCoal.max;
    },
    calculatedValue: function() {
      let sellCoal = this.player.nomads.sellCoal;
      let available = sellCoal.max - sellCoal.sold;
      let limit = (available <= this.player.coal) ? available : this.player.coal;
      let amount = utils.clamp(this.player.amount, 1, limit);
      return sellCoal.sold !== sellCoal.max ? utils.format(amount * sellCoal.value) : 0;
    },
  }
}
</script>