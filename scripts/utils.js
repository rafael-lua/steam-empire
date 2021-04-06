// Clamp
const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

// Format
const format = (value) => {
  return value >= 1000000 ? value.toExponential(3) : String(value).replace(/(.)(?=(\d{3})+$)/g,'$1,');
}

// All functions bandled together
const utils = {
  clamp,
  format
}

export default utils;