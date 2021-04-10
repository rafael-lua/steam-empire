<template>
  <div class="shop-item clickable" v-on:click="sell">
    <p class="text-center text-500">COAL</p>
    <hr>
    <p class="text-center text-500">MAX ({{maxSold}})</p>
    <hr>
    <p class="text-center text-italic">${{calculatedValue}}</p>
  </div>
</template>

<script>
import utils from "~/scripts/utils";
import Player from "~/scripts/playerData";

export default {
  name: "SellCoal",
  data() {
    return {
      player: Player
    }
  },
  methods: {
    sell: function() {
      let sellCoal = this.player.nomads.sellCoal;
      let available = sellCoal.max - sellCoal.sold;
      if(available > 0) {
        let amount = utils.clamp(this.player.amount, 1, available);
        if(this.player.coal >= amount) {
          sellCoal.sold += amount;
          this.player.decreaseCoal(amount);
          this.player.increaseGold(amount * sellCoal.value);
        }
      }
    }
  },
  computed: {
    maxSold: function() {
      let sellCoal = this.player.nomads.sellCoal;
      return sellCoal.sold + "/" + sellCoal.max;
    },
    calculatedValue: function() {
      let sellCoal = this.player.nomads.sellCoal;
      let amount = utils.clamp(this.player.amount, 1, sellCoal.max);
      return sellCoal.sold !== sellCoal.max ? utils.format(amount * sellCoal.value) : 0;
    },
  }
}
</script>