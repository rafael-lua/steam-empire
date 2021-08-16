<template>
  <div class="alchemy bg-light border-dark">
    <div
      v-if="!isStageSet('autoAlchemy')"
      class="alchemy-wrapper flex-col flex-a-center flex-j-evenly"
    >
      <InfusionManual />
      <hr />
      <ChrysopoeiaManual />
    </div>

    <div v-else class="alchemy-wrapper flex-col flex-a-center flex-j-evenly">
      <Infusion />
      <hr />
      <Chrysopoeia />
    </div>
  </div>
</template>

<script>
import Player from "~/scripts/playerData"
import Infusion from "../elements/alchemy/Infusion"
import Chrysopoeia from "../elements/alchemy/Chrysopoeia"
import InfusionManual from "../elements/alchemy/InfusionManual"
import ChrysopoeiaManual from "../elements/alchemy/ChrysopoeiaManual"

export default {
  name: "Alchemy",

  components: {
    Infusion,
    Chrysopoeia,
    InfusionManual,
    ChrysopoeiaManual
  },

  data() {
    return {
      player: Player
    }
  },

  methods: {
    isStageSet: function(stage) {
      return this.player.modules.stages.isSet(stage)
    }
  }
}
</script>

<style scoped>
.alchemy {
  height: 100%;
  padding: 0.5em;
}

.alchemy-wrapper {
  height: 100%;
  width: 100%;
}
</style>
