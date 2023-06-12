import { group11Loader } from "../../loaders";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import VaccinationRate from "./VaccinationRate";
import DeathRate from "./DeathRate";

function Group11Page() {
  const { vacRateData, deathRateData } = useLoaderData() as LoaderData<
    typeof group11Loader
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
      <VaccinationRate data={vacRateData} />
      <DeathRate data={deathRateData} />
    </div>
  );
}

export default Group11Page;
