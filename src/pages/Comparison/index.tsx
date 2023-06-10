import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { comparisonLoader } from "../../loaders";
import StackedBar from "./StackedBar";
import StackedLine from "./StackedLine";
import Lollipop from "./Lollipop";
import "../../styles/chart-bg.css";
import HorizontalBar from "./HorizontalBar";

// bar, column, stackedBar, stackedLine, lollipop
const ComparisonPage = () => {
  const {
    horizontalBarData,
    stackedBarData,
    stackedLineData,
    lollipopData
  } = useLoaderData() as LoaderData<typeof comparisonLoader>;

  return (
    <div>
      <div className="chart-bg">
        <HorizontalBar data={horizontalBarData} />
      </div>
      <div className="chart-bg">
        <StackedBar data={stackedBarData} />
      </div>
      <div className="chart-bg">
        <StackedLine data={stackedLineData} />
      </div>
      <div className="chart-bg">
        <Lollipop data={lollipopData} />
      </div>
    </div>
  );
};

export default ComparisonPage;
