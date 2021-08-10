<template>
  <div class="main-view noselect">
    <!-- Sub menus navigation -->
    <nav class="submenus-nav bg-light border-dark">
      <img
        src="~/assets/icons/mustache.png"
        alt="Population Icon"
        class="icon-menu noselect"
        v-bind:class="isFocused('population')"
        v-on:click="
          () => {
            changeMenu('population')
          }
        "
      />

      <img
        src="~/assets/icons/gold-mine.png"
        alt="Mine Icon"
        class="icon-menu noselect"
        v-bind:class="isFocused('mines')"
        v-on:click="
          () => {
            changeMenu('mines')
          }
        "
      />

      <img
        src="~/assets/icons/cash.png"
        alt="Market Icon"
        class="icon-menu noselect"
        v-bind:class="isFocused('market')"
        v-on:click="
          () => {
            changeMenu('market')
          }
        "
        v-if="isStageSet('market')"
      />

      <img
        src="~/assets/icons/hammer-nails.png"
        alt="Craft Icon"
        class="icon-menu noselect"
        v-bind:class="isFocused('craft')"
        v-on:click="
          () => {
            changeMenu('craft')
          }
        "
        v-if="isStageSet('craft')"
      />

      <img
        src="~/assets/icons/pocket-watch.png"
        alt="Alchemy Icon"
        class="icon-menu noselect"
        v-bind:class="isFocused('alchemy')"
        v-on:click="
          () => {
            changeMenu('alchemy')
          }
        "
        v-if="isStageSet('alchemy')"
      />
    </nav>

    <!-- Main items view -->
    <Population v-if="menuFocus === 'population'" />
    <Mines v-if="menuFocus === 'mines'" />
    <Market v-if="menuFocus === 'market' && isStageSet('market')" />
    <Crafting v-if="menuFocus === 'craft' && isStageSet('craft')" />
    <Alchemy v-if="menuFocus === 'alchemy' && isStageSet('alchemy')" />
  </div>
</template>

<script>
import Player from "~/scripts/playerData"

// All game components will be imported and managed in here
import Population from "./menus/Population"
import Mines from "./menus/Mines"
import Market from "./menus/Market"
import Crafting from "./menus/Crafting"
import Alchemy from "./menus/Alchemy"

export default {
  name: "Main",

  components: {
    Mines,
    Market,
    Population,
    Crafting,
    Alchemy
  },

  data() {
    return {
      player: Player,
      menuFocus: "population" // Define which view will be shown in the main area
    }
  },

  methods: {
    changeMenu: function(m) {
      this.menuFocus = m
    },

    isFocused: function(m) {
      return this.menuFocus === m ? { "is-focused": true } : {}
    },

    isStageSet: function(stage) {
      return this.player.modules.stages.isSet(stage)
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
