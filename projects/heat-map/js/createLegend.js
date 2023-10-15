import * as d3 from "d3";
import { LEGEND_SIZES, COLORS } from "./constants";

export function createLegend(breakpoints, min, max) {
  const { LEGEND_SVG: s, LEGEND_MARGINS: m, LEGEND_CANVAS: c } = LEGEND_SIZES;
  const svg = d3
    .select("#legend")
    .attr("viewBox", `0 0 ${s.width} ${s.height}`);
  const canvas = svg
    .append("g")
    .attr("transform", `translate(${m.left}, ${m.top})`);

  const colorBandScale = d3
    .scaleBand()
    .domain(COLORS.reverse())
    .range([0, c.width]);
  const tickScale = d3
    .scalePoint()
    .domain([max, ...breakpoints, min].reverse())
    .range([0, c.width]);

  const lXAxis = d3
    .axisBottom(tickScale)
    .tickFormat((t) => Math.round(t * 10) / 10);
  canvas
    .append("g")
    .attr("id", "legend-axis")
    .call(lXAxis)
    .attr("transform", `translate(0,${c.height})`);
  canvas
    .selectAll(".legend-cell")
    .data(COLORS.reverse())
    .enter()
    .append("rect")
    .attr("class", "legend-cell")
    .attr("x", (d) => colorBandScale(d))
    .attr("y", 0)
    .attr("width", colorBandScale.bandwidth())
    .attr("height", c.height)
    .attr("fill", (d) => d);
}
