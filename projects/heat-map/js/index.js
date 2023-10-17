import data from "../../../data/global-temperatures.json";
import * as d3 from "d3";
import { MONTHS, SIZES, COLORS } from "./constants";
import { createLegend } from "./createLegend";
import { createDataTable } from "./createDataTable";
d3;

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

const tooltip = svg.append("g").attr("id", "tooltip").attr("display", "none");
tooltip
  .append("polygon")
  .attr("points", "0,0 0,50 50,50 50,26.5 52.5,25 50,23.5 50,0");
const tooltipText = tooltip.append("text").attr("id", "tooltip-text");
const shortMonths = MONTHS.map((m) => {
  return m === "September" ? "Sept" : m.slice(0, 3);
});

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
  .attr("data-temp", (d) => d.variance)
  .on("mouseover", (_, d) => {
    tooltip
      .attr("display", "block")
      .attr("data-year", d.year)
      .attr(
        "transform",
        `translate(${xScale(d.year) + 11}, ${yScale(d.month - 1)})`,
      );
    tooltipText.html(`
        <tspan x="27" y="10" dominant-baseline="middle" text-anchor="middle">${
          shortMonths[d.month - 1]
        } ${d.year}</tspan>
        <tspan x="27" y="25" dominant-baseline="middle" text-anchor="middle">${
          Math.round(d.variance * 100) / 100
        }</tspan>
        <tspan x="27" y="40" dominant-baseline="middle" text-anchor="middle">(${
          Math.round((d.variance + data.baseTemperature) * 100) / 100
        })</tspan>
    `);
  })
  .on("mouseout", () => {
    tooltip.attr("display", "none");
  });

createDataTable(data.monthlyVariance);
