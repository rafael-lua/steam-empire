// Contains data that will not be changing in the game, only referenced by components.

export const savagesData = {
  total: 50
}

export const infusionData = {
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
    materials: ["wood"]
  },
}