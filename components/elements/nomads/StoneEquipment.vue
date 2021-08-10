<template>
  <div>
    <NomadItem v-bind:item="stoneEquipment" v-on:handler="trade">
      <p class="text-center text-400 text-break">
        COMPETENCY<br /><span class="text-700">1</span>
      </p>
    </NomadItem>
  </div>
</template>

<script>
import Player from "~/scripts/playerData"

import NomadItem from "./NomadItem"

export default {
  name: "StoneEquipment",

  components: {
    NomadItem
  },

  data() {
    return {
      player: Player
    }
  },

  computed: {
    stoneEquipment: function() {
      return this.player.modules.nomads.getNomadData("stoneEquipment")
    }
  },

  methods: {
    trade: function() {
      if (
        !this.player.modules.inventory.checkIfHas("stoneEquipment") &&
        this.player.modules.gold.amount >= this.stoneEquipment.value
      ) {
        this.player.modules.gold.decreaseGold(this.stoneEquipment.value)
        this.player.modules.inventory.insert("stoneEquipment")
      }
    }
  }
}
</script>
