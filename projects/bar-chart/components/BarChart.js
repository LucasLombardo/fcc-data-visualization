import * as d3 from "d3";
import { dateToQuarter, formatNumBillions  } from "../../../shared/utils";

const margin = { top: 10, right: 20, bottom: 30, left: 50 };

export default class BarChart {
  constructor({ height, width, data, ref }) {
    this.height = height - margin.top - margin.bottom;
    this.width = width - margin.left - margin.right;
    this.data = data;
    this.svg = d3.select(ref).append("svg");
    this.ref = ref;
    this.tooltipLine = this.svg.append("line");
    this.canvas = this.svg.append("g");
    this.tooltip = this.svg.append("g");
    this.tooltipRect = this.tooltip.append("rect");
    this.tooltipText = this.tooltip.append("text");
  }

  update() {
    const {
      height,
      width,
      data,
      svg,
      tooltipLine,
      tooltipText,
      canvas,
      tooltip,
      tooltipRect
    } = this;

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    canvas.attr(
      "transform",
      "translate(" + margin.left + "," + margin.top + ")"
    );

    // X Axis
    const dates = data.map((d) => new Date(d[0]));
    const xAxisValues = d3
      .scaleTime()
      .domain([dates[0], dates[dates.length - 1]])
      .range([0, width]);
    const xAxisTicks = d3.axisBottom(xAxisValues);
    canvas
      .append("g")
      .attr("transform", "translate(" + 0 + ", " + height + ")")
      .attr("id", "x-axis")
      .call(xAxisTicks);

    // Y Axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[1])])
      .range([height, 0]);
    const yAxisTicks = d3.axisLeft(y);
    canvas.append("g").attr("id", "y-axis").call(yAxisTicks);
    const x = d3.scaleBand().domain(data).padding(0).range([0, width]);

    const setTooltipOpacity = (n) => {
      tooltipLine.attr("opacity", n);
      tooltip.attr("opacity", n);
    };
    // Visible Bars
    const centerPoints = [];
    canvas
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .attr("width", (d) => x.bandwidth())
      .attr("x", (d) => {
        centerPoints.push({ point: x(d) + x.bandwidth() / 2, d });
        return x(d);
      })
      .attr("height", (d) => height - y(d[1]))
      .attr("y", (d) => y(d[1]))
      .on("mouseover", function (event, d) {
        setTooltipOpacity(1);
        const [xHover] = d3.pointer(event);
        const nearestCenterPoint = centerPoints.sort(
          (a, b) => Math.abs(xHover - a.point) - Math.abs(xHover - b.point)
        )[0];

        const centerX = margin.left + nearestCenterPoint.point;
        tooltipLine.attr("x1", centerX).attr("x2", centerX);
        const tooltipX = Math.max(
          Math.min(centerX, width + margin.left - 30),
          margin.left + 30
        );
        tooltip
          .attr("transform", `translate(${tooltipX - 50}, 20)`)
          .attr("data-date", d[0])
          .attr("position", "relative")

        tooltipText.html(`
          <tspan dominant-baseline="middle" text-anchor="middle" x="52" y="15">${dateToQuarter(d[0])}</tspan>
          <tspan dominant-baseline="middle" text-anchor="middle" x="52" y="35" font-size="0.8em">$${formatNumBillions(d[1])}B USD</tspan>
        `)
      })
      .on("mouseout", function () {
        setTooltipOpacity(0);
      });

    tooltip.attr("transform", "translate(-400,0)").attr("id", "tooltip");

    tooltipRect.attr("width", 100).attr("height", 50);

    tooltipLine
      .attr("x1", 100)
      .attr("x2", 100)
      .attr("y1", margin.top + 20)
      .attr("y2", height + margin.top)
      .attr("stroke", "black")
      .attr("opacity", 0);
  }

  unmount() {
    this.svg.remove();
  }
}
