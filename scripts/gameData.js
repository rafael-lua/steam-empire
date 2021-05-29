// Contains data that will not be changing in the game, only referenced by components.

export const infusionData = {
  popupMessage: "Through very unique chemicals reactions, the alchemist is capable of generating coal from less valuable materials, such as rocks and dirt.",
  rawValue: 10, // Manual gains
  rawTick: 0.01, // Manual speed per tick for the progress
  "weak": {
    // Upgrade to median required data
    coal: 25,
    ap: 5,
    inventory: ["backpack"],

    getRequiredList: function (player) {
      const list = [
        { name: "Coal", amount: this.coal, has: (player.coal >= this.coal) },
        { name: "AP", amount: this.ap, has: (player.achievementPoints >= this.ap) },
        { name: "Backpack", amount: null, has: (player.inventory["backpack"]) }
      ]
      return list
    },

    canUpgrade: function (player) {
      if (player.achievementPoints >= this.ap
        && player.coal >= this.coal
        && player.inventory["backpack"] === true
      ) {
        // A object list reference for the caller of the function to perform necessary actions,
        // like decreasing Gold and Coal.
        return [
          { type: "ap", value: this.ap },
          { type: "coal", value: this.coal }
        ]
      } else {
        return false
      }
    }
  }
}

export const chrysopoeiaData = {
  popupMessage: "Through very unique chemicals reactions, the alchemist is capable of converting coal to pure gold.",
  rawValue: 0, // Manual gains
  rawTick: 0, // Manual speed per tick for the progress
}

// Shop methods like "sell/buy" or extra aspects need to be dealed in the component level
// Minimum required: popupmessage, title and value.
export const nomadData = {
  sellCoal: {
    popupMessage: "Sell a limited amount of coal to a traveling nomad. Resets every 7 days",
    title: "Coal",
    value: 1,
    max: 50,
  },
  stoneEquipment: {
    popupMessage: "Increases overall competency of collecting coal by 1",
    title: "Stone\nEquipment",
    value: 10
  },
  map_1: {
    popupMessage: "Acquire knowledge of the surroundings, revealing all types of useful information, materials and possibilities",
    title: "Map #1",
    value: 50
  },
  craftingTools: {
    popupMessage: "Open the crafting capability, allowing the construction of buildings and instruments",
    title: "Crafting\nTools",
    value: 50
  },
  backpack: {
    popupMessage: "Increases the total capacity by 15",
    title: "Backpack",
    value: 25
  },
}

export const craftingsData = {
  tavern: {
    title: "Tavern",
    name: "tavern",
    popupMessage: "A small tavern with beer and accommodations. Travelers may want to stay permanently and they will be available for hiring. Population growth +1",
    icon: "tavern-sign",
    baseCost: 0.01,
    complexity: 100,
    target: 100,
    materials: ["water", "wood", "barley"]
  },
  alchemyTable: {
    title: "Alchemy Table",
    name: "alchemyTable",
    popupMessage: "",
    icon: "microscope",
    baseCost: 0.01,
    complexity: 100,
    target: 10,
    materials: ["wood"],
    task: "alchemy_table_completed"
  },
}