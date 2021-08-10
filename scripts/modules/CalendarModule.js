/*
  Module for controlling the in game calendar logic.
*/

const Module = {
  player: null, // Will be set to the player instance reference

  day: 1,
  month: 1,
  year: 1,
  season: "spring",
  tickRender: 0, // Important for setting up the wheels progress on the game header

  __UPDATE: function() {
    this.updateTickRender()
  },

  __UPDATE_DAY: function() {
    this.updateCalendar()
  },

  updateTickRender: function() {
    this.tickRender += 1
    if (this.tickRender >= 100) {
      this.tickRender = 0
    }
  },

  updateCalendar: function() {
    this.day += 1
    if (this.day > 30) {
      this.day = 1
      this.month += 1

      if (this.month > 12) {
        this.month = 1
        this.year += 1
      }

      switch (this.month) {
        case 1:
          this.season = "spring"
          break
        case 4:
          this.season = "summer"
          break
        case 7:
          this.season = "autumn"
          break
        case 10:
          this.season = "winter"
          break
      }
    }
  },

  getCalendar: function() {
    return {
      day: this.day,
      month: this.month,
      year: this.year,
      season: this.season
    }
  }
}

export default Module
