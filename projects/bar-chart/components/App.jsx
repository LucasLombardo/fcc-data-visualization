import BarChartContainer from "./BarChartContainer";

const App = () => (
  <main>
    <h1>Data Visualization Project 1</h1>
    <p>Visualize Data with a Bar Chart</p>
    <section className="chart-section">
      <h2 id="title">United States Gross Domestic Product</h2>
      <p>(Units in USD Billions, 1947-2015)</p>
      <p id="gdp-chart-alt" className="sr-only">
        Chart of US GDP from 1947 to 2015, shows quarterly amounts in USD
        billions. GDPs increase from 243B in 1947 to 18T in 2015, rising in an
        upward concave with a slight dip between 2008 and 2010.
      </p>
      <div className="content">
        <BarChartContainer />
      </div>
    </section>
  </main>
);

export default App;
