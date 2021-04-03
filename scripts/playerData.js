import utils from "./utils";

/* The player status and functionalities */

// The player data variables object
const Player = {
  coal: 0,
  capacity: 10,

  // Export all the functionalities as a object of functions
  getCoal: function() {
    return this.coal;
  },

  increaseCoal: function(v) {
    if(this.coal < this.capacity) {
      this.coal += v;
      this.coal = utils.clamp(this.coal, 0, this.capacity);
    }
  }
}

export default Player;