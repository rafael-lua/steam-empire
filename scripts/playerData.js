import utils from "./utils";

/* The player status and functionalities */

// The player data variables object
let properties = {
  debugValue: 0,

  amount: 1,

  population: 1,
  employed: 0,

  competency: 1,

  coal: 0,
  capacity: 10,
  gold: 0,

  day: 1,
  month: 1,
  year: 1,
  season: "spring",
  tickRender: 0,

  inventory: {
    stoneEquiment: false,
    craftingTools: false,
    map_1: false
  },

  stages: {
    market: false,
    craft: false,
    alchemy: false,
    savage: false,
  },

  nomads: {
    sellCoal: {
      sold: 0,
      max: 100,
      value: 1
    }
  },

  mines: {
    common: {
      workers: 0,
      hardness: 1
    }
  }
}

// The player methods list
let methods = {
  // Change amount
  setAmount: function(v) {
    if(isNaN(v) === false && v > 0) {
      this.amount = v;
    }
  },

  // Change stage
  setStage: function(v) {
    this.stages[v] = true;
  },

  // Calendar update
  updateCalendar: function() {
    this.day += 1;
    if(this.day > 30) {
      this.day = 1;
      this.month += 1;

      if(this.month > 12) {
        this.month = 1;
        this.year += 1;
      }

      switch(this.month) {
        case 1:
          this.season = "spring";
          break;
        case 4:
          this.season = "summer";
          break;
        case 7:
          this.season = "autumn";
          break;
        case 10:
          this.season = "winter";
          break;
      }
    }
  },

  updateTickRender: function() {
    this.tickRender += 1;
    if(this.tickRender >= 100) {
      this.tickRender = 0;
    }
  },

  // Coal methods
  increaseCoal: function(v) {
    if(this.coal < this.capacity) {
      this.coal += v;
      this.coal = utils.clamp(this.coal, 0, this.capacity);
    }
  },

  decreaseCoal: function(v) {
    if((this.coal - v) >= 0) {
      this.coal -= v;
    }
  },

  // Gold methods
  increaseGold: function(v) {
    this.gold += v;
  },

  decreaseGold: function(v) {
    if((this.gold - v) >= 0) {
      this.gold -= v;
    }
  },

  // Population calculations
  getUnemployed: function() {
    return this.population - this.employed;
  },

  increaseEmployed: function(v) {
    return this.employed += v;
  },

  decreaseEmployed: function(v) {
    return this.employed -= v;
  },

  // Competency update. Everytime something that affects competency is acquired, call the update method.
  // Using this instead of getCompetency so it doesn't need to run the checks every game tick.
  updateCompetency: function() {
    let comp = 1;

    if(this.inventory.stoneEquiment === true) { comp += 1; }

    this.competency = comp;
  },

  // Common mine update
  updateCommonMine: function() {
    this.increaseCoal((this.competency * this.mines.common.workers) / this.mines.common.hardness);
    if(this.coal >= 10 && this.stages.market === false){ this.setStage("market"); }
  },
}

// Construct the player object
const Player = {
  ...properties,
  ...methods
}

export default Player;