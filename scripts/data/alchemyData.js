export const classList = ["weak", "median", "strong", "refined", "caotic"]

export const infusionData = {
  popupMessage:
    "Through very unique chemicals reactions, the alchemist is capable of generating coal from less valuable materials, such as rocks and dirt.",
  rawValue: 1, // Manual gains
  rawTick: 0.05, // Manual speed per tick for the progress
  classes: {
    median: {
      required: [
        { type: "resource", identifier: "coal", name: "Coal", value: 25 },
        { type: "resource", identifier: "ap", name: "AP", value: 5 },
        {
          type: "inventory",
          identifier: "backpack",
          name: "Backpack",
          value: null
        }
      ]
    }
  }
}

export const chrysopoeiaData = {
  popupMessage:
    "Through very unique chemicals reactions, the alchemist is capable of converting coal to pure gold.",
  rawValue: 5, // Manual gains
  rawTick: 0.01, // Manual speed per tick for the progress
  costValue: 15, // Manual cost
  classes: {
    median: {
      required: [
        { type: "resource", identifier: "coal", name: "Coal", value: 15 },
        { type: "resource", identifier: "gold", name: "Gold", value: 10 },
        { type: "resource", identifier: "ap", name: "AP", value: 5 },
        {
          type: "inventory",
          identifier: "backpack",
          name: "Backpack",
          value: null
        }
      ]
    }
  }
}
