/*
  Module for controlling the game time logic and updates.
  Also, the main module, as it calls all other modules update functions.
*/

const Module = {
  player: null, // Will be set to the player instance reference

  clock: 0,
  weekDay: 1,

  updateTick: function() {
    let isDayUpdate = false
    let isWeekUpdate = false

    this.clock += 1

    if (this.clock >= 100) {
      // Completed day updates (= 10 wheels)
      this.weekDay += 1
      this.clock = 0

      isDayUpdate = true
    }

    if (this.weekDay === 7) {
      // Completed week updates
      this.weekDay = 1
      isWeekUpdate = true
    }

    // Call the updates methods in all modules that have it
    Object.keys(this.player.modules).forEach(key => {
      // Daily update method
      if (
        Object.prototype.hasOwnProperty.call(
          this.player.modules[key],
          "__UPDATE_DAY"
        ) &&
        isDayUpdate
      ) {
        this.player.modules[key].__UPDATE_DAY()
      }

      // Weekly update method
      if (
        Object.prototype.hasOwnProperty.call(
          this.player.modules[key],
          "__UPDATE_WEEK"
        ) &&
        isWeekUpdate
      ) {
        this.player.modules[key].__UPDATE_WEEK()
      }

      // Normal tick update method
      if (
        Object.prototype.hasOwnProperty.call(
          this.player.modules[key],
          "__UPDATE"
        )
      ) {
        this.player.modules[key].__UPDATE()
      }
    })
  }
}

export default Module
