/*
  Module for dealing with gold related logic
*/

const Module = {
  player: null, // Will be set to the player instance reference

  amount: 5,

  // Gold methods
  increaseGold: function(value) {
    this.amount += value

    this.player.modules.report.register("goldGains", value)
  },

  decreaseGold: function(value) {
    if (this.amount - value >= 0) {
      this.amount -= value
    } else {
      this.amount = 0
    }

    this.player.modules.report.register("goldLosses", value)
  }
}

export default Module
