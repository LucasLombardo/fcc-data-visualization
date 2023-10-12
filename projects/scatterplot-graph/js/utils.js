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
