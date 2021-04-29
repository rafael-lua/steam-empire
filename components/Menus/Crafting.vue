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
            <p class="text-center mg-1x"><span class="text-italic">
              COMPLEXITY: <span class="text-500">{{player.crafting.tavern.complexity}}</span></span>
            </p>
            <p class="text-400">
              PROGRESS: <span class="text-700">{{tavernProgress}} / {{player.crafting.tavern.target}}</span>
            </p>
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
          <div class="hr-4em"></div>
          <div class="flex-col flex-a-center flex-j-center">
            <p class="text-400">WORK VALUE</p>
            <p class="text-700">{{tavernWorkValue}}</p>
          </div>
          <div class="hr-4em"></div>
          <div class="flex-col flex-a-center flex-j-center">
            <p class="text-400">MATERIALS REQUIRED</p>
            <p class="text-s2 text-700 pd-05x" v-bind:class="notAcquired('wood')">WOOD</p>
            <p class="text-s2 text-700 pd-05x" v-bind:class="notAcquired('water')">WATER</p>
            <p class="text-s2 text-700 pd-05x" v-bind:class="notAcquired('barley')">BARLEY</p>
          </div>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
import utils from "~/scripts/utils";
import Player from "~/scripts/playerData";

export default {
  name: "Crafting",

  data() {
    return {
      player: Player,
    }
  },

  methods: {
    notAcquired: function (m) {
      return (this.player.rawMaterials[m] === true) ? null : { "material-not-acquired": true }
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

    tavernProgress: function() {
      let p = ((this.player.crafting.tavern.progress / this.player.crafting.tavern.target) * 100).toFixed(2);
      return `${(this.player.crafting.tavern.progress).toFixed(2)} (${p}%)`;
    },

    tavernWorkValue: function() {
      let t = this.player.crafting.tavern;
      let workValue = (this.player.proficiency / t.complexity).toFixed(2);
      return `${workValue * 10 * t.workers} /s`;
    }
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

.material-not-acquired {
  color: rgba(var(--wine-tone-dark), 0.5);
}

</style>