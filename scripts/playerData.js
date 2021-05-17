import utils from "./utils"
import { savagesData } from "~/scripts/gameData"

/* The player status and functionalities */

// The player data variables object
let properties = {
  debugMode: false,
  version: 1,

  saveDate: new Date(),

  amount: 1,

  population: 1,
  employed: 0,
  proficiency: 1,
  price: 0.01,

  competency: 1,

  coal: 0,
  capacity: 10,
  gold: 5,

  day: 1,
  month: 1,
  year: 1,
  season: "spring",
  tickRender: 0,

  inventory: {
    stoneEquiment: false,
    craftingTools: false,
    map_1: false,
    backpack: false,
  },

  stages: {
    // Initial/Dafault is all false
    market: false,
    craft: false,
    alchemy: false,
    savages: false,
    village: false
  },

  savages: {
    employed: 0
  },

  nomads: {
    sellCoal: {
      sold: 0,
      max: 50,
      value: 1
    }
  },

  mines: {
    common: {
      workers: 0,
      hardness: 10
    }
  },

  rawMaterials: {
    wood: false,
    water: false,
    barley: false
  },

  crafting: {
    tavern: {
      baseCost: 0.01,
      workers: 0,
      complexity: 100,
      progress: 0,
      target: 100,
      completed: false
    }
  },

  alchemy: {
    infusion: {
      class: "weak",
      multiplier: 1,
    },
    chrysopoeia: {
      class: "weak",
      multiplier: 1,
    }
  },

  achievementPoints: 0,
  achievements: {
    firstSteps: { progress: 0, target: 10, completed: false }
  },

  reports: {
    coalGains: { current: 0, reported: 0 },
    coalLosses: { current: 0, reported: 0 },
    goldGains: { current: 0, reported: 0 },
    goldLosses: { current: 0, reported: 0 },
    infusion: { current: 0, reported: 0 },
    chrysopoeia: { current: 0, reported: 0 },
  }
}



/* -------------------------------------------------------------------------- */
/*                           The player methods list                          */
/* -------------------------------------------------------------------------- */

