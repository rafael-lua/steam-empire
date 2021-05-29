import Vue from "vue"
const eventBus = new Vue()
// Use like: utils.eventBus.$emit("notificate", "Welcome!")

// Clamp
const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max)
}

// Format
const format = (value) => {
  let formatedValue
  if (value >= 1000000) {
    formatedValue = value.toExponential(3)
  } else {
    const parsedValue = parseFloat(value.toFixed(2))
    formatedValue = (parsedValue === Math.floor(parsedValue)) ? String(parsedValue).replace(/(.)(?=(\d{3})+$)/g,"$1,") : String(parsedValue.toFixed(2)).replace(/(.)(?=(\d{3})+$)/g,"$1,")
    // formatedValue = String(value.toFixed(2)).replace(/(.)(?=(\d{3})+$)/g,"$1,")
  }
  return formatedValue
}

// Popup data
const popup = {
  text: "",
  hovered: false
}
// All functions bundled together
const utils = {
  clamp,
  format,
  popup,
  eventBus
}

export default utils