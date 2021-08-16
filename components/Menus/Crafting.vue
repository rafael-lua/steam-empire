<template>
  <div class="crafting-wrapper bg-light border-dark">
    <div class="crafting flex-col flex-a-center">
      <CraftingItem
        v-if="!isCraftCompleted('alchemyTable')"
        v-bind:crafting="getCraftData('alchemyTable')"
      />
      <CraftingItem
        v-if="!isCraftCompleted('tavern')"
        v-bind:crafting="getCraftData('tavern')"
      />
    </div>
  </div>
</template>

<script>
import Player from "~/scripts/playerData"

import CraftingItem from "../elements/crafting/CraftingItem"

export default {
  name: "Crafting",

  components: {
    CraftingItem
  },

  data() {
    return {
      player: Player
    }
  },

  methods: {
    isCraftCompleted: function(craft) {
      return this.player.modules.craftings.isCompleted(craft)
    },

    getCraftData: function(craft) {
      return this.player.modules.craftings.getCraftData(craft)
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
