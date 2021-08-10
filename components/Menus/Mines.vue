<template>
  <div class="mines-wrapper bg-light border-dark">
    <div class="mines">
      <div class="flex-row flex-a-center flex-j-center">
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <img
            src="~/assets/icons/cave-entrance.png"
            alt="Coal Mine Icon"
            class="icon-basic"
          />
          <p class="text-500">COAL MINE</p>
          <p class="text-italic line-s">(common)</p>
        </div>
        <div class="hr-4em"></div>
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <p class="text-400 text-s1">HARDNESS</p>
          <p class="text-700">{{ getHardness("common") }}</p>
          <p class="text-400 text-s1">COMPETENCY</p>
          <p class="text-700">{{ competency }}</p>
        </div>
        <div class="hr-4em"></div>
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <p class="text-400">YIELD VALUE</p>
          <p class="text-700 text-b2">{{ getYieldValue("common") }} /sec</p>
        </div>
        <div class="hr-4em"></div>
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <p class="text-400">EMPLOYED</p>
          <p class="text-700">{{ getWorkers("common") }}</p>
          <p class="text-500 text-italic text-s1">
            ({{ getWorkersRatio("common") }})
          </p>
        </div>
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <Button title="EMPLOY" color="blue" v-on:handler="employ('common')">
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
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <Button title="RESET" color="wine" v-on:handler="reset('common')" />
        </div>
      </div>
      <hr class="hr-mg" />
    </div>
  </div>
</template>

<script>
import Player from "~/scripts/playerData"
import utils from "~/scripts/utils"
import Button from "../elements/Button"

export default {
  name: "Mines",

  components: {
    Button
  },

  data() {
    return {
      player: Player
    }
  },

  computed: {
    competency: function() {
      return this.player.modules.population.competency
    },

    amountCalculated: function() {
      const unemployed = this.player.modules.population.getUnemployed()
      if (unemployed === 0) {
        return 0
      } else {
        return utils.format(
          unemployed >= this.player.amount ? this.player.amount : unemployed
        )
      }
    }
  },

  methods: {
    formatedValue: function(v) {
      return utils.format(v)
    },

    employ: function(mine) {
      this.player.modules.mines.employ(mine)
    },

    reset: function(mine) {
      this.player.modules.mines.reset(mine)
    },

    getWorkers: function(mine) {
      return this.formatedValue(this.player.modules.mines.getWorkers(mine))
    },

    getHardness: function(mine) {
      return this.formatedValue(this.player.modules.mines.getHardness(mine))
    },

    getWorkersRatio: function(mine) {
      return this.player.modules.mines.getWorkersRatio(mine)
    },

    getYieldValue: function(mine) {
      return this.formatedValue(this.player.modules.mines.getYieldValue(mine))
    }
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
