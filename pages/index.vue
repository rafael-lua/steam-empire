<template>
  <div class="container">
    <Main v-if="gameLoaded"/>
  </div>
</template>

<script>
import Main from "../components/Main";

import Player from "../scripts/playerData";

// Timer interval variable
let gameTimer = null;

// Main game loop. Its called every 100ms.
const gameLoop = () => {
  
}

export default {
  components: {
    Main
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

<style>

</style>