import * as d3 from "d3";
import data from "../../../data/cycling-doping-times.json";
import { domLoaded } from "../../../shared/utils";
import { getMargins, getDimensions } from "./utils";
d3; // use full d3 import to prevent tree shaking

(async () => {
  await domLoaded();
  const svg = d3.select("#scatterplot-svg");

  const margin = getMargins(svg);
  const { width, height } = getDimensions(svg, margin);
  const canvas = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const yScale = d3
    .scaleTime()
    .domain(
      [d3.min(data, (d) => d.Time), d3.max(data, (d) => d.Time)].map(
        (t) => new Date(`2000-01-01T00:${t}.000Z`)
      )
    )
    .range([0, height]);
  const yAxis = d3
    .axisLeft(yScale)
    .tickFormat(
      (y) => `${y.getMinutes()}:${String(y.getSeconds()).padEnd(2, "0")}`
    );
  canvas.append("g").call(yAxis);

  const xScale = d3
    .scaleTime()
    .domain(
      [d3.min(data, (d) => d.Year), d3.max(data, (d) => d.Year)].map(
        (t) => new Date(`${t}-01-01T00:00:00.000Z`)
      )
    )
    .range([0, width]);
  const xAxis = d3.axisBottom(xScale).tickFormat((t) => t.getFullYear());
  canvas.append("g").call(xAxis).attr("transform", `translate(0,${height})`);
})();
