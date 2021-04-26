<template>
  <div class="crafting bg-light border-dark">
    <div class="item mg-1">
      <p>TAVERN</p>
      <p>EMPLOY BUTTON</p>
      <p>RESET BUTTON</p>
      <p>PROGRESS POINTS / TARGET POINTS</p>
      <p>COMPLEXITY | PROFICIENCY | WORK VALUE/s (x10, since it is per tick)</p>
      <p>RESOURCES REQUIREMENTS</p>
    </div>
  </div>
</template>

<script>
import Player from "~/scripts/playerData";

export default {
  name: "Crafting",

  data() {
    return {
      player: Player,
    }
  }
}
</script>

<style scoped>

.crafting {
  height: 100%;
  display: flex;
  padding: 0.5em 0;
}

.item {
  border: 3px solid black;
  padding: 0.25em;
  width: 100%;
  height: 10em;
}

</style>