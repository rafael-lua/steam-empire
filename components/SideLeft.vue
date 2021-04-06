<template>
  <div class="side-left bg-light border-dark">
    <p><span class="text-500">{{player.season.toUpperCase()}}</span></p>      
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

</style>