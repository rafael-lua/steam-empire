// Contains data that will not be changing in the game, only referenced by components.

export const infusionData = {
  "weak": {
    // Upgrade to median required data
    coal: 5,
    gold: 5,
    inventory: ["backpack"],

    getRequiredList: function (player) {
      const list = [
        { name: "Coal", amount: this.coal, has: (player.coal >= this.coal) },
        { name: "Gold", amount: this.gold, has: (player.gold >= this.gold) },
        { name: "Backpack", amount: null, has: (player.inventory["backpack"]) }
      ]
      return list
    },

    canUpgrade: function (player) {
      if (player.gold >= this.gold
        && player.coal >= this.coal
        && player.inventory["backpack"] === true
      ) {
        // A object list reference for the caller of the function to perform necessary actions,
        // like decreasing Gold and Coal.
        return [
          { type: "gold", value: this.gold },
          { type: "coal", value: this.coal }
        ]
      } else {
        return false
      }
    }
  }
}