import { sunburstLoader } from "../loaders";
import Sunburst from "sunburst-chart";
import { useEffect, useRef } from "react";
import { scaleOrdinal, schemePaired } from "d3";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../types";

const SunburstPage = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const data = useLoaderData() as LoaderData<typeof sunburstLoader>;

  useEffect(() => {
    const chartElement = chartRef.current;
    const updateChart = () => {
      const color = scaleOrdinal(schemePaired);
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
  }, [data]);

  return (
    <div>
      <h1>my covid view</h1>
      <p>
        <span style={{ fontWeight: "bold" }}>Sunbursts Chart</span>
        (daily partial of vaccination by districts)
      </p>
      <div ref={chartRef} style={{ textAlign: "center" }} />
    </div>
  );
};

export default SunburstPage;
