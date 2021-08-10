/*
  Module for setting/unsetting stages, and any other possible stage logic.
*/

const Module = {
  player: null, // Will be set to the player instance reference

  stages: {
    market: false,
    craft: false,
    alchemy: false,
    savages: false,
    village: false,
    autoAlchemy: false
  },

  setStage: function(stage) {
    this.stages[stage] = true
  },

  unsetStage: function(stage) {
    this.stages[stage] = false
  },

  isSet: function(stage) {
    return this.stages[stage]
  }
}

export default Module
