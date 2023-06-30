import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { rankingLoader } from "../../loaders";
import BarChart from "./BarChart";
import VaccinationRate from "./VaccinationRate";

const RankingPage = () => {
  const { barChartData, vacRateData } = useLoaderData() as LoaderData<
    typeof rankingLoader
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
        <BarChart data={barChartData} />
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
        <VaccinationRate data={vacRateData} />
      </div>
    </div>
  );
};

export default RankingPage;
