<template>
  <div class="crafting-wrapper bg-light border-dark">
    <div class="crafting flex-col flex-a-center">
      <div class="item flex-col border-dark">
        <div class="flex-row flex-a-center flex-j-evenly">
          <div class="flex-col flex-a-center flex-j-center">
            <p class="text-500">TAVERN</p>
            <img src="~/assets/icons/tavern-sign.png" alt="Coin Icon" class="icon-basic">
          </div>
          <div class="flex-col flex-a-center">
            <div class="flex-row flex-a-center flex-j-between">
              <p class="text-center mg-1x"><span class="text-italic">COMPLEXITY: <span class="text-500">100</span></span></p>
              <p class="text-center mg-1x"><span class="text-italic">PROFICIENCY: <span class="text-500">100</span></span></p>
            </div>
            <div><p class="text-700">PROGRESS (100%) / TARGET</p></div>
          </div>
        </div>
        <hr class="hr-75 hr-mg">
        <div class="flex-row flex-a-center flex-j-evenly">
          <div class="flex-col flex-a-center">
            <p class="text-400">EMPLOYED</p>
            <p class="text-700">1</p>
            <p class="text-500 text-italic text-s1">(100%)</p>
          </div>
          <div class="flex-col flex-a-center flex-j-center">
            <div class="button-blue clickable flex-col flex-a-center" v-on:click="false">
              <p class="text-500">EMPLOY</p>
              <p class="text-700 text-italic flex-row flex-a-center">
                <img src="~/assets/icons/mustache.png" alt="Coin Icon" class="icon-basic-mini only-right">
                {{amountCalculated}}
              </p>
            </div>
          </div>
          <div class="flex-col flex-a-center flex-j-center">
            <div class="button-wine clickable flex-col flex-a-center" v-on:click="false">
              <p class="text-500">RESET</p>
            </div>
          </div>
          <div class="hr-left"><p>WORK VALUE/s<br>(x10tickXworkers)</p></div>
          <div class="hr-left"><p>RESOURCES<br>REQUIREMENTS</p></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Player from "~/scripts/playerData";

export default {
  name: "Crafting",

  data() {
    return {
      player: Player,
    }
  },

  computed: {
    amountCalculated: function() {
      let unemployed = this.player.getUnemployed();
      if(unemployed === 0) {
        return 0;
      } else {
        return utils.format(unemployed >= this.player.amount ? this.player.amount : unemployed);
      }
    },
  }
}
</script>

<style scoped>

.crafting-wrapper {
  height: 100%;
  padding: 0.5em;
}

.crafting {
  max-height: 77vh;
  overflow-y: auto;
}

.item {
  width: 100%;
  padding: 0.25em;
}

</style>