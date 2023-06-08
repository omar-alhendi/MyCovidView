import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { groupGalaxyLoader } from "../../loaders";
import ColumnChart from "./ColumnChart";

const GroupGalaxyPage = () => {
  const { columnChartData } =
    useLoaderData() as LoaderData<typeof groupGalaxyLoader>;
  return (
    <div>
      <div
        style={{
          display: "grid",
          gap: "2rem",
          background: "#b4d0e7",
          padding: "2rem",
          borderRadius: "2rem",
          margin: "2rem",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <ColumnChart data={columnChartData} />
      </div>
    </div>
  );
};

export default GroupGalaxyPage;
