import * as d3 from "d3";

const margin = { top: 10, right: 20, bottom: 30, left: 30 };

export default class BarChart {
  constructor({ height, width, data, ref }) {
    this.height = height - margin.top - margin.bottom;
    this.width = width - margin.left - margin.right;
    this.data = data;
    this.svg = d3.select(ref).append("svg");
    this.ref = ref;
  }

  update() {
    const canvas = this.svg
      .attr("width", this.width + margin.left + margin.right)
      .attr("height", this.height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X Axis
    const dates = this.data.map((d) => new Date(d[0]));
    const xAxisValues = d3
      .scaleTime()
      .domain([dates[0], dates[dates.length - 1]])
      .range([0, this.width]);
    const xAxisTicks = d3.axisBottom(xAxisValues);
    canvas
      .append("g")
      .attr("transform", "translate(" + 0 + ", " + this.height + ")")
      .call(xAxisTicks);
  }

  unmount() {
    this.svg.remove();
  }
}
