<template>
    <p class="text-center text-italic flex-row flex-a-center">
      <img src="~/assets/icons/two-coins.png" alt="Coin Icon" class="icon-basic-mini">
      {{formatedValue}}
      <slot></slot>
    </p>
</template>

<script>
import utils from "~/scripts/utils"

export default {
  name: "CoinFormat",

  props: {
    value: {
      type: Number,
      required: true
    }
  },

  computed: {
    formatedValue: function () {
      return utils.format(this.value)
    }
  }
}
</script>

<style scoped>

</style>