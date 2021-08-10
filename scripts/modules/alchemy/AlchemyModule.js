/*
  Module for dealing with alchemy logic.
*/

import {
  infusionData,
  chrysopoeiaData,
  classList
} from "~/scripts/data/alchemyData"

const Module = {
  player: null, // Will be set to the player instance reference

  data: {
    infusion: infusionData,
    chrysopoeia: chrysopoeiaData,
    classList: classList
  },

  status: {
    infusion: {
      class: 0,
      multiplier: 1,
      manualTick: 0,
      manualState: false
    },
    chrysopoeia: {
      class: 0,
      multiplier: 1,
      manualTick: 0,
      manualState: false
    }
  },

  __UPDATE: function() {
    this.updateAlchemy()
  },

  updateAlchemy: function() {
    if (!this.player.modules.stages.isSet("autoAlchemy")) {
      if (this.status.infusion.manualState === true) {
        this.status.infusion.manualTick += this.data["infusion"].rawTick
        if (this.status.infusion.manualTick >= 1) {
          this.setManualState("infusion", false)
          this.status.infusion.manualTick = 0
          this.increaseCoal(this.data["infusion"].rawValue)
        }
      }

      if (this.status.chrysopoeia.manualState === true) {
        this.status.chrysopoeia.manualTick += this.data["chrysopoeia"].rawTick
        if (this.status.chrysopoeia.manualTick >= 1) {
          this.setManualState("chrysopoeia", false)
          this.status.chrysopoeia.manualTick = 0
          this.increaseGold(this.data["chrysopoeia"].rawValue)
        }
      }
    }
  },

  setManualState: function(type, value) {
    this.status[type].manualState = value
  },

  getAlchemyData: function(type) {
    return this.data[type]
  },

  getManualTick: function(type) {
    return this.status[type].manualTick
  },

  getManualState: function(type) {
    return this.status[type].manualState
  },

  getClassName: function(type) {
    return this.data.classList[this.status[type].class]
  },

  isClassMaxed: function(type) {
    return !(this.status[type].class + 1 < this.data.classList.length - 1)
  },

  getMultiplier: function(type) {
    return this.status[type].multiplier
  },

  getRequiredListForNextClass: function(type) {
    if (!this.isClassMaxed(type)) {
      const nextClass = this.getClassName(this.status[type].class + 1)
      const classData = this.data[type].classes[nextClass]
      const list = [...classData.required]

      Object.keys(classData).forEach(key => {
        list[key].has =
          classData[key].type === "resource"
            ? this.player.modules.resources.get(classData[key].identifier) >=
              classData[key].value
            : this.player.modules.inventory.checkIfHas(
                classData[key].identifier // eslint-disable-line
              ) // eslint-disable-line
      })

      return list
    } else {
      return null
    }
  },

  canUpgrade: function(type) {
    const requiredList = this.getRequiredListForNextClass(type)
    const hasAllRequirements = requiredList.reduce((acc, item) => {
      if (!item.has) {
        acc = false
      }
      return acc
    }, true)

    if (hasAllRequirements) {
      // A object list reference for the caller of the function to perform necessary actions,
      // like decreasing Gold and Coal.
      return [true, requiredList]
    } else {
      return [false, null]
    }
  },

  upgrade: function(type, costList) {
    if (!this.isClassMaxed(type)) {
      costList.forEach(item => {
        this.player.modules.resources.decrease(item.identifier, item.value)
      })
      this.status[type].class++
    }
  }
}

export default Module
