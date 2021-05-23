<template>
  <div class="main-grid">
    <DebugMode v-if="player.debugMode === true" />
    <GameHeader />
    <SideLeft />
    <div class="container">
      <Main v-if="gameLoaded"/>
    </div>
    <SideRight />
  </div>
</template>

<script>
import Player from "~/scripts/playerData"
import Main from "../components/Main"
import GameHeader from "../components/GameHeader"
import SideLeft from "../components/SideLeft"
import SideRight from "../components/SideRight"
import DebugMode from "../components/DebugMode"

export default {
  components: {
    Main,
    GameHeader,
    SideLeft,
    SideRight,
    DebugMode
  },

  data () {
    return {
      player: Player,
      gameLoaded: false,
      gameTimer: null,
      calendarClock: 0,
      week: 0,
      isDayUpdate: false
    }
  },

  methods: {
    // Main game loop. Its called every 100ms. It is the base game tick.
    gameLoop: function () {
      this.isDayUpdate = false // Always reset to false

      // Calculates the time
      this.calendarClock += 1
      Player.updateTickRender()
      if (this.calendarClock >= 100) { // Completed day updates
        this.week += 1
        this.calendarClock = 0
        Player.updateCalendar()
        this.isDayUpdate = true
      }

      if (this.week === 7) { // Completed week.
        this.week = 1

        Player.resetNomadCoal()
      }

      // Per tick updates. Each 10 ticks is one second, or one wheel step.

      Player.updatePopulation(this.isDayUpdate)

      Player.updateAlchemy()
      Player.updateCraftings()
      Player.updateCommonMine()

      Player.updateReports()
    }
  },

  mounted () {
    // DEBUG MODE FOR DEVELOPMENT, set false for deploy
    this.player.debugMode = true

    // Load the game
    if (this.player.debugMode === true) {
      // Development file with the debug/test modifications needed
      this.player.gold = 1000
      this.player.coal = 100
      Object.keys(this.player.stages).forEach((key) => {
        this.player.stages[key] = true
      })
      this.player.stages.savages = false
      this.player.stages.village = false
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