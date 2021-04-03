// Clamp
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

// All functions bandled together
const utils = {
  clamp
}

export default utils;