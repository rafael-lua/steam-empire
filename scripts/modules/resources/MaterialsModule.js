/*
  Module for dealing with inventory logic
*/

const Module = {
  player: null, // Will be set to the player instance reference

  materials: [],

  insert: function(value) {
    this.materials = [...this.materials, value]
  },

  checkIfHas: function(value) {
    return this.materials.includes(value)
  }
}

export default Module
