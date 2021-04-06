import utils from "./utils";

/* The player status and functionalities */

// The player data variables object
let properties = {

  amount: 1,
  stage: 0,

  coal: 0,
  capacity: 10,
  gold: 0,

  day: 1,
  month: 1,
  year: 1,
  season: "spring",
}

// The player methods list
let methods = {
  // Change amount
  setAmount: function(v) {
    if(isNaN(v) === false && v > 0) {
      this.amount = v;
      console.log(this.amount);
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
}

// Cosntruct the player object
const Player = {
  ...properties,
  ...methods
}

export default Player;