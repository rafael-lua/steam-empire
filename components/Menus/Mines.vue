<template>
  <div class="mines-wrapper bg-light border-dark">
    <div class="mines">

      <div class="flex-row flex-a-center flex-j-center">
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <img src="~/assets/icons/cave-entrance.png" alt="Coal Mine Icon" class="icon-basic">
          <p class="text-500">COAL MINE</p>
          <p class="text-italic line-s">(common)</p>
        </div>
        <div class="hr-4em"></div>
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <p class="text-400 text-s1">HARDNESS</p>
          <p class="text-700">1</p>
          <p class="text-400 text-s1">COMPETENCY</p>
          <p class="text-700">1</p>
        </div>
        <div class="hr-4em"></div>
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <p class="text-400">YIELD VALUE</p>
          <p class="text-700 text-b2">
            <!-- Multiply per 10 because Yield shows daily gains -->
            {{ ((player.competency * player.mines.common.workers) / player.mines.common.hardness) * 10 }} /day
          </p>
        </div>
        <div class="hr-4em"></div>
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <p class="text-400">EMPLOYED</p>
          <p class="text-700">{{commonEmployed}}</p>
          <p class="text-500 text-italic text-s1">({{commonEmployedRatio}})</p>
        </div>
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <Button title="EMPLOY" color="blue" v-on:handler="commonEmploy">
            <p class="text-700 text-italic flex-row flex-a-center">
              <img src="~/assets/icons/mustache.png" alt="Employ Icon" class="icon-basic-mini only-right">
              {{amountCalculated}}
            </p>
          </Button>
        </div>
        <div class="flex-col flex-a-center flex-j-center pd-1x">
          <Button title="RESET" color="wine" v-on:handler="commonReset" />
        </div>
      </div>
      <hr class="hr-mg">

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

  data () {
    return {
      player: Player
    }
  },

  methods: {
    commonEmploy: function () {
      let unemployed = this.player.getUnemployed()
      if (unemployed > 0) {
        let newEmployers = (unemployed >= this.player.amount) ? this.player.amount : unemployed
        this.player.mines.common.workers += newEmployers

        if (this.player.stages.savages === true && this.player.savages.employed < 50) {
          let newSavages = ((this.player.savages.employed + newEmployers) > 50) ? (50 - this.player.savages.employed) : newEmployers
          newEmployers -= newSavages
          this.player.increaseSavageEmployed(newSavages)
          this.player.increaseEmployed(newEmployers)
        } else {
          this.player.increaseEmployed(newEmployers)
        }
      }
    },

    commonReset: function () {
      let workers = this.player.mines.common.workers
      if (workers > 0) {
        this.player.mines.common.workers = 0
        if (this.player.stages.savages === true && this.player.savages.employed > 0) {
          let unemployedSavages = ((this.player.savages.employed - workers) >= 0) ? workers : this.player.savages.employed
          workers -= unemployedSavages
          this.player.decreaseSavageEmployed(unemployedSavages)
          this.player.decreaseEmployed(workers)
        } else {
          this.player.decreaseEmployed(workers)
        }
      }
    },
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
    commonEmployed: function () {
      return utils.format(this.player.mines.common.workers)
    },
    commonEmployedRatio: function () {
      if (this.player.stages.savages === true){
        return `${((this.player.mines.common.workers / (this.player.population + this.player.savages.total)) * 100).toFixed(2)}%`
      } else {
        return `${((this.player.mines.common.workers / this.player.population) * 100).toFixed(2)}%`
      }
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