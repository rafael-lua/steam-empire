<template>
  <div
    class="shop-item clickable"
    v-on:click="$emit('handler')"
    v-on:mouseover="togglePopup('on', item.popupMessage)"
    v-on:mouseleave="togglePopup('off', null)"
  >
    <p class="break-line text-center text-500">{{ title }}</p>
    <hr />
    <slot></slot>
    <hr />
    <CoinFormat>{{ formatedValue(item.value) }}</CoinFormat>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import CoinFormat from "~/components/elements/CoinFormat"

export default {
  name: "NomadItem",

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  components: {
    CoinFormat
  },

  computed: {
    title: function() {
      return this.item.title.toUpperCase()
    }
  },

  methods: {
    formatedValue: function(v) {
      return utils.format(v)
    },

    togglePopup: function(e, t) {
      if (e === "on") {
        utils.popup.text = t
        utils.popup.hovered = true
      } else {
        utils.popup.hovered = false
      }
    }
  }
}
</script>

<style scoped>
.break-line {
  white-space: pre-line;
}
</style>
