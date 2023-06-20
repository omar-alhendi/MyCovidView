import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { comparisonLoader } from "../../loaders";
import Bar from "./Bar";
import Column from "./Column";
import StackedBar from "./StackedBar";
import StackedLine from "./StackedLine";
import Lollipop from "./Lollipop";
import "../../styles/chart-bg.css";

// bar, column, stackedBar, stackedLine, lollipop
const ComparisonPage = () => {
  const { barData, columnData, stackedBarData, stackedLineData, lollipopData } =
    useLoaderData() as LoaderData<typeof comparisonLoader>;

  return (
    <div>
      <div className="chart-bg">
        <Bar data={barData} />
      </div>
      <div className="chart-bg">
        <Column data={columnData} />
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
