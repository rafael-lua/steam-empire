<template>
  <div class="item flex-col border-dark mg-bottom-05">
    <div class="flex-row flex-a-center flex-j-evenly">
       <div
        class="flex-col flex-a-center flex-j-center mg-1x hover-highlight"
        v-on:mouseover="togglePopup('on', 'A small tavern with beer and accommodations. Travelers may want to stay permanently and they will be available for hiring. Population growth +1')"
        v-on:mouseleave="togglePopup('off', null)"
      >
        <p class="text-500">TAVERN</p>
        <img src="~/assets/icons/tavern-sign.png" alt="Tavern Icon" class="icon-basic">
      </div>
      <div class="flex-col flex-a-center flex-j-center">
        <p class="text-400">WORK VALUE</p>
        <p class="text-700">{{workValue}}</p>
      </div>
      <div class="flex-col flex-a-center limit-width">
        <p class="text-400 flex-row flex-a-center text-s1">
          BASE COST
          <img src="~/assets/icons/two-coins.png" alt="Coin Icon" class="icon-basic-mini">
          <span class="text-700">{{player.crafting.tavern.baseCost}}</span>
        </p>
        <hr>
        <p class="text-400 text-center"><span class="text-italic">
          COMPLEXITY: <span class="text-500">{{player.crafting.tavern.complexity}}</span></span>
        </p>
        <p class="text-400">
          PROGRESS: <span class="text-700"><span class="text-green">{{progress}}</span> / {{player.crafting.tavern.target}}</span>
        </p>
      </div>
    </div>
    <hr class="hr-75 hr-mg">
    <div class="flex-row flex-a-center flex-j-evenly">
      <div class="flex-col flex-a-center">
        <p class="text-400">EMPLOYED</p>
        <p class="text-700">{{employed}}</p>
        <p class="text-500 text-italic text-s1">({{employedRatio}})</p>
      </div>
      <div class="flex-col flex-a-center flex-j-center">
        <Button title="EMPLOY" color="blue" v-on:handler="workersEmploy">
          <p class="text-700 text-italic flex-row flex-a-center">
            <img src="~/assets/icons/mustache.png" alt="Employ Icon" class="icon-basic-mini only-right">
            {{amountCalculated}}
          </p>
        </Button>
      </div>
      <div class="flex-col flex-a-center flex-j-center">
        <Button title="RESET" color="wine" v-on:handler="workersReset" />
      </div>
      <div class="hr-4em"></div>
      <div class="flex-col flex-a-center flex-j-center">
        <p class="text-400">DAILY COST</p>
        <CoinFormat><span class="text-700">{{dailyCost}}</span></CoinFormat>
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
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"
import CoinFormat from "../CoinFormat"
import Button from "../Button"

export default {
  name: "Tavern",

  components: {
    CoinFormat,
    Button
  },

  data () {
    return {
      player: Player,
      hovered: {
        tavern: false,
      }
    }
  },

  methods: {
    notAcquired: function (m) {
      return (this.player.rawMaterials[m] === true) ? null : { "material-not-acquired": true }
    },

    workersEmploy: function () {
      let canCraft = this.player.hasMaterials(["water", "wood", "barley"])
      if (canCraft === true) {
        let unemployed = this.player.getUnemployed()
        if (unemployed > 0) {
          let newEmployers = unemployed >= this.player.amount ? this.player.amount : unemployed
          this.player.increaseEmployed(newEmployers)
          this.player.crafting.tavern.workers += newEmployers
        }
      }
    },

    workersReset: function () {
      let workers = this.player.crafting.tavern.workers
      if (workers > 0) {
        this.player.decreaseEmployed(workers)
        this.player.crafting.tavern.workers = 0
      }
    },

    togglePopup: function (e, t) {
      if (e === "on") {
        utils.popup.text = t
        utils.popup.hovered = true
      } else {
        utils.popup.hovered = false
      }
    }
  },

  computed: {
    amountCalculated: function () {
      let unemployed = this.player.getUnemployed()
      if (unemployed === 0) {
        return 0
      } else {
        return utils.format(unemployed >= this.player.amount ? this.player.amount : unemployed)
      }
    },

    progress: function () {
      let p = ((this.player.crafting.tavern.progress / this.player.crafting.tavern.target) * 100).toFixed(2)
      return `${(this.player.crafting.tavern.progress).toFixed(2)} (${p}%)`
    },

    workValue: function () {
      let t = this.player.crafting.tavern
      let workValue = (this.player.proficiency / t.complexity).toFixed(2)
      return `${(workValue * 10 * t.workers).toFixed(2)} /s`
    },

    dailyCost: function () {
      return utils.format(this.player.getCraftCost("tavern") * 100)
    },

    employed: function () {
      return utils.format(this.player.crafting.tavern.workers)
    },

    employedRatio: function () {
      return `${((this.player.crafting.tavern.workers / this.player.population) * 100).toFixed(2)}%`
    },
  }
}
</script>

<style scoped>

.item {
  width: 100%;
  padding: 0.25em;
}

.material-not-acquired {
  color: rgba(var(--wine-tone-dark), 0.5);
}

.limit-width {
  min-width: 35%;
}

</style>