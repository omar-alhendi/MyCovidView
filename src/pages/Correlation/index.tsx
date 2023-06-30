import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { correlationLoader } from "../../loaders";
import ScatterPlot from "./ScatterPlot";
import Heatmap from "./Heatmap";
import "../../styles/chart-bg.css";

const CorrelationPage = () => {
  const { scatterPlotData, heatmapData } = useLoaderData() as LoaderData<
    typeof correlationLoader
  >;

  return (
    <div>
      <div className="chart-bg">
        <ScatterPlot data={scatterPlotData} />
      </div>
      <div className="chart-bg">
        <Heatmap data={heatmapData} />
      </div>
    </div>
  );
};

export default CorrelationPage;
