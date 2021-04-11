<template>
  <div class="main-view noselect">

    <!-- Sub menus navigation -->
    <nav class="submenus-nav bg-light border-dark">

      <img src="~/assets/icons/mustache.png" 
        alt="Population Icon" 
        class="icon-menu noselect" 
        v-on:click="() => {changeMenu('population')}"
      >

      <img src="~/assets/icons/gold-mine.png" 
        alt="Mine Icon" 
        class="icon-menu noselect" 
        v-on:click="() => {changeMenu('mines')}"
      >

      <img src="~/assets/icons/cash.png" 
        alt="Market Icon" 
        class="icon-menu noselect" 
        v-on:click="() => {changeMenu('market')}"
        v-if="player.stages.market === true"
      >

      <img src="~/assets/icons/hammer-nails.png" 
        alt="Craft Icon" 
        class="icon-menu noselect" 
        v-on:click="() => {changeMenu('craft')}"
        v-if="player.stages.craft === true"
      >

      <img src="~/assets/icons/pocket-watch.png" 
        alt="Alchemy Icon" 
        class="icon-menu noselect" 
        v-on:click="() => {changeMenu('alchemy')}"
        v-if="player.stages.alchemy === true"
      >
      
    </nav>

    <!-- Main items view -->
    <Mines v-if="menuFocus === 'mines'"/>
    <Market v-if="menuFocus === 'market' && player.stages.market === true"/>
    

  </div>
</template>

<script>
import Player from "~/scripts/playerData";

// All game components will be imported and managed in here
import Mines from "./menus/Mines";
import Market from "./menus/Market";

export default {
  name: "Main",

  components: {
    Mines,
    Market,
  },

  data() {
    return {
      player: Player,
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