/*
  Module for dealing with inventory logic
*/

const Module = {
  player: null, // Will be set to the player instance reference

  inventory: [],

  insert: function(value) {
    this.inventory = [...this.inventory, value]
  },

  checkIfHas: function(value) {
    return this.inventory.includes(value)
  }
}

export default Module
