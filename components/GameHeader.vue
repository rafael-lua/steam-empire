<template>
  <header class="header bg-light flex-row flex-a-center flex-j-evenly">
    <p>Gold: <span class="info-value text-500">{{player.gold}}</span></p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/coal-wagon.png" alt="Coal Wagon" class="icon-basic-mini">
      Coal: <span class="info-value text-500">{{player.coal}} <span class="text-italic">({{coalPercentage()}})</span></span>
    </p>
    <p class="flex-row flex-a-center">
      <img src="~/assets/icons/cargo-crate.png" alt="Coal Wagon" class="icon-basic-mini">
      Capacity: <span class="info-value text-500">{{player.capacity}}</span>
    </p>
    <div class="amount clickable" v-on:click="togglePopup()">Amount: {{formatedAmount}}</div>
    <div class="popup" v-if="amountPopup">
      <button type="button" alt="Close Popup" class="confirm icon-basic-mid clickable" v-on:click="togglePopup()">
        <img src="~/assets/icons/confirmed.png">
      </button>
      <input type="number" v-model.number="modelAmount" placeholder="Amount..." class="amount-value" min="1" max="9999999999">  
    </div>
  </header>
</template>

<script>
import utils from "../scripts/utils";
import Player from "../scripts/playerData";

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
  border: 2px solid black;
  border-radius: 1em;
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

.popup {
  padding: 1em;
  width: 350px;
  height: 150px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid rgba(var(--dark-shadow), 0.9);
  border-radius: 1em;
  background-color: rgba(var(--light-shadow), 0.5);
}

.popup .confirm {
  position: absolute;
  bottom: -1.5em;
  left: 50%;
  transform: translate(-50%, 0);
}

.amount-value {
  width: 100%;
  padding: 1em;
  border: 2px solid rgba(var(--dark-shadow), 0.75);
  border-radius: 1em;
}

.amount-value:focus {
  outline: none;
}

</style>