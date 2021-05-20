<template>
  <div class="crafting-wrapper bg-light border-dark">
    <div class="crafting flex-col flex-a-center">
      <CraftingItem
        v-if="player.crafting['tavern'].completed === false"
        v-bind:crafting="tavernData"
      />
      <CraftingItem
        v-if="player.crafting['alchemyTable'].completed === false"
        v-bind:crafting="alchemyTableData"
      />
    </div>
  </div>
</template>

<script>
import Player from "~/scripts/playerData"
import { craftingsData } from "~/scripts/gameData"

import CraftingItem from "../elements/crafting/CraftingItem"

export default {
  name: "Crafting",

  components: {
    CraftingItem
  },

  data () {
    return {
      player: Player
    }
  },

  computed: {
    tavernData: function () { return craftingsData.tavern },
    alchemyTableData: function () { return craftingsData.alchemyTable },
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