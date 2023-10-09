export default class Tooltip {
  constructor({ canvas }) {
    // this.canvas = canvas;
    this.tooltip = canvas.append("g").attr("id", "tooltip");
    this.container = this.tooltip
      .append("polygon")
      .attr("class", "tooltip-container");
    this.text = this.tooltip.append("text");
    this.textLength = 30;
  }

  hide() {
    this.tooltip.attr("opacity", 0);
  }

  show({ width: cWidth, height: cHeight, d, x, y }) {
    let height = 100,
      width = 200;
    console.log({ cWidth, cHeight });
    this._setText(d);

    this.tooltip
      .attr("opacity", 1)
      .attr("data-year", new Date(`${d.Year}-01-01T00:00:00.000Z`))
      .attr("transform", `translate(${x - width / 2}, ${y - height})`);

    this.container
      .attr("points", "0,0 0,90 95,90 100,100 105,90 200,90 200,0")
      .attr("class", "tooltip-container");
  }

  _setText(d) {
    const texts = [
      `${d.Name}: ${d.Nationality}`,
      `Year: ${d.Year} Time: ${d.Time}`,
      d.Doping.slice(0, d.Doping.length / 2),
      d.Doping.slice(d.Doping.length / 2),
    ];
    const x = 10;
    const y = 10;
    const yPad = 30;
    this.text.html(`
        <tspan x="${x}" y="${y}">${texts[0]}</tspan>
        <tspan x="${x}" y="${y + yPad}">${texts[1]}</tspan>
        ${d.Doping && `<tspan x="${x}" y="${y + yPad * 2}">${texts[2]}</tspan>`}
        ${d.Doping && `<tspan x="${x}" y="${y + yPad * 3}">${texts[3]}</tspan>`}
    `);
  }
}
