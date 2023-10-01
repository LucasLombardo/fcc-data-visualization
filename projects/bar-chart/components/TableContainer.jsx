import { useState } from "react";
import { formatNumBillions, dateToQuarter } from "../../../shared/utils";
import Table from "./Table";
import ToggleTests from "./ToggleTests";

const TableContainer = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isYearly, setIsYearly] = useState(true);
  let tableData = formatData(data, { yearly: isYearly });

  return (
    <div>
      <div className="controls">
        <button
          aria-controls="data-table"
          aria-expanded={isExpanded}
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          {...(isExpanded && { className: "active" })}
        >
          {isExpanded ? "Hide" : "Show"} Data Table
        </button>
        <ToggleTests testId="bar-chart" />
      </div>

      <div
        id="data-table"
        role="region"
        tabIndex="-1"
        className="data-table"
        display={isExpanded ? "block" : "none"}
      >
        {isExpanded && (
          <>
            <h2>
              Data Table: {isYearly ? "Yearly" : "Quarterly"} GDP in USD
              Billions
            </h2>
            <button onClick={() => setIsYearly(!isYearly)}>
              Switch to {isYearly ? "Quarterly" : "Yearly"}
            </button>
            <div className="table-wrapper">
              <Table data={tableData} chunkLength={35} />
            </div>
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
