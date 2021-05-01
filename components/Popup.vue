<template>
  <div 
    id="popup" 
    class="description" 
    v-bind:class="pos" 
    v-on:click="cancelHover"
    v-on:mouseover="changePos"
    v-show="popup.hovered"
  >
    <p class="content">{{popup.text}}</p>
  </div>
</template>

<script>
import utils from "~/scripts/utils"

export default {
  name: "Popup",

  data() {
    return {
      popup: utils.popup,
      pos: { bottom: true, top: false }
    }
  },

  watch: {
    // whenever popup changes, this function will run. Called with this format to activate deep so it watches nested properties of a object
    popup: {
      handler: function (newPop, oldPop) {
        if(newPop.hovered === false) {
          this.pos.bottom = true;
          this.pos.top = false;
        }
      },
      deep: true
    }
  },

  methods: {
    changePos: function() {
      this.pos.bottom = !this.pos.bottom;
      this.pos.top = !this.pos.top;
    },

    cancelHover: function() {
      this.popup.hovered = false;
    },
  },

}
</script>

<style scoped>

.content {
  margin: 0 auto;
  min-width: 150px;
  max-width: 600px;
  overflow-wrap: break-word;
  font-weight: 500;
}

.description {
  position: fixed;
  padding: 0.5em;
  border: 5px solid rgb(var(--pink-tone-dark));
  border-radius: 1em;
  background-color: rgb(var(--pink-tone-light));
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 1000;
}

.top {
  left: 50%;
  top: 0;
  transform: translate(-50%, 35%);
}

.bottom {
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -35%);
}

</style>