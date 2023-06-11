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
          background: "#e0e0e0",
          padding: "2rem",
          borderRadius: "1rem",
          margin: "2rem",
        }}
      >
        <ColumnChart data={columnChartData} />
      </div>
    </div>
  );
};

export default GroupGalaxyPage;
