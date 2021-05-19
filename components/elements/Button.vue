<template>
  <div class="clickable flex-col flex-a-center" v-bind:class="buttonStyle" v-on:click="$emit('handler')">
    <p class="text-500">{{title}}</p>
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
    }
  },

  computed: {
    buttonStyle: function () {
      let styleClass = this.extraStyle === null ? {} : this.extraStyle
      styleClass["button-" + this.color] = true
      return styleClass
    }
  }
}
</script>