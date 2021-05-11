<template>
  <div class="wrapper flex-col flex-j-end flex-a-center noselect">
    <template v-for="notif in notifications">
      <div class="item clickable" v-bind:key="notif.id" v-on:click="dismiss(notif.id)">
        <p>{{notif.msg}}</p>
      </div>
    </template>
  </div>
</template>

<script>
import utils from "~/scripts/utils"

export default {
  name: "Notification",

  data () {
    return {
      notificationTimer: null,
      notifications: [],
      nextId: 0
    }
  },

  methods: {
    dismiss: function (id) {
      this.notifications = this.notifications.filter((notif) => notif.id !== id)
    },

    updateArray: function () {
      if (this.notifications.length > 0) {
        this.notifications.forEach((notif) => {
          notif.time -= 100
        })
        this.notifications = this.notifications.filter((notif) => notif.time > 0)
      }
    },

    notificationGenerator: function (notifMsg) {
      this.nextId += 1

      const notificate = {
        msg: notifMsg,
        time: 10000,
        id: this.nextId
      }

      this.notifications.push(notificate)
    }
  },

  mounted () {
    this.notificationTimer = setInterval(() => {
      this.updateArray()
    }, 100)

    // Set listener
    utils.eventBus.$on("notificate", this.notificationGenerator)

    // utils.eventBus.$emit("notificate", "Welcome")
    // Welcome message
    setTimeout(() => {utils.eventBus.$emit("notificate", "Welcome")}, 1000)
  }
}
</script>

<style scoped>
.wrapper {
  position: fixed;
  height: 95vh;
  right: 0;
  top: 50%;
  transform: translate(-10%, -50%);
  padding: 0.25em;
  z-index: 2000;
}

.item {
  border: 5px solid white;
  border-radius: 1em;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 0.5em;
  color: gold;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 0.25em 0.1em;
}
</style>