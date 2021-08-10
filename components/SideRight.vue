<template>
  <div class="side-right bg-light border-dark">
    <div class="flex-col">
      <div class="info-wrapper">
        <p
          class="text-500 hover-highlight"
          v-on:mouseover="togglePopup('on')"
          v-on:mouseleave="togglePopup('off')"
        >
          AP:
          <span class="info-value text-700">{{ achievementPoints }}</span>
        </p>
        <hr />
      </div>

      <Achievement
        className="test1"
        v-bind:classStyle="1"
        v-bind:factor="firstStep"
        desc="Collect your first 10 coal ores"
      />
    </div>
  </div>
</template>

<script>
import utils from "~/scripts/utils"
import Player from "~/scripts/playerData"
import Achievement from "./Achievement"

export default {
  name: "SideRight",

  components: {
    Achievement
  },

  data() {
    return {
      player: Player,
      apHovered: false
    }
  },

  methods: {
    togglePopup: function(e) {
      if (e === "on") {
        utils.popup.text =
          "AP (achievement points) can be used to upgrade alchemy/idle mechanics."
        utils.popup.hovered = true
      } else {
        utils.popup.hovered = false
      }
    }
  },

  computed: {
    achievementPoints: function() {
      return this.player.modules.achievements.points
    },

    firstStep: function() {
      const p =
        this.player.modules.achievements.firstSteps.progress /
        this.player.modules.achievements.firstSteps.target
      return p
    }
  }
}
</script>

<style scoped>
.side-right {
  margin: 0 0.5em 0.5em 0;
}

.info-wrapper {
  padding: 0.25em;
}
</style>
