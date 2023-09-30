import { useState } from "react";
import {
  chunkArray,
  formatNumBillions,
  dateToQuarter,
} from "../../../shared/utils";
import Table from "./Table";

const TableContainer = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isYearly, setIsYearly] = useState(true);
  let tableData = formatData(data, { yearly: isYearly });

  return (
    <div>
      <button
        aria-controls="data-table"
        aria-expanded={isExpanded}
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Hide" : "Show"} Data Table
      </button>

      <div
        id="data-table"
        role="region"
        tabIndex="-1"
        display={isExpanded ? "block" : "none"}
      >
        {isExpanded && (
          <>
            <button onClick={() => setIsYearly(!isYearly)}>Yearly</button>
            <Table data={tableData} chunkLength={35} />
          </>
        )}
      </div>
    </div>
  );
};

function formatData(data, options) {
  let result;
  if (options.yearly) {
    result = data
      .reduce((a, [date, gdp]) => {
        const [year] = date.split("-");
        if (a[a.length - 1]?.[0] === year) {
          a[a.length - 1][1] += gdp;
        } else {
          a.push([year, gdp]);
        }
        return a;
      }, [])
      .map(([y, gdp]) => [y, formatNumBillions(gdp)]);
  } else {
    result = data.map((d) => {
      return [dateToQuarter(d[0]), formatNumBillions(d[1])];
    });
  }
  return result;
}

export default TableContainer;
