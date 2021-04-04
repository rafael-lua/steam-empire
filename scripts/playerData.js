import utils from "./utils";

/* The player status and functionalities */

// The player data variables object
let properties = {
  coal: 0,
  capacity: 10,
}

// The player methods list
let methods = {
  getCoal: function() {
    return this.coal;
  },

  increaseCoal: function(v) {
    if(this.coal < this.capacity) {
      this.coal += v;
      this.coal = utils.clamp(this.coal, 0, this.capacity);
      console.log(this.coal );
    }
  }
}

// Cosntruct the player object
const Player = {
  ...properties,
  ...methods
}

export default Player;