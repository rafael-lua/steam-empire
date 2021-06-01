<template>
  <div
    class="clickable flex-col flex-a-center"
    v-bind:class="buttonStyle"
    v-on:click="$emit('handler')"
  >
    <p class="text-500">{{ title }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Button",

  props: {
    title: {
      type: String,
      required: true
    },

    color: {
      type: String,
      default: "white"
    },

    extraStyle: {
      type: Object,
      default: null
    },

    disabledStatus: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    buttonStyle: function() {
      const styleClass = this.extraStyle === null ? {} : this.extraStyle
      if (this.disabledStatus === false) {
        styleClass["button-" + this.color] = true
      } else {
        styleClass["button-greyedOut"] = true
      }
      return styleClass
    }
  }
}
</script>

<style scoped>
div {
  width: fit-content;
  margin: 0 auto;
}
</style>
