import utils from "./utils";

/* The player status and functionalities */

// The player data variables object
let properties = {

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
  setStage: function(v) {
    if(this.stage < v){ this.stage = v; }
  },

  increaseCoal: function(v) {
    if(this.coal < this.capacity) {
      this.coal += v;
      this.coal = utils.clamp(this.coal, 0, this.capacity);
      console.log(this.coal );
    }
  },
}

// Cosntruct the player object
const Player = {
  ...properties,
  ...methods
}

export default Player;