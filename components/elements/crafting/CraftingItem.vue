<template>
  <div class="item flex-col border-dark mg-bottom-05">
    <div class="flex-row flex-a-center flex-j-evenly">
      <div
        class="flex-col flex-a-center flex-j-center mg-1x hover-highlight"
        v-on:mouseover="togglePopup('on', crafting.popupMessage)"
        v-on:mouseleave="togglePopup('off', null)"
      >
        <p class="text-500">{{ crafting.title.toUpperCase() }}</p>
        <img
          v-bind:src="require(`~/assets/icons/${crafting.icon}.png`)"
          v-bind:alt="`${crafting.title} icon`"
          class="icon-basic"
        />
      </div>
      <div class="flex-col flex-a-center flex-j-center">
        <p class="text-400">WORK VALUE</p>
        <p class="text-700">{{ workValue }}</p>
      </div>
      <div class="flex-col flex-a-center limit-width">
        <p class="text-400 flex-row flex-a-center text-s1">
          BASE COST
          <CoinFormat
            ><span class="text-700">{{ crafting.baseCost }}</span></CoinFormat
          >
        </p>
        <hr />
        <p class="text-400 text-center">
          <span class="text-italic">
            COMPLEXITY:
            <span class="text-500">{{ crafting.complexity }}</span></span
          >
        </p>
        <p class="text-400">
          PROGRESS:
          <span class="text-700"
            ><span class="text-green">{{ progress }}</span> /
            {{ crafting.target }}</span
          >
        </p>
      </div>
    </div>
    <hr class="hr-75 hr-mg" />
    <div class="flex-row flex-a-center flex-j-evenly">
      <div class="flex-col flex-a-center">
        <p class="text-400">EMPLOYED</p>
        <p class="text-700">{{ employed }}</p>
        <p class="text-500 text-italic text-s1">({{ employedRatio }})</p>
      </div>
      <div class="flex-col flex-a-center flex-j-center">
        <Button title="EMPLOY" color="blue" v-on:handler="employWorkers">
          <p class="text-700 text-italic flex-row flex-a-center">
            <img
              src="~/assets/icons/mustache.png"
              alt="Employ Icon"
              class="icon-basic-mini only-right"
            />
            {{ amountCalculated }}
          </p>
        </Button>
      </div>
      <div class="flex-col flex-a-center flex-j-center">
        <Button title="RESET" color="wine" v-on:handler="resetWorkers" />
      </div>
      <div class="hr-4em"></div>
      <div class="flex-col flex-a-center flex-j-center">
        <p class="text-400">DAILY COST</p>
        <CoinFormat
          ><span class="text-700">{{ dailyCost }}</span></CoinFormat
        >
      </div>
      <div class="hr-4em"></div>
      <div class="flex-col flex-a-center flex-j-center">
        <p class="text-400">MATERIALS REQUIRED</p>
        <p
          v-for="m in crafting.materials"
          v-bind:key="m"
          class="text-s2 text-700 pd-05x"
          v-bind:class="materialNotAcquired(m)"
        >
          {{ m.toUpperCase() }}
        </p>
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
  name: "CraftingItem",

  components: {
    CoinFormat,
    Button
  },

  props: {
    crafting: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      player: Player
    }
  },

  methods: {
    formatedValue: function(v) {
      return utils.format(v)
    },

    materialNotAcquired: function(m) {
      return this.player.modules.materials.checkIfHas(m)
        ? null
        : { "material-not-acquired": true }
    },

    employWorkers: function() {
      const canCraft = this.player.modules.craftings.hasMaterials(
        this.crafting.materials
      )
      if (canCraft === true) {
        this.player.modules.craftings.employWorkers(this.crafting.name)
      }
    },

    resetWorkers: function() {
      this.player.modules.craftings.resetWorkers(this.crafting.name)
    },

    togglePopup: function(e, t) {
      if (e === "on") {
        utils.popup.text = t
        utils.popup.hovered = true
      } else {
        utils.popup.hovered = false
      }
    }
  },

  computed: {
    amountCalculated: function() {
      const unemployed = this.player.modules.population.getUnemployed()
      if (unemployed === 0) {
        return 0
      } else {
        return this.formatedValue(
          unemployed >= this.player.amount ? this.player.amount : unemployed
        )
      }
    },

    progress: function() {
      const p = (
        (this.player.modules.craftings.getProgress(this.crafting.name) /
          this.crafting.target) *
        100
      ).toFixed(2)
      return `${this.player.modules.craftings
        .getProgress(this.crafting.name)
        .toFixed(2)} (${p}%)`
    },

    workValue: function() {
      const workValue = (
        this.player.modules.population.proficiency / this.crafting.complexity
      ).toFixed(2)
      return `${(
        workValue *
        10 *
        this.player.modules.craftings.getWorkers(this.crafting.name)
      ).toFixed(2)} /s`
    },

    dailyCost: function() {
      return this.formatedValue(
        this.player.modules.craftings.getCraftCost(this.crafting.name) * 100
      )
    },

    employed: function() {
      return this.formatedValue(
        this.player.modules.craftings.getworkers(this.crafting.name)
      )
    },

    employedRatio: function() {
      return `${(
        (this.player.modules.craftings.getworkers(this.crafting.name) /
          this.player.modules.population.citizens) *
        100
      ).toFixed(2)}%`
    }
  }
}
</script>

<style scoped>
.item {
  width: 100%;
  padding: 0.25em;
  background-color: rgba(0, 0, 0, 0.075);
}

.material-not-acquired {
  color: rgba(var(--wine-tone-dark), 0.5);
}

.limit-width {
  min-width: 35%;
}
</style>
