<template>
  <div class="side-left bg-light border-dark">
    <div class="side-left-top">
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
    </div>
    <p class="calendar">
      <span>Day:<span class="info-value text-500">{{player.day}}</span></span>
      <span>Month:<span class="info-value text-500">{{player.month}}</span></span>
      <span>Year:<span class="info-value text-500">{{player.year}}</span></span>
    </p>
    <hr>
  </div>
</template>

<script>
import Player from "../scripts/playerData";

export default {
  name: "SideLeft",

  data() {
    return {
      player: Player,
    }
  },

  methods: {
    rotateClass: function(i) {
      let classNames = {};
      classNames["rotate-" + i] = true;
      return classNames;
    }
  },

  computed: {
    tickAmount: function() {
      return Math.floor(this.player.tickRender / 10);
    }
  }

}
</script>

<style scoped>

.side-left {
  margin: 0 0 0.5em 0.5em;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
}

.calendar {
  font-size: 0.85em;
  display: flex;
  justify-content: space-between;
}

.side-left-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tick-render {
  display: flex;
  justify-content: flex-end;
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