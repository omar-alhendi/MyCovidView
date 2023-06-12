import { fantasyLoader } from "../../loaders";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import AreaChartPage from "./AreaChartPage";
import LineChartPage from "./LineChartPage";
import ScatterPlotPage from "./ScatterPlotPage";

const FantasyPage = () => {
  const { areaChartData, lineChartData, scatterPlotData } =
    useLoaderData() as LoaderData<typeof fantasyLoader>;

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
      <AreaChartPage data={areaChartData} />
      <LineChartPage data={lineChartData} />
      <ScatterPlotPage data={scatterPlotData} />
    </div>
  );
};

export default FantasyPage;
