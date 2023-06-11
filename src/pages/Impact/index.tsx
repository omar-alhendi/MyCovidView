import { impactLoader } from "../../loaders";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import DailyPartialDistrict from "./DailyPartialDistrict";

function ImpactPage() {
  const { treeMapData, sunburstData } = useLoaderData() as LoaderData<
    typeof impactLoader
  >;

  return (
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
      <DailyPartialDistrict
        sunburstData={sunburstData}
        treeMapData={treeMapData}
      />
    </div>
  );
}

export default ImpactPage;
