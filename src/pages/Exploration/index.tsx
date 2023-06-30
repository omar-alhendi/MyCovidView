import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { explorationLoader } from "../../loaders";
import ScatterPlotPage from "./ScatterPlotPage";
import HeatMap from "./HeatMap";

const ExplorationPage = () => {
  const { scatterPlotData, heatMapData } = useLoaderData() as LoaderData<
    typeof explorationLoader
  >;
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
    </div>
  );
};

export default ExplorationPage;
