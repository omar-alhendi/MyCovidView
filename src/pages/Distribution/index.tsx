import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { distributionLoader } from "../../loaders";
import BoxPlot from "./BoxPlot.tsx";
import Donut from "./Donut.tsx";
import Histogram from "./Histogram.tsx";
import "../../styles/chart-bg.css";

const DistributionPage = () => {
  const {
    boxPlotData,
    donutData,
    histogramData
  } = useLoaderData() as LoaderData<typeof distributionLoader>;

  return (
    <div>
      <div className="chart-bg">
        <BoxPlot data={boxPlotData} />
      </div>
      <div className="chart-bg">
        <Donut data={donutData} />
      </div>
      <div className="chart-bg">
        <Histogram data={histogramData} />
      </div>
    </div>
  );
};
export default DistributionPage;
