import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { trendIdentificationLoader } from "../../loaders";
import Line from "./Line";
import Area from "./Area";
import ScatterPlot from "./ScatterPlot";
import "../../styles/chart-bg.css";

// line, area, scatter plots
const TrendIdentificationPage = () => {
  const { lineData, areaData, scatterPlotData } = useLoaderData() as LoaderData<
    typeof trendIdentificationLoader
  >;

  return (
    <div>
      <div className="chart-bg">
        <Line data={lineData} />
      </div>
      <div className="chart-bg">
        <Area data={areaData} />
      </div>
      <div className="chart-bg">
        <ScatterPlot data={scatterPlotData} />
      </div>
    </div>
  );
};

export default TrendIdentificationPage;
