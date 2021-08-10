/*
  Module for general resources helpers and logic.
*/

const Module = {
  player: null, // Will be set to the player instance reference

  get: function(type) {
    if (type === "coal") {
      return this.player.modules.coal.amount
    } else if (type === "gold") {
      return this.player.modules.gold.amount
    } else if (type === "ap") {
      return this.player.modules.achievement.points
    } else if (type === "population") {
      return this.player.modules.population.citizens
    }
  },

  increase: function(type, value) {
    if (type === "coal") {
      return this.player.modules.coal.increaseCoal(value)
    } else if (type === "gold") {
      return this.player.modules.gold.increaseGold(value)
    } else if (type === "ap") {
      return this.player.modules.achievement.increasePoints(value)
    }
  },

  decrease: function(type, value) {
    if (type === "coal") {
      return this.player.modules.coal.decreaseCoal(value)
    } else if (type === "gold") {
      return this.player.modules.gold.decreaseGold(value)
    }
  }
}

export default Module
