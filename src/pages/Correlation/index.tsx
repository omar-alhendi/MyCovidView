import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { correlationLoader } from "../../loaders";
import "../../styles/chart-bg.css";

// scatter plots, bubble, heat maps
const CorrelationPage = () => {
  const {
  } = useLoaderData() as LoaderData<typeof correlationLoader>;

  return (
    <div>
      <div className="chart-bg">
      </div>
    </div>
  );
};

export default CorrelationPage;
