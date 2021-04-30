<template>
  <div class="crafting-wrapper bg-light border-dark">
    <div class="crafting flex-col flex-a-center">
      <Tavern v-if="crafting.tavern.completed === false" />
    </div>
  </div>
</template>

<script>
import Tavern from "../elements/crafting/Tavern";
import Player from "~/scripts/playerData";

export default {
  name: "Crafting",

  components: {
    Tavern
  },

  data() {
    return {
      crafting: Player.crafting
    }
  }
}
</script>

<style scoped>

.crafting-wrapper {
  height: 100%;
  padding: 0.5em;
}

.crafting {
  max-height: 77vh;
  overflow-y: auto;
}

</style>