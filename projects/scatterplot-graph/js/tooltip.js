import { splitSentance } from "./utils";
import { getTextWidth } from "../../../shared/utils.js";

import { max } from "d3";
export default class Tooltip {
  constructor({ canvas }) {
    this.tooltip = canvas.append("g").attr("id", "tooltip");
    this.container = this.tooltip
      .append("polygon")
      .attr("class", "tooltip-container");
    this.text = this.tooltip.append("text").attr("class", "tooltip-text");
    this.textLength = 30;
  }

  hide() {
    this.tooltip.attr("opacity", 0);
    this.tooltip.attr("display", "none");
  }

  show({ width: cWidth, d, x, y }) {
    this._setText(d);
    let height = 55,
      width = this.textWidth + 65;
    if (d.Doping) height += 45;

    const padding = 2;
    const initialX = x - width / padding;
    const maxX = cWidth - width - padding;
    let offsetX = 0;
    if (initialX < padding) offsetX = initialX - padding;
    if (initialX > maxX) offsetX = initialX - maxX;
    const initialY = y - height - 12;
    const flipContainer = initialY < 0;

    this.tooltip
      .attr("opacity", 1)
      .attr("display", "block")
      .attr("data-year", new Date(`${d.Year}-01-01T00:00:00.000Z`))
      .attr(
        "transform",
        `translate(${Math.min(Math.max(initialX, padding), maxX)}, ${
          flipContainer ? initialY + height + 35 : initialY
        })`,
      );

    this.container
      .attr(
        "points",
        `0,0 0,${height - 10} ${width / 2 - 5 + offsetX},${height - 10} ${
          width / 2 + offsetX
        },${height} ${width / 2 + offsetX + 5},${height - 10} ${width},${
          height - 10
        } ${width},0`,
      )
      .attr("class", "tooltip-container")
      .attr(
        "transform",
        flipContainer ? `scale(1 -1) translate(0 -${height - 10})` : null,
      );
  }

  _setText(d) {
    const texts = [
      `<tspan class="bold">${d.Name}</tspan> - ${d.Nationality}`,
      `<tspan class="bold">Year:</tspan> ${d.Year} <tspan class="bold">Time:</tspan> ${d.Time}`,
      ...(d.Doping && splitSentance(d.Doping)),
    ];
    this.textWidth = max(texts, (t) => {
      const rawText = t.replace(/<[^>]+>/g, "");
      return getTextWidth(rawText, "Inter", "12px");
    });
    const x = 10;
    const y = 16;
    const yPad = 20;
    this.text.html(`
        <tspan x="${x}" y="${y}">${texts[0]}</tspan>
        <tspan x="${x}" y="${y + yPad}">${texts[1]}</tspan>
        ${d.Doping && `<tspan x="${x}" y="${y + yPad * 2}">${texts[2]}</tspan>`}
        ${d.Doping && `<tspan x="${x}" y="${y + yPad * 3}">${texts[3]}</tspan>`}
    `);
  }
}
