/*
  Module for population related logic
*/

const Module = {
  player: null, // Will be set to the player instance reference

  citizens: 1,
  employed: 0,
  proficiency: 1,
  price: 0.01,
  happiness: 0,
  growth: 0,
  newCitizens: 0,
  competency: 1,

  savages: {
    employed: 0,
    total: 50
  },

  __UPDATE: function() {
    this.updatePopulation()
  },

  __UPDATE_DAY: function() {
    this.updateCitizens()
  },

  updatePopulation: function(isDayUpdate) {
    this.newCitizens += this.growth
  },

  updateCitizens: function() {
    // New citizens accumulated become part of the population
    const citizens = Math.floor(this.newCitizens)
    this.increasePopulation(citizens)
    if (this.player.modules.stages.isSet("savages")) {
      this.decreaseSavages(citizens)
    }
    this.newCitizens -= citizens
  },

  increasePopulation: function(value) {
    this.citizens += value
  },

  getUnemployed: function() {
    let unemployed
    if (this.player.modules.stages.isSet("savages")) {
      unemployed =
        this.citizens +
        this.savages.total -
        (this.employed + this.savages.employed)
    } else {
      unemployed = this.citizens - this.employed
    }
    return unemployed
  },

  increaseEmployed: function(value) {
    let newEmployers = value
    if (
      this.player.modules.stages.isSet("savages") &&
      this.savages.employed < 50
    ) {
      const newSavages =
        this.savages.employed + newEmployers > 50
          ? 50 - this.savages.employed
          : newEmployers
      newEmployers -= newSavages
      this.increaseSavageEmployed(newSavages)
      this.employed += newEmployers
    } else {
      this.employed += newEmployers
    }
  },

  decreaseEmployed: function(value) {
    if (
      this.player.modules.stages.isSet("savages") &&
      this.savages.employed > 0
    ) {
      let unemployAmount = value
      const unemployedSavages =
        this.savages.employed - unemployAmount >= 0
          ? unemployAmount
          : this.savages.employed
      unemployAmount -= unemployedSavages
      this.decreaseSavageEmployed(unemployedSavages)
      this.employed -= unemployAmount
    } else {
      this.employed -= value
    }
  },

  decreaseSavages: function(v) {
    this.savages.total -= v
    if (this.savages.total <= 0) {
      this.player.modules.stages.unsetStage("savages")
      this.savages.total = 0
    }
  },

  increaseSavageEmployed: function(value) {
    this.savages.employed += value
  },

  decreaseSavageEmployed: function(value) {
    this.savages.employed -= value
  },

  getCompetency: function() {
    let comp = 1

    if (this.player.modules.inventory.checkIfHas("StoneEquipment")) {
      comp += 1
    }

    return comp
  },

  getGrowth: function() {
    let grow = 0

    if (this.player.modules.crafting.isCompleted("tavern")) {
      grow += 0.01
    }

    return grow
  }
}

export default Module
