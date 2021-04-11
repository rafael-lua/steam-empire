<template>
  <div class="market bg-light border-dark">
    <div class="market-list">
      <ul>
        <Popup v-if="hovered.nomad" text="Nomads wander through the lands trading goods." /> 
        <li 
          class="clickable" 
          v-bind:class="focusClass('nomads')" 
          v-on:click="changeMarketFocus('nomads')"
          v-on:mouseover="hovered.nomad = true" 
          v-on:mouseleave="hovered.nomad = false"
        >
          NOMADS
        </li>
        
        <Popup v-if="hovered.caravan" text="Caravans..." /> 
        <li 
          class="clickable" 
          v-bind:class="focusClass('caravan')" 
          v-on:click="changeMarketFocus('caravan')"
          v-on:mouseover="hovered.caravan = true" 
          v-on:mouseleave="hovered.caravan = false"
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
import Player from "~/scripts/playerData";
import Nomads from "../elements/nomads/Nomads";

export default {
  name: "Market",

  data() {
    return {
      player: Player,
      marketFocus: "nomads",
      hovered: {
        nomad: false,
        caravan: false
      },
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