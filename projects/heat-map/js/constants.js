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

const MARGINS = { top: 12, right: 20, bottom: 25, left: 65 };
const SVG = { width: 800, height: 300 };
const CANVAS = {
  width: SVG.width - MARGINS.left - MARGINS.right,
  height: SVG.height - MARGINS.top - MARGINS.bottom,
};
export const SIZES = { MARGINS, SVG, CANVAS };

const LEGEND_MARGINS = { top: 0, right: 10, bottom: 20, left: 10 };
const LEGEND_SVG = { width: 260, height: 40 };
const LEGEND_CANVAS = {
  width: LEGEND_SVG.width - LEGEND_MARGINS.right - LEGEND_MARGINS.left,
  height: LEGEND_SVG.height - LEGEND_MARGINS.top - LEGEND_MARGINS.bottom,
};
export const LEGEND_SIZES = { LEGEND_MARGINS, LEGEND_SVG, LEGEND_CANVAS };

export const COLORS = [
  "#D73126",
  "#F56C43",
  "#FCAF61",
  "#FEE090",
  "#FFFFBF",
  "#E1F2F8",
  "#AAD9E8",
  "#75ADD0",
  "#4575B4",
  "#313695",
];
