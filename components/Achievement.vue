<template>
  <div class="bars-wrapper" v-bind:class="uniqueStyle">
    <p class="text-500 text-center text-s1">{{desc}}</p>
    <div v-bind:class="uniqueClass" class="bar"></div>
    <p class="bar-value text-s2">{{progress}}</p>
  </div>
</template>

<script>
let ProgressBar = require("progressbar.js");

export default {
  name: "Achievement",

  props: {
    className: {
      type: String,
      required: true
    },
    classStyle: {
      type: Number,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    factor: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      bar: null,
    }
  },

  mounted() {
    let selector = "." + this.className;
    this.bar = new ProgressBar.Line(selector, {
        strokeWidth: 3,
        trailColor: "#3a3a3a",
        trailWidth: 2,
        easing: "easeOut",

        from: { color: "#dd5456"},
        to: { color: "#4ee564"},
        step: function(state, bar, attachment) {
            bar.path.setAttribute("stroke", state.color);
        }
    });
    this.bar.set(this.factor);
  },

  watch: {
    // whenever factor changes, this function will run
    factor: function (newFactor, oldFactor) {
      if(oldFactor < 100) {
        this.bar.animate(newFactor > 1 ? 1 : newFactor);
      }
    }
  },

  computed: {
    progress: function() {
      let v = this.factor * 100;
      return v >= 1 ? "COMPLETED" : `${v.toFixed(2)}%`;
    },
    uniqueClass: function() {
      let c = {};
      c[this.className] = true;
      return c;
    },
    uniqueStyle: function() {
      let c = {};
      c["style-" + this.classStyle] = true;
      return c;
    },    
  }
}
</script>

<style scoped>

.bars-wrapper {
  width: 100%;
  padding: 0.25em 0.2em;
}

.style-1 {
  background-color: rgba(var(--light-shadow), 0.25);
}

.style-2 {
  background-color: rgba(var(--dark-shadow), 0.30);
}

.bar {
  width: 200px;
  margin: 0 auto;
}

.bar-value {
  width: 100%;
  text-align: center;
}

</style>