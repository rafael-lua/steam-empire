<template>
  <div class="nomads noselect">
    <!-- Nav section -->
    <nav class="nomads-nav">
      <p 
        v-bind:class="navFocus('sell')" 
        class="text-700 text-italic text-b2 clickable"
        v-on:click="toggleShopFocus('sell')"
      >
        SELL TO
      </p>
      <p 
        v-bind:class="navFocus('buy')" 
        class="text-700 text-italic text-b2 clickable"
        v-on:click="toggleShopFocus('buy')"
      >
        BUY FROM
      </p>
    </nav>
    <hr>

    <!-- Sell section -->

    <div class="shop-wrapper" v-if="shopFocus === 'sell'">
       <SellCoal />
    </div>

    <!-- Buy section -->

    <div class="shop-wrapper" v-if="shopFocus === 'buy'">
      <div class="shop-item clickable">
        <p class="text-center text-500">STONE EQUIPMENT</p>
        <hr>
        <p class="text-center text-italic">1.123e306</p>
      </div>
      <div class="shop-item clickable">
        <p class="text-center text-500">CRAFTING TOOLS</p>
        <hr>
        <p class="text-center text-italic">1.123e306</p>
      </div>
      <div class="shop-item clickable">
        <p class="text-center text-500">MAP #1</p>
        <hr>
        <p class="text-center text-italic">1.123e306</p>
      </div>
    </div>
  </div>
</template>

<script>
import SellCoal from "./SellCoal";

export default {
  name: "Nomads",
  components: {
    SellCoal
  },
  data() {
    return {
      shopFocus: "sell"
    }
  },
  methods: {
    toggleShopFocus: function(f) {
      this.shopFocus = f;
    },
    navFocus: function(f) {
      return this.shopFocus === f ? {"nomads-nav-selected": true} : {"nomads-nav-notselected": true};
    }
  }
}
</script>

<style scoped>

.nomads {
  height: 75vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.nomads-nav {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 0.5em;
}

.nomads-nav p {
  padding: 0.25em 0.5em;
}

.nomads-nav-selected {
  border: 3px solid rgba(var(--golden-tone), 1);
  border-radius: 0.5em;
  background-color: rgba(var(--golden-tone), 0.25);
}

.nomads-nav-notselected {
  border: 3px solid rgba(0, 0, 0, 0);
  border-radius: 0.5em;
}

.shop-wrapper {
  overflow-y: auto;
  padding: 0.5em 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

/* 
  v-deep allows to create a deep selector that affects children even when scoped.
  So all items can share the same style with the wrapper class.
*/
::v-deep .shop-item {
  width: 125px;
  margin: 0.5em;
  padding: 0.25em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(var(--dark-shadow));
  border-radius: 1em;
  background-color: rgba(255, 255, 255, 0.35);
}

::v-deep .shop-item p {
  font-size: 0.9em;
  margin: 0.1em 0;
}

::v-deep .shop-item:hover {
  background-color: rgba(110, 223, 100, 0.219);
}

</style>