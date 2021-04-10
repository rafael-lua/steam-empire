import utils from "./utils";

/* The player status and functionalities */

// The player data variables object
let properties = {
  debugValue: 0,

  amount: 1,
  stage: 0,

  coal: 0,
  capacity: 10,
  gold: 0,

  day: 1,
  month: 1,
  year: 1,
  season: "spring",

  nomads: {
    sellCoal: {
      sold: 0,
      max: 100,
      value: 1
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
    if(this.stage < v){ this.stage = v; }
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
}

// Construct the player object
const Player = {
  ...properties,
  ...methods
}

export default Player;