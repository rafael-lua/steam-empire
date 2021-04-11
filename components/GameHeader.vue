<template>
  <header class="header bg-light flex-row flex-a-center flex-j-evenly">
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/mustache.png" alt="Population Icon" class="icon-basic-mini">
      Population: <span class="info-value text-500">{{player.population}}</span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/two-coins.png" alt="Gold Icon" class="icon-basic-mini">
      Gold: <span class="info-value text-500">{{player.gold}}</span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/coal-wagon.png" alt="Coal Icon" class="icon-basic-mini">
      Coal: <span class="info-value text-500">{{player.coal}} <span class="text-italic">({{coalPercentage()}})</span></span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/cargo-crate.png" alt="Capacity Icon" class="icon-basic-mini">
      Capacity: <span class="info-value text-500">{{player.capacity}}</span>
    </p>
    <form class="amount-form" v-on:submit.prevent="">
      <div class="amount noselect" v-on:click="togglePopup()">Amount: {{formatedAmount}}</div>
      <input type="number" v-model.number="modelAmount" placeholder="Amount..." class="amount-value" min="1" max="9999999999">
    </form>
  </header>
</template>

<script>
import utils from "~/scripts/utils";
import Player from "~/scripts/playerData";

export default {

  name: "GameHeader",

  data() {
    return {
      player: Player,
      amountPopup: false,
    }
  },

  methods: {
    coalPercentage: function () {
      return ((this.player.coal / this.player.capacity)*100).toFixed(2) + "%";
    },

    togglePopup: function () {
      this.amountPopup = !this.amountPopup;
    },
  },

  computed: {
    modelAmount: { // With get and set
        get(){
          return this.player.amount;
        },
        set(newVal){
          this.player.setAmount(newVal);
        }
    },
    formatedAmount: function() {
      return utils.format(this.player.amount);
    }
}

}
</script>

<style scoped>

.header {
  width: 100%;
  border-bottom: 2px solid rgb(var(--dark-shadow));
  grid-area: header;
  padding: 0.25em 1em;
}

.amount {
  border-radius: 0.5em;
  padding: 0.1em 0.5em;
  background-color: gold;
  font-size: 0.9em;
}

.confirm {
  border: none;
  margin: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, 0);
}

.confirm:active {
  outline: none;
}

.amount-form {
  display: flex;
}

.amount-value {
  margin-left: 0.5em;
  width: 10em;
  padding: 0 0.5em;
  border: 2px solid rgba(var(--dark-shadow), 0.75);
  border-radius: 1em;
}

.amount-value:focus {
  outline: none;
}

</style>