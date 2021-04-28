<template>
  <div class="side-right bg-light border-dark">
    <div class="flex-col">
      <div class="info-wrapper">
        <Popup v-if="apHovered" pos="bottom" text="AP (achievement points) can be used to upgrade alchemy/idle mechanics." /> 
        <p class="text-500 hover-highlight" v-on:mouseover="apHovered = true" v-on:mouseleave="apHovered = false">AP: <span class="info-value text-700">{{player.achievementPoints}}</span></p>
        <hr>
      </div>

      <Achievement 
        className="test1" 
        v-bind:classStyle="1" 
        v-bind:factor="firstStep" 
        desc="Collect your first 10 coal ores" 
      />
      
    </div>
  </div>
</template>

<script>
import Player from "~/scripts/playerData";
import Achievement from "./Achievement";
import Popup from "./Popup";

export default {
  name: "SideRight",
  components: {
    Achievement,
    Popup
  },
  data() {
    return {
      player: Player,
      apHovered: false
    }
  },
  computed: {
    firstStep: function() {
      let p = this.player.achievements.firstSteps.progress / this.player.achievements.firstSteps.target;
      return p;
    }
  }
}
</script>

<style scoped>

.side-right {
  margin: 0 0.5em 0.5em 0;
}

.info-wrapper {
  padding: 0.25em;
}

</style>