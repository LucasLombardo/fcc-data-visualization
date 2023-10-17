import { MONTHS } from "./constants";

export function createDataTable(data) {
  const container = document.querySelector(".data-table-wrapper");
  const rows = data.reduce(
    (acc, d, i) => {
      if (i % 12 === 0) acc[0].push(d.year);
      acc[d.month].push(d.variance);
      return acc;
    },
    [...new Array(13)].map(() => []),
  );
  const shortMonths = MONTHS.map((m) => {
    return m === "September" ? "Sept" : m.slice(0, 3);
  });
  container.innerHTML = `
      <table>
        <thead>
          <tr>
          <th></th>
            ${rows[0].map((year) => `<th>${year}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
            ${rows
              .slice(1)
              .map((row, i) => {
                return `<tr>
                    <th>${shortMonths[i]}</th>
                    ${row
                      .map(
                        (variance) =>
                          `<td>${Math.round(variance * 100) / 100}</td>`,
                      )
                      .join("")}
                </tr>`;
              })
              .join("")}
        </tbody>
      </table>
     `;
}
