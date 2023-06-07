
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { feedbackLoader, group2Loader } from "../../loaders";
import RecoverTrend from "./RecoverTrend";
import ActiveNewCases from "./ActiveNewCases";
import { comboChartLoader } from "../../loaders/group2";

const Group2Page = () => {
  const { stackedLineData , comboChartData} =
    useLoaderData() as LoaderData<typeof group2Loader>;
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
        }}>
        <RecoverTrend data={stackedLineData} /></div>
        
        <div
        style={{
          display: "grid",
          gap: "2rem",
          background: "#e0e0e0",
          padding: "2rem",
          borderRadius: "1rem",
          margin: "2rem",
        }}>
        <ActiveNewCases data={comboChartData} /></div>
    </div>
  );
};

export default Group2Page;