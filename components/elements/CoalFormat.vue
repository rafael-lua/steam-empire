<template>
    <span class="text-center text-italic flex-row flex-a-center">
      <img src="~/assets/icons/mine-wagon.png" alt="Coal Icon" class="icon-basic-mini">
      <slot></slot>
    </span>
</template>

<script>
export default {
  name: "CoalFormat",
}
</script>