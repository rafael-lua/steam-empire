<template>
  <div class="main-view">

    <!-- Menus navigation -->
    <nav class="submenus-nav bg-light border-dark">
      <img src="~/assets/icons/gold-mine.png" alt="Mine Icon" class="icon-menu">
    </nav>

    <!-- Main grid items view -->
    <Mines v-if="menuFocus === 'mine'"/>

  </div>
</template>

<script>
// All game components will be imported and managed in here
import Mines from "./Menus/Mines";

export default {
  name: "Main",
  components: {
    Mines
  },
  data() {
    return {
      menuFocus: "mine", // Define each view will be shown in the main area
    }
  }
}
</script>

<style scoped>

.main-view {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
}

</style>