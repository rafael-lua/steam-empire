<template>
  <div class="chrysopoeia pd-05 flex-row flex-a-center flex-j-between">
    <div class="fixed-box flex-col flex-a-center flex-j-center">
      <img
        src="~/assets/icons/triple-beak.png"
        alt="Coin Icon"
        class="icon-basic"
      />
      <p class="text-700">CHRYSOPOEIA</p>
      <hr class="hr-mg" />
      <img
        src="~/assets/icons/two-coins.png"
        alt="Coin Icon"
        class="icon-basic-small"
      />
      <p class="text-s2 text-500">GOLD</p>
      <hr class="hr-light hr-mg hr-half" />
      <p class="text-700">{{ chrysopoeiaReport }} /s</p>
    </div>

    <div class="flex-col flex-a-center">
      <p class="text-500 text-s1">CURRENT CLASS</p>
      <p class="text-700">{{ chrysopoeiaClass }}</p>
      <hr class="hr-light hr-mg" />
      <p class="text-500 text-s1">MULTIPLIER</p>
      <p class="text-700">{{ chrysopoeiaMultiplier }}</p>
    </div>

    <div class="border-light flex-row flex-a-center flex-j-center pd-1">
      <Button
        title="UPGRADE"
        color="aqua"
        v-on:handler="upgradeChrysopoeia()"
        v-bind:extraStyle="{ 'mg-right-1': true }"
      />

      <div class="flex-col flex-a-center">
        <p class="text-500 text-s2">REQUIREMENTS</p>
        <hr class="hr-half hr-light" />
        <p
          v-for="required in requiredMaterials"
          v-bind:key="required.name"
          v-bind:class="required.has === true ? hasStyle : hasntStyle"
        >
          <span>{{ required.name }}</span>
          <span class="text-italic">{{ formatNumber(required.value) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"
import Button from "../Button"

export default {
  name: "Chrysopoeia",

  components: {
    Button
  },

  data() {
    return {
      player: Player,
      hasStyle: {
        "text-500": true,
        "text-s1": true
      },
      hasntStyle: {
        "text-500": true,
        "text-s1": true,
        "low-opacity": true
      }
    }
  },

  computed: {
    chrysopoeia: function() {
      return this.player.modules.alchemy.getAlchemyData("chrysopoeia")
    },

    chrysopoeiaReport: function() {
      return utils.format(
        this.player.modules.reports.getReported("chrysopoeia")
      )
    },

    chrysopoeiaClass: function() {
      return this.player.modules.alchemy.getClassName("chrysopoeia")
    },

    chrysopoeiaMultplier: function() {
      return this.player.modules.alchemy.getMultiplier("chrysopoeia")
    },

    requiredMaterials: function() {
      return this.player.modules.alchemy.getRequiredListForNextClass(
        "chrysopoeia"
      )
    }
  },

  methods: {
    upgradeChrysopoeia: function() {
      const [canUpgrade, costList] = this.player.modules.alchemy.canUpgrade(
        "chrysopoeia"
      )
      if (canUpgrade) {
        this.player.modules.alchemy.upgrade("chrysopoeia", costList)
      }
    },

    formatNumber: function(n) {
      return n === null ? null : utils.format(n)
    }
  }
}
</script>

<style scoped>
.chrysopoeia {
  width: 100%;
}

.fixed-box {
  width: 150px;
}

.low-opacity {
  opacity: 0.5;
}
</style>
