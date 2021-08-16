/*
  Module for dealing with craftings logic
*/

import craftingsData from "~/scripts/data/craftingsData"

const Module = {
  player: null, // Will be set to the player instance reference
  craftingsData: craftingsData,

  status: {
    tavern: {
      workers: 0,
      progress: 0,
      completed: false
    },

    alchemyTable: {
      workers: 0,
      progress: 0,
      completed: false
    }
  },

  __UPDATE() {
    this.updateCraftings()
  },

  updateCraftings: function() {
    Object.keys(this.status).forEach(key => {
      if (!this.isCompleted(key) && this.status[key].workers > 0) {
        const price = this.getCraftCost(key)
        if (this.player.modules.resources.get("gold") >= price) {
          const workValue =
            this.player.modules.population.proficiency /
            this.craftingsData[key].complexity
          this.status[key].progress += workValue * this.status[key].workers
          if (this.status[key].progress / this.craftingsData[key].target >= 1) {
            this.status[key].completed = true
            this.resetWorkers(key)
          }
          this.player.modules.gold.decreaseGold(price)
        } else {
          // No gold, reset employed!
          this.player.modules.population.decreaseEmployed(
            this.status[key].workers
          )
          this.status[key].workers = 0
        }
      }
    })
  },

  getCraftCost: function(craft) {
    const tickCost =
      this.status[craft].workers * this.craftingsData[craft].baseCost
    return tickCost
  },

  hasMaterials: function(materials) {
    return materials.reduce((hasAll, material) => {
      if (!this.player.modules.materials.checkIfHas(material)) {
        hasAll = false
      }
      return hasAll
    }, true)
  },

  isCompleted: function(craft) {
    return this.status[craft].completed
  },

  getWorkers: function(craft) {
    return this.status[craft].workers
  },

  getProgress: function(craft) {
    return this.status[craft].progress
  },

  getCraftData: function(craft) {
    return this.craftingsData[craft]
  },

  resetWorkers: function(craft) {
    const workers = this.status[craft].workers
    if (workers > 0) {
      this.player.modules.population.decreaseEmployed(workers)
      this.status[craft].workers = 0
    }
  },

  employWorkers: function(craft) {
    const unemployed = this.player.modules.population.getUnemployed()
    if (unemployed > 0) {
      const newEmployers =
        unemployed >= this.player.amount ? this.player.amount : unemployed
      this.player.modules.population.increaseEmployed(newEmployers)
      this.status[craft].workers += newEmployers
    }
  }
}

export default Module
