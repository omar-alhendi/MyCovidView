import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { compositionLoader } from "../../loaders";
import DeathRate from "./DeathRate";
import DailyPartialDistrict from "./DailyPartialDistrict";

const CompositionPage = () => {
  const { deathRateData, treeMapData, sunburstData } =
    useLoaderData() as LoaderData<typeof compositionLoader>;
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
        <DeathRate data={deathRateData} />
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
        <DailyPartialDistrict
          sunburstData={sunburstData}
          treeMapData={treeMapData}
        />
      </div>
    </div>
  );
};

export default CompositionPage;
