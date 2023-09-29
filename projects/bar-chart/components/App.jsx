import BarChartContainer from "./BarChartContainer";
import ToggleTests from "./ToggleTests";

const App = () => (
  <main>
    <h2 id="title">United States Gross Domestic Product</h2>
    <h3>(Units in USD Billions, 1947-2015)</h3>
    <section className="content">
      <BarChartContainer />
    </section>
    <ToggleTests testId="bar-chart" />
  </main>
);

export default App;
