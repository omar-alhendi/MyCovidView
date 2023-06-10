import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { trendsLoader } from "../../loaders";
import StackedLine from "./StackedLine";
import "../../styles/chart-bg.css";
import StackedArea from "./StackedArea";
import Combo from "./Combo";

// line, area, scatter plots
const TrendsPage = () => {
  const {
    stackedLineData,
    stackedAreaData,
    comboData
  } = useLoaderData() as LoaderData<typeof trendsLoader>;

  return (
    <div>
      <div className="chart-bg">
        <StackedLine data={stackedLineData} />
      </div>
      <div className="chart-bg">
        <StackedArea data={stackedAreaData} />
      </div>
      <div className="chart-bg">
        <Combo data={comboData} />
      </div>
    </div>
  );
};

export default TrendsPage;
