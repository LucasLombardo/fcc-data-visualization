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

  const tooltip = svg.append("g").attr("id", "tooltip").attr("opacity", 0);

  const [minY, maxY] = [
    d3.min(data, (d) => d.Time),
    d3.max(data, (d) => d.Time),
  ].map((t) => new Date(`2000-01-01T00:${t}.000Z`));

  const yScale = d3
    .scaleTime()
    .domain([new Date(minY.getTime() - 5000), new Date(maxY.getTime() + 5000)])
    .range([0, height]);
  const yAxis = d3
    .axisLeft(yScale)
    .tickFormat(
      (y) => `${y.getMinutes()}:${String(y.getSeconds()).padEnd(2, "0")}`,
    );
  canvas.append("g").attr("id", "y-axis").call(yAxis);

  const xScale = d3
    .scaleTime()
    .domain(
      [d3.min(data, (d) => d.Year - 1), d3.max(data, (d) => d.Year + 1)].map(
        (t) => new Date(`${t}-01-01T00:00:00.000Z`),
      ),
    )
    .range([0, width]);
  const xAxis = d3.axisBottom(xScale).tickFormat((t) => t.getFullYear());
  canvas
    .append("g")
    .attr("id", "x-axis")
    .call(xAxis)
    .attr("transform", `translate(0,${height})`);

  canvas
    .selectAll(".circle")
    .data(data)
    .enter()
    .append("circle")
    .attr(
      "class",
      (d) => `circle ${d.Doping ? "circle--doping" : "circle--nodope"} dot`,
    )
    .attr("cx", (d) => xScale(new Date(`${d.Year}-01-01T00:00:00.000Z`)))
    .attr("cy", (d) => yScale(new Date(`2000-01-01T00:${d.Time}.000Z`)))
    .attr("data-xvalue", (d) => new Date(`${d.Year}-01-01T00:00:00.000Z`))
    .attr("data-yvalue", (d) => new Date(`2000-01-01T00:${d.Time}.000Z`))
    .attr("r", 8.5)
    .on("mouseover", function (event, d) {
      tooltip
        .attr("opacity", 1)
        .attr("data-year", new Date(`${d.Year}-01-01T00:00:00.000Z`));
    })
    .on("mouseout", function () {
      tooltip.attr("opacity", 0);
    });

  canvas
    .append("g")
    .attr("id", "legend")
    .append("rect")
    .attr("width", 120)
    .attr("height", 60)
    .attr("x", width - 120);
})();
