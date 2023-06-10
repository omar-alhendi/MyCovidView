import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { trendsLoader } from "../../loaders";
import "../../styles/chart-bg.css";

// line, area, scatter plots
const TrendsPage = () => {
  const {
  } = useLoaderData() as LoaderData<typeof trendsLoader>;

  return (
    <div>
      <div className="chart-bg">
      </div>
    </div>
  );
};

export default TrendsPage;
