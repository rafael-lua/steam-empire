<template>
  <div class="description">
    <p class="content">{{text}}</p>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

.content {
  margin: 0 auto;
  width: 250px;
  overflow-wrap: break-word;
  font-weight: 500;
}

.description {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -50%);
  padding: 0.5em;
  border: 2px solid rgb(var(--pink-tone-dark));
  border-radius: 1em;
  background-color: rgb(var(--pink-tone-light));
}
</style>