let methods = {
  // Change amount
  setAmount: function (v) {
    if (isNaN(v) === false && v > 0) {
      this.amount = v
    }
  },

  // Change stage
  setStage: function (v) {
    this.stages[v] = true
  },

  // Calendar update
  updateCalendar: function () {
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

  updateTickRender: function () {
    this.tickRender += 1
    if (this.tickRender >= 100) {
      this.tickRender = 0
    }
  },

  // General methods (items is an array of objects with type/value)
  increaseAny: function (items) {
    items.forEach((item) => {
      if (item.type === "coal") {
        this.increaseCoal(item.value)
      } else if (item.type === "gold") {
        this.increaseGold(item.value)
      }
    })
  },

  decreaseAny: function (items) {
    items.forEach((item) => {
      if (item.type === "coal") {
        this.decreaseCoal(item.value)
      } else if (item.type === "gold") {
        this.decreaseGold(item.value)
      } else if (item.type === "ap") {
        this.decreaseAchievementPoints(item.value)
      }
    })
  },

  // Coal methods
  increaseCoal: function (v) {
    if (this.coal < this.capacity) {
      this.coal += v
      this.coal = utils.clamp(this.coal, 0, this.capacity)
      this.updateAchievement("firstSteps", v, "add")
    }

    this.reports.coalGains.current += v
  },

  decreaseCoal: function (v) {
    if ((this.coal - v) >= 0) {
      this.coal -= v
    }

    this.reports.coalLosses.current += v
  },

  // Gold methods
  increaseGold: function (v) {
    this.gold += v

    this.reports.goldGains.current += v
  },

  decreaseGold: function (v) {
    if ((this.gold - v) >= 0) {
      this.gold -= v
    }

    this.reports.goldLosses.current += v
  },

  // Population methods
  updatePopulation: function () {

  },

  getUnemployed: function () {
    let unemployed
    if (this.stages.savages === true) {
      unemployed = (this.population + savagesData.total) - (this.employed + this.savages.employed)
    } else {
      unemployed = this.population - this.employed
    }
    return unemployed
  },

  increaseEmployed: function (v) {
    this.employed += v
  },

  decreaseEmployed: function (v) {
    if (this.stages.savages === true && this.savages.employed > 0) {
      let unemployAmount = v
      let unemployedSavages = ((this.savages.employed - unemployAmount) >= 0) ? unemployAmount : this.savages.employed
      unemployAmount -= unemployedSavages
      this.decreaseSavageEmployed(unemployedSavages)
      this.employed -= unemployAmount
    } else {
      this.employed -= v
    }
  },

  increaseSavageEmployed: function (v) {
    this.savages.employed += v
  },

  decreaseSavageEmployed: function (v) {
    this.savages.employed -= v
  },

  // Competency update. Everytime something that affects competency is acquired, call the update method.
  // Using this instead of getCompetency so it doesn't need to run the checks every game tick.
  updateCompetency: function () {
    let comp = 1

    if (this.inventory.stoneEquiment === true) { comp += 1 }

    this.competency = comp
  },

  // Capacity update. Everytime something that affects Capacity is acquired, call the update method.
  // Using this instead of getCapacity so it doesn't need to run the checks every game tick.
  updateCapacity: function () {
    let cap = 10

    if (this.inventory.backpack === true) { cap += 15 }

    this.capacity = cap
  },

  // Common mine update
  updateCommonMine: function () {
    const price = this.mines.common.workers * this.price
    if (this.gold >= price) {
      this.increaseCoal((this.competency * this.mines.common.workers) / this.mines.common.hardness)
      if (this.coal >= 10 && this.stages.market === false) { this.setStage("market") }
      this.decreaseGold(price)
    } else {
      // No gold, reset employed!
      this.decreaseEmployed(this.mines.common.workers)
      this.mines.common.workers = 0
    }
  },

  // Nomads updates
  resetNomadCoal: function () {
    this.nomads.sellCoal.sold = 0
  },

  // Crafting functions
  updateCraftings: function () {
    Object.keys(this.crafting).forEach(key => {
      let price = this.getCraftCost(key)
      if (this.gold >= price) {
        let workValue = this.proficiency / this.crafting[key].complexity
        this.crafting[key].progress += workValue * this.crafting[key].workers
        if (this.crafting[key].progress / this.crafting[key].target >= 1) {
          this.crafting[key].completed = true
        }
        this.decreaseGold(price)
      } else {
        // No gold, reset employed!
        this.decreaseEmployed(this.crafting[key].workers)
        this.crafting[key].workers = 0
      }
    })
  },

  getCraftCost: function (c) {
    let tickCost = this.crafting[c].workers * this.crafting[c].baseCost
    return tickCost
  },

  hasMaterials: function (materials) {
    return materials.reduce((hasAll, material) => {
      if (this.rawMaterials[material] === false) {
        hasAll = false
      }
      return hasAll
    }, true)
  },

  // Alchemy functions
  // Alchemy update. Everytime something that affects competency is acquired, call the update method.
  // Using this instead of getCompetency so it doesn't need to run the checks every game tick.
  calculateAlchemy: function () {
    let infusionMult = 1
    let chrysopoeiaMult = 1

    if (this.alchemy.infusion.class === "median") { infusionMult += 1 }
    if (this.alchemy.chrysopoeia.class === "median") { chrysopoeiaMult += 1 }

    this.alchemy.infusion.multiplier = infusionMult
    this.alchemy.chrysopoeia.multiplier = chrysopoeiaMult
  },

  // The upgrade requirement check happens on the component level.
  upgradeAlchemy: function (a) {

    switch (this.alchemy[a].class) {
      case "weak": {
        this.alchemy[a].class = "median"
        break
      }
      default:
        break
    }

    this.calculateAlchemy()
  },


  // Achievements functions
  // Achivements are either increment or set value for its progress. The update should be called anywhere
  // that can affect the achievement progress.
  updateAchievement: function (name, value, method) {
    let achievement = this.achievements[name]
    if (achievement.completed === false) {

      if (method === "set") {
        achievement.progress = value
      } else if (method === "add") {
        achievement.progress += value
      }

      if (achievement.progress / achievement.target >= 1) {
        achievement.completed = true
        this.achievementPoints += 1
      }

    }
  },

  decreaseAchievementPoints: function (v) {
    return this.achievementPoints -= v
  },

  // Report the gains per tick accumulatted in the current accumulator
  updateReports: function () {
    (Object.keys(this.reports)).forEach((key) => {
      this.reports[key].reported = this.reports[key].current
      this.reports[key].current = 0
    })
  }
}

// Construct the player object
const Player = {
  ...properties,
  ...methods
}

export default Player