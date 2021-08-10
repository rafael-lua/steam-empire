<template>
  <div class="main-grid">
    <DebugMode v-if="player.debugMode === true" />
    <GameHeader />
    <SideLeft />
    <div class="container">
      <Main v-if="gameLoaded" />
    </div>
    <SideRight />
  </div>
</template>

<script>
import Main from "../components/Main"
import GameHeader from "../components/GameHeader"
import SideLeft from "../components/SideLeft"
import SideRight from "../components/SideRight"
import DebugMode from "../components/DebugMode"

import Player from "~/scripts/playerData"

// Inject current player object instance reference in each module
Object.keys(Player.modules).forEach(key => {
  Player.modules[key].player = Player
})

export default {
  components: {
    Main,
    GameHeader,
    SideLeft,
    SideRight,
    DebugMode
  },

  data() {
    return {
      player: Player,
      gameLoaded: false,
      gameTimer: null
    }
  },

  methods: {
    // Main game loop. Its called every 100ms. It is the base game tick.
    // Each 10 ticks is one second, or one wheel step.
    gameLoop: function() {
      this.player.modules.time.updateTick()
    }
  },

  mounted() {
    // DEBUG MODE FOR DEVELOPMENT, set false for deploy
    this.player.debugMode = true

    // Load the game
    if (this.player.debugMode === true) {
      // Development file with the debug/test modifications needed
      this.player.modules.gold = 1000
      this.player.modules.coal = 0
      Object.keys(this.player.modules.stages).forEach(key => {
        this.player.modules.stages[key] = false
      })
      this.player.modules.stages.savages = false
      this.player.modules.stages.village = false
      this.player.modules.stages.alchemy = false
      this.player.modules.stages.autoAlchemy = false
    } else {
      // Production load/initialization with storage
    }

    // Set the game timer and call to the main loop
    this.gameTimer = setInterval(this.gameLoop, 100)
    this.gameLoaded = true
  }
}
</script>

<style scoped>
.main-grid {
  position: relative;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header header"
    "left center right";
  gap: 0.5em;
}
</style>
