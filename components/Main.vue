<template>
  <div class="main-view">

    <!-- Sub menus navigation -->
    <nav class="submenus-nav bg-light border-dark">

      <img src="~/assets/icons/gold-mine.png" 
        alt="Mine Icon" 
        class="icon-menu clickable" 
        v-on:click="() => {changeMenu('mines')}"
      >
      
    </nav>

    <!-- Main items view -->
    <Mines v-if="menuFocus === 'mines'"/>
    

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
      menuFocus: "mines", // Define each view will be shown in the main area
    }
  },
  methods: {
    changeMenu: function(m) {
      this.menuFocus = m;
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