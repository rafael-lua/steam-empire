<template>
  <div class="main-grid">
    <GameHeader />
    <SideLeft />
    <div class="container">
      <Main v-if="gameLoaded"/>
    </div>
    <SideRight />
  </div>
</template>

<script>
import Player from "~/scripts/playerData";
import Main from "../components/Main";
import GameHeader from "../components/GameHeader";
import SideLeft from "../components/SideLeft";
import SideRight from "../components/SideRight";

// Timer interval variables
let gameTimer = null;
let calendarClock = 0;

// Main game loop. Its called every 100ms.
const gameLoop = () => {
  // Calculates the time
  calendarClock += 1;
  Player.updateTickRender();
  if(calendarClock >= 100) {
    calendarClock = 0;
    Player.updateCalendar();
  }
}

export default {
  components: {
    Main,
    GameHeader,
    SideLeft,
    SideRight,
  },
  data() {
    return {
      gameLoaded: false
    }
  },
  mounted() {
    // Set the game timer and call to the main loop
    gameTimer = setInterval(gameLoop, 100);

    this.gameLoaded = true;
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