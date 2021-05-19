<template>
    <p class="text-center text-italic flex-row flex-a-center">
      <img src="~/assets/icons/two-coins.png" alt="Coin Icon" class="icon-basic-mini">
      <slot></slot>
    </p>
</template>

<script>
export default {
  name: "CoinFormat",
}
</script>