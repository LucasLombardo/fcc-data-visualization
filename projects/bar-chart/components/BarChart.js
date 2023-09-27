import * as d3 from "d3";

const margin = { top: 10, right: 20, bottom: 30, left: 50 };

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
      .attr("id", "x-axis")
      .call(xAxisTicks);

    // Y Axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d) => d[1])])
      .range([this.height, 0]);
    const yAxisTicks = d3.axisLeft(y);
    canvas.append("g").attr("id", "y-axis").call(yAxisTicks);
    const x = d3
      .scaleBand() //scales the size of the bars and padding
      .domain(this.data)
      .padding(0)
      .range([0, this.width]);

    // Bars
    this.svg
      .selectAll("rect")
      .data(this.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .attr("width", (d) => x.bandwidth())
      .attr("x", (d) => x(d) + margin.left)
      .attr("height", (d) => this.height - y(d[1]))
      .attr("y", (d) => margin.top + y(d[1]));
  }

  unmount() {
    this.svg.remove();
  }
}
