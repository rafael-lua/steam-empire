<template>
  <div class="mines-wrapper bg-light border-dark">
    <div class="mines">
      
      <div class="flex-row flex-a-center flex-j-center">
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <img src="~/assets/icons/cave-entrance.png" alt="Coal Button" class="icon-basic">
          <p class="text-500">COAL MINE</p>
          <p class="text-italic line-s">(common)</p>
        </div>
        <div class="flex-col flex-a-center flex-j-center hr-left pd-1x">
          <p class="text-400">HARDNESS</p>
          <p class="text-700 text-b2">1</p>
        </div>
        <div class="flex-col flex-a-center flex-j-center hr-left pd-1x">
          <p class="text-400">YIELD VALUE</p>
          <p class="text-700 text-b2">
            <!-- Multiply per 10 because Yield shows daily gains -->
            {{ ((player.competency * player.mines.common.workers) / player.mines.common.hardness) * 10 }} /day
          </p>
        </div>
        <div class="flex-col flex-a-center flex-j-center hr-left pd-1x">
          <p class="text-500">EMPLOYED</p>
          <p class="text-700">{{commonEmployed}}</p>
          <p class="text-500 text-italic text-s1">({{commonEmployedRatio}})</p>
        </div>
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <div class="button-blue clickable flex-col flex-a-center" v-on:click="commonEmploy">
            <p class="text-500">EMPLOY</p>
            <p class="text-700 text-italic flex-row flex-a-center">
              <img src="~/assets/icons/mustache.png" alt="Coin Icon" class="icon-basic-mini only-right">
              {{amountCalculated}}
            </p>
          </div>
        </div>
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <div class="button-wine clickable flex-col flex-a-center" v-on:click="commonReset">
            <p class="text-500">RESET</p>
          </div>
        </div>
      </div>
      <hr class="hr-mg">

    </div>
  </div>
</template>

<script>
import Player from "~/scripts/playerData";
import utils from "~/scripts/utils";

export default {
  name: "Mines",

  data() {
    return {
      player: Player,
    }
  },

  methods: {
    commonEmploy: function() {
      let unemployed = this.player.getUnemployed();
      if(unemployed > 0) {
        let newEmployers = unemployed >= this.player.amount ? this.player.amount : unemployed;
        this.player.increaseEmployed(newEmployers);
        this.player.mines.common.workers += newEmployers;
      }
    },

    commonReset: function() {
      let workers = this.player.mines.common.workers;
      if(workers > 0) {
        this.player.decreaseEmployed(workers);
        this.player.mines.common.workers = 0;
      }
    },
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
    commonEmployed: function() {
      return utils.format(this.player.mines.common.workers);
    },
    commonEmployedRatio: function() {
      return `${((this.player.mines.common.workers / this.player.population) * 100).toFixed(2)}%`;
    },
  }
}
</script>

<style scoped>

.mines-wrapper {
  height: 100%;
  padding: 0.5em;
}

.mines {
  max-height: 77vh;
  overflow-y: auto;
}

</style>