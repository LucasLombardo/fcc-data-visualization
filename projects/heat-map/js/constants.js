export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MARGINS = { top: 20, right: 20, bottom: 20, left: 65 };
const SVG = { width: 800, height: 400 };
const CANVAS = {
  width: SVG.width - MARGINS.left - MARGINS.right,
  height: SVG.height - MARGINS.top - MARGINS.bottom,
};
export const SIZES = { MARGINS, SVG, CANVAS };
