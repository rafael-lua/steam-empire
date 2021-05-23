<template>
  <div>
    <NomadItem
      v-bind:item="backpack"
      v-bind:price="formatedValue(backpack.value)"
      v-on:handler="trade"
    >
      <p class="text-center text-400 text-break">CAPACITY<br><span class="text-700">15</span></p>
    </NomadItem>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"

import { nomadData } from "~/scripts/gameData"
import NomadItem from "./NomadItem"

export default {
  name: "Backpack",

  components: {
    NomadItem
  },

  data () {
    return {
      player: Player,
      backpack: nomadData.backpack
    }
  },

  methods: {
    formatedValue: function (v) {
      return utils.format(v)
    },

    trade: function () {
      if ((this.player.inventory.backpack !== true) && (this.player.gold >= this.backpack.value)) {
        this.player.gold -= this.backpack.value
        this.player.inventory.backpack = true
      }
    },

    togglePopup: function (e, t) {
      if (e === "on") {
        utils.popup.text = t
        utils.popup.hovered = true
      } else {
        utils.popup.hovered = false
      }
    }
  },
}
</script>