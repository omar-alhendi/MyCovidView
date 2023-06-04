import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { distributionLoader } from "../../loaders";
import BoxPlot from "./BoxPlot.tsx";
import Histogram from "./Histogram.tsx";

const DistributionPage = () => {
  const { boxPlotData, histogramData } = useLoaderData() as LoaderData<
    typeof distributionLoader
  >;
  return (
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
      <Histogram data={histogramData} />
    </div>
  );
};

export default DistributionPage;