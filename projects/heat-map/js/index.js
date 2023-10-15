import data from "../../../data/global-temperatures.json";
import * as d3 from "d3";
import { MONTHS, SIZES, COLORS } from "./constants";
import { createLegend } from "./createLegend";

const { SVG: s, MARGINS: m, CANVAS: c } = SIZES;
const svg = d3
  .select("#heat-map")
  .attr("viewBox", `0 0 ${s.width} ${s.height}`);

svg
  .append("desc")
  .text("Monthly Global Land-Surface Temperature")
  .attr("id", "description");

const canvas = svg
  .append("g")
  .attr("transform", `translate(${m.left}, ${m.top})`);

const [min, max] = [
  d3.min(data.monthlyVariance, (d) => d.variance),
  d3.max(data.monthlyVariance, (d) => d.variance),
];
const colorBreakpoints = [...Array(9)].map(
  (_, i) => max - ((i + 1) * (max - min)) / COLORS.length,
);
const colorScale = (variance) => {
  for (let i = 0; i < colorBreakpoints.length; i++) {
    if (variance >= colorBreakpoints[i]) {
      return COLORS[i];
    }
  }
  return COLORS[colorBreakpoints.length];
};
createLegend(colorBreakpoints, min, max);

const yScale = d3
  .scaleBand()
  .domain(MONTHS.map((_, i) => i))
  .range([0, c.height]);
const yAxis = d3.axisLeft(yScale).tickFormat((m) => MONTHS[m]);
canvas.append("g").attr("id", "y-axis").call(yAxis);

const years = data.monthlyVariance.reduce((a, c) => {
  if (!a.includes(c.year)) a.push(c.year);
  return a;
}, []);
const xScale = d3.scaleBand().domain(years).range([0, c.width]);
const xAxis = d3
  .axisBottom(xScale)
  .tickValues(years.filter((y) => y % 10 === 0));
canvas
  .append("g")
  .attr("id", "x-axis")
  .call(xAxis)
  .attr("transform", `translate(0,${c.height})`);

canvas
  .selectAll(".cell")
  .data(data.monthlyVariance)
  .enter()
  .append("rect")
  .attr("class", "cell")
  .attr("x", (d) => xScale(d.year))
  .attr("y", (d) => yScale(d.month - 1))
  .attr("width", xScale.bandwidth())
  .attr("height", yScale.bandwidth())
  .attr("fill", (d) => colorScale(d.variance))
  .attr("data-month", (d) => d.month - 1)
  .attr("data-year", (d) => d.year)
  .attr("data-temp", (d) => d.variance);
