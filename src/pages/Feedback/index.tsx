import VaccinationProgress from "./VaccinationProgress";
import IcuCapacityMeter from "./IcuCapacityMeter";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { feedbackLoader } from "../../loaders";

const FeedbackPage = () => {
  const { progresssBarData, icuCapacityMeterData } =
    useLoaderData() as LoaderData<typeof feedbackLoader>;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        background: "#e0e0e0",
        padding: "2rem",
        borderRadius: "1rem",
        margin: "2rem",
      }}
    >
      <IcuCapacityMeter data={icuCapacityMeterData} />
      <VaccinationProgress data={progresssBarData} />
    </div>
  );
};

export default FeedbackPage;
