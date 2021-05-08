<template>
  <div class="alchemy bg-light border-dark flex-col flex-a-center flex-j-evenly">
    <Infusion />
    <hr>
    <Chrysopoeia />
  </div>
</template>

<script>
import Infusion from "../elements/alchemy/Infusion"
import Chrysopoeia from "../elements/alchemy/Chrysopoeia"

export default {
  name: "Alchemy",

  components: {
    Infusion,
    Chrysopoeia
  }

}
</script>

<style scoped>

.alchemy {
  height: 100%;
  padding: 0.5em;
}

</style>