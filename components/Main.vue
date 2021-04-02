<template>
  <div class="main-view">

    <!-- Main grid items view -->
    <div v-if="menuFocus === 'all'" class="main-grid">
      <h1>
        steam-empire
      </h1>  
    </div>

    <!-- Submenu items view -->
    <div v-if="menuFocus === 'sub'">
      submenu
    </div>

  </div>
</template>

<script>
// All game components will be imported and managed in here

export default {
  name: "Main",
  data() {
    return {
      menuFocus: "all", // Define each view will be shown in the main area
    }
  }
}
</script>

<style scoped>

.main-view {
  height: 100%;
}

.main-grid {
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}

</style>