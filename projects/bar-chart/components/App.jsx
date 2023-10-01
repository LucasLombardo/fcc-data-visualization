import BarChartContainer from "./BarChartContainer";

const App = () => (
  <main>
    <h1>Data Visualization Project 1</h1>
    <p>Visualize Data with a Bar Chart</p>
    <section className="chart-section">
      <h2 id="title">United States Gross Domestic Product</h2>
      <p>(Units in USD Billions, 1947-2015)</p>
      <div className="content">
        <BarChartContainer />
      </div>
    </section>
  </main>
);

export default App;
