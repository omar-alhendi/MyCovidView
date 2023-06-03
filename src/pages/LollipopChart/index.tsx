import VaccinatedPeople from "./VaccinatedPeople";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { lollipopLoader } from "../../loaders";

const LollipopChartPage = () => {
  const {lollipopData} =
    useLoaderData() as LoaderData<typeof lollipopLoader>;
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
      <VaccinatedPeople data={lollipopData} />
    </div>
  );
};

export default LollipopChartPage;
