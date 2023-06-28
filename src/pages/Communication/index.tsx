import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { communicationLoader } from "../../loaders";
import RecoverTrend from "./RecoverTrend";
import ActiveNewCases from "./ActiveNewCases";

const Group2Page = () => {
  const { stackedLineData, comboChartData } = useLoaderData() as LoaderData<
    typeof communicationLoader
  >;
  return (
    <div>
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
      <RecoverTrend data={stackedLineData} />
    </div>
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
    <ActiveNewCases data={comboChartData} />
  </div>
  </div>
  );
};
export default Group2Page;
