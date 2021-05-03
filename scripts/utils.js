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
    formatedValue = (value === Math.floor(value)) ? String(value).replace(/(.)(?=(\d{3})+$)/g,"$1,") : String(value.toFixed(2)).replace(/(.)(?=(\d{3})+$)/g,"$1,")
  }
  return formatedValue
}

const popup = {
  text: "",
  hovered: false
}

// All functions bandled together
const utils = {
  clamp,
  format,
  popup
}

export default utils