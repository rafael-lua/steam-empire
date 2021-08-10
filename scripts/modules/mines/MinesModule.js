/*
  Module for dealing with common mine logic
*/

const Module = {
  player: null, // Will be set to the player instance reference

  status: { common: { workers: 0, hardness: 25 } },

  __UPDATE: function() {
    this.updateMines()
  },

  updateMines: function() {
    Object.keys(status).forEach(key => {
      const price =
        this.status[key].workers * this.player.modules.population.price

      if (this.player.modules.gold.amount >= price) {
        this.player.modules.coal.increaseCoal(
          (this.player.modules.population.competency *
            this.status[key].workers) /
            this.status[key].hardness
        )
        if (
          this.player.modules.resources.get("coal") >= 10 &&
          !this.player.stages.isSet("market")
        ) {
          this.player.modules.stages.setStage("market")
        }
        this.player.modules.gold.decreaseGold(price)
      } else {
        // No gold, reset employed!
        this.player.modules.population.decreaseEmployed(
          this.status[key].workers
        )
        this.status[key].workers = 0
      }
    })
  },

  getWorkers: function(mine) {
    return this.status[mine].workers
  },

  getHardnesss: function(mine) {
    return this.status[mine].hardness
  },

  getWorkersRatio: function(mine) {
    if (this.player.modules.stages.isSet("savages")) {
      return `${(
        (this.getWorkers(mine) /
          (this.player.modules.population.citizens +
            this.player.modules.population.savages.total)) *
        100
      ).toFixed(2)}%`
    } else {
      return `${(
        (this.getWorkers(mine) / this.player.modules.population.citizens) *
        100
      ).toFixed(2)}%`
    }
  },

  getYieldValue: function(mine) {
    return (
      ((this.player.modules.population.competency * this.getWorkers(mine)) /
        this.getHardnesss(mine)) *
      10
    )
  },

  employ: function(mine) {
    const unemployed = this.player.modules.population.getUnemployed()
    if (unemployed > 0) {
      let newEmployers =
        unemployed >= this.player.amount ? this.player.amount : unemployed
      this.status[mine].workers += newEmployers

      if (
        this.player.stages.isSet("savages") &&
        this.player.modules.population.savages.employed < 50
      ) {
        const newSavages =
          this.player.modules.population.savages.employed + newEmployers > 50
            ? 50 - this.player.modules.population.savages.employed
            : newEmployers
        newEmployers -= newSavages
        this.player.modules.population.increaseSavageEmployed(newSavages)
        this.player.modules.population.increaseEmployed(newEmployers)
      } else {
        this.player.modules.population.increaseEmployed(newEmployers)
      }
    }
  },

  reset: function(mine) {
    let workers = this.status[mine].workers
    if (workers > 0) {
      this.status[mine].workers = 0
      if (
        this.player.stages.isSet("savages") &&
        this.player.modules.population.savages.employed > 0
      ) {
        const unemployedSavages =
          this.player.modules.population.savages.employed - workers >= 0
            ? workers
            : this.player.modules.population.savages.employed
        workers -= unemployedSavages
        this.player.modules.population.decreaseSavageEmployed(unemployedSavages)
        this.player.modules.population.decreaseEmployed(workers)
      } else {
        this.player.modules.population.decreaseEmployed(workers)
      }
    }
  }
}

export default Module
