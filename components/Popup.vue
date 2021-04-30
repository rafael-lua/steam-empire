<template>
  <div class="description" v-bind:class="classPos">
    <p class="content">{{text}}</p>
  </div>
</template>

<script>
export default {
  name: "Popup",

  props: {
    text: {
      type: String,
      required: true
    },
    pos: {
      type: String,
      required: true
    }
  },

  computed: {
    classPos: function() {
      switch(this.pos) {
        case "top":
          return {top: true};
        case "right":
          return {right: true};
        case "left":
          return {left: true};
        case "bottom":
        default:
          return {bottom: true}
      }
    }
  }

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
  position: absolute;
  padding: 0.5em;
  border: 5px solid rgb(var(--pink-tone-dark));
  border-radius: 1em;
  background-color: rgb(var(--pink-tone-light));
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.top {
  left: 50%;
  top: 0;
  transform: translate(-50%, 25%);
}

.right {
  right: 0;
  top: 50%;
  transform: translate(-10%, -50%);
}

.bottom {
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -25%);
}

.left {
  left: 0;
  top: 50%;
  transform: translate(10%, -50%);
}

</style>