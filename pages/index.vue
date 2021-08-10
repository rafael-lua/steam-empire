<template>
  <div class="main-grid">
    <DebugMode v-if="player.debugMode === true" />
    <GameHeader />
    <SideLeft v-if="gameLoaded" />
    <div class="container">
      <Main v-if="gameLoaded" />
    </div>
    <SideRight v-if="gameLoaded" />
  </div>
</template>

<script>
import Main from "../components/Main"
import GameHeader from "../components/GameHeader"
import SideLeft from "../components/SideLeft"
import SideRight from "../components/SideRight"
import DebugMode from "../components/DebugMode"

import Player from "~/scripts/playerData"

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
      player: null,
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

  created() {
    this.player = Player

    // Inject current player object instance reference in each module
    Object.keys(this.player.modules).forEach(key => {
      this.player.modules[key].player = this.player
    })
  },

  mounted() {
    // DEBUG MODE FOR DEVELOPMENT, set false for deploy
    this.player.debugMode = true

    // Load the game
    if (this.player.debugMode === true) {
      // Development file with the debug/test modifications needed
      this.player.modules.resources.increase("gold", 1000)
      this.player.modules.resources.decrease("coal", 1000)
      Object.keys(this.player.modules.stages.getStages()).forEach(key => {
        this.player.modules.stages.unsetStage(key)
      })
      this.player.modules.stages.unsetStage("savages")
      this.player.modules.stages.unsetStage("village")
      this.player.modules.stages.unsetStage("alchemy")
      this.player.modules.stages.unsetStage("autoAlchemy")
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
