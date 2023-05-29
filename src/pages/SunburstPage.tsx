import { sunburstLoader } from "../loaders";
import Sunburst from "sunburst-chart";
import { useEffect, useState } from "react";
import { scaleOrdinal, schemePaired } from "d3";

const SunburstPage = () => {
  const [data, setData] = useState({});
  // const data = useLoaderData() as LoaderData<typeof feedbackLoader>;
  const color = scaleOrdinal(schemePaired);

  useEffect(() => {
    const loadChartData = async () => {
      const chartData = await sunburstLoader();
      setData(chartData);
    };

    loadChartData();
  }, []);

  useEffect(() => {
    const chartElement = document.getElementById("chart");

    const updateChart = () => {
      if (chartElement && Object.keys(data).length !== 0) {
        // Clear the existing chart content
        chartElement.innerHTML = "";

        const width = window.innerWidth <= 500 ? 200 : 400;
        const height = window.innerWidth <= 500 ? 200 : 400;

        Sunburst()
          .data(data)
          .width(width)
          .height(height)
          .color((obj) => color(obj.name || ""))(chartElement);
      }
    };

    updateChart();

    const handleResize = () => {
      updateChart();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data, color]);

  return (
    <div>
      <h1>my covid view</h1>
      <p>
        <span style={{ fontWeight: "bold" }}>Sunbursts Chart</span>
        (daily partial of vaccination by districts)
      </p>
      <div id="chart" style={{ textAlign: "center" }} />
    </div>
  );
};

export default SunburstPage;
