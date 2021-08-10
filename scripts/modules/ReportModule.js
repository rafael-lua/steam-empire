/*
  Module for reportings of resources
*/

const Module = {
  player: null, // Will be set to the player instance reference

  reports: {
    coalGains: { current: 0, reported: 0 },
    coalLosses: { current: 0, reported: 0 },
    goldGains: { current: 0, reported: 0 },
    goldLosses: { current: 0, reported: 0 },
    infusion: { current: 0, reported: 0 },
    chrysopoeia: { current: 0, reported: 0 }
  },

  __UPDATE: function() {
    this.updateReports()
  },

  // Report the gains per tick accumulatted in the current tick
  updateReports: function() {
    Object.keys(this.reports).forEach(key => {
      this.reports[key].reported = this.reports[key].current
      this.reports[key].current = 0
    })
  },

  register: function(name, value) {
    this.reports[name].current += value
  },

  getCurrent: function(report) {
    return this.reports[report].current
  },

  getReported: function(report) {
    return this.reports[report].reported
  }
}

export default Module
