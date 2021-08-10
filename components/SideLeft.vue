<template>
  <div class="side-left bg-light border-dark noselect">
    <p class="text-b1 text-700 text-italic text-center">
      CITY STATUS
    </p>
    <p class="flex-row flex-a-center">
      <img
        src="~/assets/icons/mustache.png"
        alt="Population Icon"
        class="icon-basic-small only-right"
      />
      Population:
      <span class="info-value text-500">
        {{ population }}
        <span v-if="isStageSet('savages')" class="text-s1">
          + {{ totalOfSavages }}</span
        >
      </span>
    </p>
    <p class="flex-row flex-a-center">
      <img
        src="~/assets/icons/farmer.png"
        alt="Farmer Icon"
        class="icon-basic-small only-right"
      />
      Employed:
      <span class="info-value text-500">
        {{ employed }}
        <span v-if="isStageSet('savages')" class="text-s1">
          + {{ employedSavages }}</span
        >
      </span>
    </p>
    <p class="flex-row flex-a-center text-s2">
      <span class="mg-left-05">\_ Ratio:</span>
      <span class="info-value text-500">({{ employedPercentage() }})</span>
    </p>
    <p class="flex-row flex-a-center">
      <img
        src="~/assets/icons/brain.png"
        alt="Proficiency Icon"
        class="icon-basic-small only-right"
      />
      Proficiency:
      <span class="info-value text-500">{{ proficiency }}</span>
    </p>
    <p class="flex-row flex-a-center">
      <img
        src="~/assets/icons/teleport.png"
        alt="Competency Icon"
        class="icon-basic-small only-right"
      />
      Competency:
      <span class="info-value text-500">{{ competency }}</span>
    </p>
    <p class="flex-row flex-a-center">
      <img
        src="~/assets/icons/two-coins.png"
        alt="Gold Icon"
        class="icon-basic-small only-right"
      />
      Gold:
      <span class="info-value text-500">{{ gold }}</span>
    </p>
    <p class="flex-row flex-a-center">
      <img
        src="~/assets/icons/coal-wagon.png"
        alt="Coal Icon"
        class="icon-basic-small only-right"
      />
      Coal:
      <span class="info-value text-500">{{ coal }}</span>
    </p>
    <p class="flex-row flex-a-center text-s2">
      <span class="mg-left-05">\_ Ratio:</span>
      <span class="info-value text-500">({{ coalPercentage() }})</span>
    </p>
    <p class="flex-row flex-a-center">
      <img
        src="~/assets/icons/cargo-crate.png"
        alt="Capacity Icon"
        class="icon-basic-small only-right"
      />
      Capacity:
      <span class="info-value text-500">{{ capacity }}</span>
    </p>
    <hr />
    <p class="text-b1 text-700 text-italic text-center">
      REPORTINGS
    </p>
    <p class="flex-row flex-a-center">
      <img
        src="~/assets/icons/two-coins.png"
        alt="Gold Icon"
        class="icon-basic-small only-right"
      />
      Gold gains:
      <span class="info-value text-500 text-green">{{ goldGains }} /s</span>
    </p>
    <p class="flex-row flex-a-center">
      <img
        src="~/assets/icons/two-coins.png"
        alt="Gold Icon"
        class="icon-basic-small only-right"
      />
      Gold losses:
      <span class="info-value text-500 text-red">{{ goldLosses }} /s</span>
    </p>
    <p class="flex-row flex-a-center">
      <img
        src="~/assets/icons/coal-wagon.png"
        alt="Coal Icon"
        class="icon-basic-small only-right"
      />
      Coal gains:
      <span class="info-value text-500 text-green">{{ coalGains }} /s</span>
    </p>
    <p class="flex-row flex-a-center">
      <img
        src="~/assets/icons/coal-wagon.png"
        alt="Coal Icon"
        class="icon-basic-small only-right"
      />
      Coal losses:
      <span class="info-value text-500 text-red">{{ coalLosses }} /s</span>
    </p>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"

export default {
  name: "SideLeft",

  data() {
    return {
      player: Player
    }
  },

  computed: {
    population: function() {
      return this.formatedValue(this.player.modules.population.citizens)
    },

    totalOfSavages: function() {
      return this.player.modules.population.savages.total
    },

    employed: function() {
      return this.formatedValue(this.player.modules.population.employed)
    },

    employedSavages: function() {
      return this.formatedValue(this.player.modules.population.savages.employed)
    },

    proficiency: function() {
      return this.formatedValue(this.player.modules.population.proficiency)
    },

    competency: function() {
      return this.formatedValue(this.player.modules.population.competency)
    },

    coal: function() {
      return this.formatedValue(this.player.modules.resources.get("coal"))
    },

    capacity: function() {
      return this.formatedValue(this.player.modules.coal.capacity)
    },

    gold: function() {
      return this.formatedValue(this.player.modules.resources.get("gold"))
    },

    coalGains: function() {
      return this.formatedValue(
        this.player.modules.report.getReported("coalGains")
      )
    },

    coalLosses: function() {
      return this.formatedValue(
        this.player.modules.report.getReported("coalLosses")
      )
    },

    goldGains: function() {
      return this.formatedValue(
        this.player.modules.report.getReported("goldGains")
      )
    },

    goldLosses: function() {
      return this.formatedValue(
        this.player.modules.report.getReported("goldLosses")
      )
    }
  },

  methods: {
    coalPercentage: function() {
      return (
        (
          (this.player.modules.resources.get("coal") /
            this.player.modules.coal.capacity) *
          100
        ).toFixed(2) + "%"
      )
    },

    employedPercentage: function() {
      if (this.isStageSet("savages")) {
        return (
          (
            ((this.player.modules.population.employed +
              this.player.modules.population.savages.employed) /
              (this.player.modules.population.citizens +
                this.player.modules.population.savages.total)) *
            100
          ).toFixed(2) + "%"
        )
      } else {
        return (
          (
            (this.player.modules.population.employed /
              this.player.modules.population.citizens) *
            100
          ).toFixed(2) + "%"
        )
      }
    },

    formatedValue: function(v) {
      return utils.format(v)
    },

    isStageSet: function(stage) {
      return this.player.modules.stages.isSet(stage)
    }
  }
}
</script>

<style scoped>
.side-left {
  margin: 0 0 0.5em 0.5em;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
}
</style>
