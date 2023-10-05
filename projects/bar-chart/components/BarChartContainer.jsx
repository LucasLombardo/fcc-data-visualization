import { useEffect, useRef } from "react";
import { data } from "../../../data/quarterly-gdp-usa.json";
import TableContainer from "./TableContainer";
import BarChart from "./BarChart";

const BarChartContainer = () => {
  const containerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    chartRef.current = new BarChart({
      height: 400,
      width: 700,
      data: data,
      ref: containerRef.current,
    });

    chartRef.current.update();

    return () => chartRef.current.unmount();
  }, []);

  return (
    <>
      <div ref={containerRef}></div>
      <TableContainer data={data} />
    </>
  );
};

export default BarChartContainer;
