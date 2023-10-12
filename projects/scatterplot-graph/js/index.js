import * as d3 from "d3";
import unsortedData from "../../../data/cycling-doping-times.json";
import { domLoaded } from "../../../shared/utils";
import { getMargins, getDimensions } from "./utils";
import Tooltip from "./tooltip";
d3; // use full d3 import to prevent tree shaking

(async () => {
  await domLoaded();
  const svg = d3.select("#scatterplot-svg");
  const data = unsortedData.sort((a, b) => a.Year - b.Year);

  /* SETUP */
  const margin = getMargins(svg);
  const { width, height } = getDimensions(svg, margin);
  const canvas = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  let tooltip;
  const showTooltip = (event, d) => {
    if (!tooltip) tooltip = new Tooltip({ canvas });
    const {
      cx: { value: x },
      cy: { value: y },
    } = event.target.attributes;
    tooltip.show({ width, d, x, y });
  };

  /* Y SCALE / AXIS */
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

  /* X SCALE / AXIS */
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

  /* DATA */
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
    .attr(
      "aria-label",
      (d) =>
        `data point, ${d.Doping ? "doping" : "no doping"}, ${d.Name} ${
          d.Nationality
        }, Year: ${d.Year}, Time: ${d.Time}${d.Doping ? `, ${d.Doping}` : ""}`,
    )
    .on("mouseover", showTooltip)
    .on("focus", showTooltip)
    .on("blur", function () {
      tooltip.hide();
    })
    .on("mouseout", function (event) {
      if (document.activeElement !== event.target) tooltip.hide();
    })
    .on("keydown", function (event) {
      if (event.key === "Escape") tooltip.hide();
    });

  /* LEGEND */
  canvas
    .append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${width - 205}, 0)`)
    .html(
      `
      <rect height="60" width="205"></rect>
      <rect height="20" width="20" x="7" y="7" class="legend-box legend-box--doping"></rect>
      <text x="35" y="22.5" class="legend-text">Doping Allegations</text>
      <rect height="20" width="20" x="7" y="34" class="legend-box legend-box--nodope"></rect>
      <text x="35" y="50" class="legend-text">No Doping Allegations</text>
    `,
    )
    .attr();
})();
