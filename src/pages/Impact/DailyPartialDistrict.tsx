import { useEffect, useRef } from "react";
import { scaleOrdinal, schemePaired } from "d3";
import Sunburst from "sunburst-chart";
import { TreemapChart } from "@carbon/charts-react";
import "@carbon/styles/css/styles.css";
import "@carbon/charts/styles.css";

type DailyPartialDistrictProps = {
  sunburstData: any;
  treeMapData: any;
};

function DailyPartialDistrict({
  sunburstData,
  treeMapData,
}: DailyPartialDistrictProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chartElement = chartRef.current;

    const updateChart = () => {
      const color = scaleOrdinal(schemePaired);
      if (chartElement && Object.keys(sunburstData).length !== 0) {
        // Clear the existing chart content
        chartElement.innerHTML = "";

        const width = window.innerWidth <= 500 ? 200 : 400;
        const height = window.innerWidth <= 500 ? 200 : 400;

        Sunburst()
          .data(sunburstData)
          .width(width)
          .height(height)
          .color((obj) => color(obj.name || ""))(chartElement);
      }
    };

    updateChart();

    const handleResize = () => {
      updateChart(); // Update the sunburst chart on window resize
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sunburstData]);

  const options = {
    title: "Treemap (daily partial of vaccination by districts)",
    height: "400px",
    width: "100%",
  };

  return (
    <div>
      <div style={{ marginBottom: "5rem" }}>
        <h1>Sunburst Chart</h1>
        <p style={{ fontWeight: "bold", marginTop: "1rem" }}>
          Sunburst (daily partial of vaccination by districts)
        </p>
        <div
          ref={chartRef}
          style={{
            textAlign: "center",
            marginTop: "1rem",
            width: 400,
            height: 400,
            margin: "0 auto",
          }}
        />
      </div>
      <div>
        <h1>TreeMap Chart</h1>
        <TreemapChart data={treeMapData} options={options} />
      </div>
    </div>
  );
}

export default DailyPartialDistrict;
