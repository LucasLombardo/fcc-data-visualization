import { sleep } from "../../../shared/utils";

export function getMargins(d3El) {
  const [top, right, bottom, left] = d3El
    .attr("data-margins")
    .toString()
    .split(" ")
    .map(Number);
  return { top, right, bottom, left };
}

export function getDimensions(d3El, margin) {
  const [fullWidth, fullHeight] = d3El
    .attr("viewBox")
    .toString()
    .split(" ")
    .slice(2)
    .map(Number);
  return {
    width: fullWidth - margin.left - margin.right,
    height: fullHeight - margin.top - margin.bottom,
    fullWidth,
    fullHeight,
  };
}

export function splitSentance(text) {
  for (let i = 0; i < text.length; i++) {
    if (text[i] === " " && text.length / 2 < i) {
      return [text.slice(0, i), text.slice(i + 1)];
    }
  }
}

export function createDataTable(data) {
  const container = document.querySelector("#data-table-container");
  container.innerHTML = `
  <table>
    <thead>
      <tr>
        <th>Year</th>
        <th>Time</th>
        <th>Name</th>
        <th>Nationality</th>
        <th>Doping Accusations</th>
      </tr>
    </thead>
    <tbody>
      ${data
        .map((d) => {
          return `<tr>
        <td>${d.Year}</td>
        <td>${d.Time}</td>
        <td>${d.Name}</td>
        <td>${d.Nationality}</td>
        <td>${d.Doping}</td>
        </tr>`;
        })
        .join("")}
    </tbody>
  </table>
  `;
}

export function setDataTableToggleButton() {
  const toggleBtn = document.querySelector("#data-table-toggle");
  toggleBtn.addEventListener("click", () => {
    const table = document.querySelector("#data-table");
    const active = toggleBtn.classList.contains("active");
    if (active) {
      table.style.display = "none";
      toggleBtn.innerHTML = "Show Data Table";
      toggleBtn.setAttribute("aria-expanded", false);
      toggleBtn.classList.remove("active");
    } else {
      toggleBtn.setAttribute("aria-expanded", true);
      toggleBtn.innerHTML = "Hide Data Table";
      table.style.display = "block";
      toggleBtn.classList.add("active");
    }
  });
}

export function setSvgMeta(svg) {
  svg
    .append("title")
    .html(
      "Scatterplot of 35 Fastest professional cycling times up Alpe d'Huez and whether the times were achieved with doping or not.",
    );
  svg
    .append("desc")
    .html(
      "Scatterplot shows a general trend of slower times from 1994 to 2014, with most of the fastest times being marked as having doping alllegations and most of the recent times without doping allegations being the slowest.",
    );
  svg.append("defs").html(`
    <pattern
      id="striped-fill"
      patternUnits="userSpaceOnUse"
      width="4"
      height="4"
    >
      <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" />
    </pattern>
  `);
}

export async function minimizeFCCTest() {
  await sleep(150);
  const root = document.querySelector("#fcc_test_suite_wrapper").shadowRoot;
  if (root.querySelector(".fcc_hamburger.transform_top")) {
    root.querySelector("#fcc_toggle").click();
  }
}
