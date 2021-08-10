/*
  Module for dealing with nomads logic
*/

import nomadData from "~/scripts/data/nomadData"

const Module = {
  player: null, // Will be set to the player instance reference
  nomadData: nomadData,

  coalSelling: {
    sold: 0
  },

  __UPDATE_WEEK: function() {
    this.resetNomadCoal()
  },

  increaseCoalSold: function(value) {
    this.coalSelling.sold += value
  },

  resetNomadCoal: function() {
    this.coalSelling.sold = 0
  },

  getNomadData: function(item) {
    return this.nomadData[item]
  }
}

export default Module
