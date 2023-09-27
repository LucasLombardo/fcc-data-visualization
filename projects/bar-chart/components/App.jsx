import BarChartContainer from "./BarChartContainer";
import ToggleTests from "./ToggleTests";

const App = () => (
  <main>
    <h1 id="title">US GDP Bar Chart</h1>
    <section className="content">
      <BarChartContainer />
    </section>
    <ToggleTests testId="bar-chart" />
  </main>
);

export default App;
