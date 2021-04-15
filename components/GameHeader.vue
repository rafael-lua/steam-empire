<template>
  <header class="header bg-light flex-row flex-a-center flex-j-evenly">
    
    <p class="text-500">{{player.season.toUpperCase()}}</p>

    <div class="tick-render">
      <img 
        v-for="i in tickAmount" 
        v-bind:key="i" 
        src="~/assets/icons/pokecog.png" 
        alt="Gear Tick" 
        class="gear-tick-icon"
        v-bind:class="rotateClass(i)"
      />
    </div>

    <p class="calendar">
      <span>Day:<span class="info-value-calendar text-500">{{player.day}}</span></span>
      <span>Month:<span class="info-value-calendar text-500">{{player.month}}</span></span>
      <span>Year:<span class="info-value-calendar text-500">{{player.year}}</span></span>
    </p>

    <form class="amount-form" v-on:submit.prevent="">
      <div class="amount noselect">Amount: {{formatedAmount}}</div>
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
      player: Player
    }
  },

  methods: {
    rotateClass: function(i) {
      let classNames = {};
      classNames["rotate-" + i] = true;
      return classNames;
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
    },

    tickAmount: function() {
      return Math.floor(this.player.tickRender / 10);
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

.calendar {
  display: flex;
  justify-content: space-between;
}

.info-value-calendar {
  margin-left: 0.35em;
  margin-right: 1em;
}

/* Gear styles */

.tick-render {
  width: 10em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.gear-tick-icon {
  display: inline-block;
  width: 1em;
  opacity: 0.9;
}

.rotate-1 {
  transform: rotate(0deg);
}

.rotate-2 {
  transform: rotate(18deg);
}

.rotate-3 {
  transform: rotate(36deg);
}

.rotate-4 {
  transform: rotate(54deg);
}

.rotate-5 {
  transform: rotate(72deg);
}

.rotate-6 {
  transform: rotate(90deg);
}

.rotate-7 {
  transform: rotate(108deg);
}

.rotate-8 {
  transform: rotate(126deg);
}

.rotate-9 {
  transform: rotate(144deg);
}

.rotate-10 {
  transform: rotate(162deg);
}

</style>