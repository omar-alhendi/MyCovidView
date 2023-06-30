import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { anomalyDetectionLoader } from "../../loaders";
import BoxPlot from "./BoxPlot.tsx";
import ScatterPlotPage from "./ScatterPlotPage";
import HeatMap from "./HeatMap";
import "../../styles/chart-bg.css";

const AnomalyDetectionPage = () => {
  const { boxPlotData, scatterPlotData, heatMapData } =
    useLoaderData() as LoaderData<typeof anomalyDetectionLoader>;

  return (
    <div>
      <div
        style={{
          display: "grid",
          gap: "2rem",
          background: "#e0e0e0",
          padding: "2rem",
          borderRadius: "1rem",
          margin: "2rem",
        }}
      >
        <ScatterPlotPage data={scatterPlotData} />
      </div>
      <div
        style={{
          display: "grid",
          gap: "2rem",
          background: "#e0e0e0",
          padding: "2rem",
          borderRadius: "1rem",
          margin: "2rem",
        }}
      >
        <HeatMap data={heatMapData} />
      </div>
      <div
        style={{
          display: "grid",
          gap: "2rem",
          background: "#e0e0e0",
          padding: "2rem",
          borderRadius: "1rem",
          margin: "2rem",
        }}
      >
        <BoxPlot data={boxPlotData} />
      </div>
    </div>
  );
};
export default AnomalyDetectionPage;
