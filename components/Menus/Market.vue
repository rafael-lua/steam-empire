<template>
  <div class="market bg-light border-dark">
    <div class="market-list">
      <ul>
        <li 
          class="clickable" 
          v-bind:class="focusClass('nomads')" 
          v-on:click="changeMarketFocus('nomads')"
          v-on:mouseover="togglePopup('on', 'Nomads wander through the lands trading goods.')" 
          v-on:mouseleave="togglePopup('off', null)"
        >
          NOMADS
        </li>
        
        <li 
          class="clickable" 
          v-bind:class="focusClass('caravan')" 
          v-on:click="changeMarketFocus('caravan')"
          v-on:mouseover="togglePopup('on', 'Caravans...')" 
          v-on:mouseleave="togglePopup('off', null)"
        >
          CARAVAN
        </li>
        <li>...</li>
      </ul>
    </div>
    <div class="divider"></div>
    <div class="market-content">
      <Nomads v-if="marketFocus == 'nomads'" />
    </div>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData";
import Nomads from "../elements/nomads/Nomads";

export default {
  name: "Market",

  data() {
    return {
      player: Player,
      marketFocus: "nomads",
    }
  },

  components: {
    Nomads
  },

  methods: {
    changeMarketFocus: function(v) {
      this.marketFocus = v;
    },

    focusClass: function(v) {
      return v === this.marketFocus ? {selected: true} : {};
    },

    togglePopup: function(e, t) {
      if(e === "on") {
        utils.popup.text = t;
        utils.popup.hovered = true;
      } else {
        utils.popup.hovered = false;
      }
    }
  },
}
</script>

<style scoped>

.market {
  height: 100%;
  display: flex;
  padding: 0.5em 0;
}

.divider {
  height: 100%;
  width: 1px;
  border: 2px solid rgb(var(--dark-shadow));
}

.selected {
  background-color: rgba(var(--light-shadow), 0.5);
}

.market-list {
  padding: 0.5em;
  width: 20%;
}

.market-list li {
  padding: 0.1em 0.3em;
  font-weight: 400;
}

.market-list li.selected {
  font-weight: 500;
}

.market-content {
  width: 80%;
}

</style>