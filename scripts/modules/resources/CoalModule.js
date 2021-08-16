/*
  Module for dealing with coal related logic
*/

import utils from "~/scripts/utils"

const Module = {
  player: null, // Will be set to the player instance reference

  amount: 0,
  baseCapacity: 10,

  // Coal methods
  increaseCoal: function(value) {
    const currentCapacity = this.getCapacity()
    if (this.amount < currentCapacity) {
      this.amount += value
      this.amount = utils.clamp(this.amount, 0, currentCapacity)
      this.player.modules.achievement.updateAchievement(
        "firstSteps",
        value,
        "add"
      )
    }

    this.player.modules.report.register("coalGains", value)
  },

  decreaseCoal: function(value) {
    if (this.amount - value >= 0) {
      this.amount -= value
    } else {
      this.amount = 0
    }

    this.player.modules.report.register("coalLosses", value)
  },

  getCapacity: function() {
    let cap = this.baseCapacity

    if (this.player.modules.inventory.checkIfHas("backpack")) {
      cap += 15
    }

    return cap
  }
}

export default Module
