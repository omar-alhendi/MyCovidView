import VaccinationProgress from "./VaccinationProgress";
import IcuCapacityMeter from "./IcuCapacityMeter";
import TestPositiveGauge from "./TestPositiveGauge";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { feedbackLoader } from "../../loaders";

const FeedbackPage = () => {
  const { progresssBarData, icuCapacityMeterData, testPositiveGaugeData } =
    useLoaderData() as LoaderData<typeof feedbackLoader>;
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
      <VaccinationProgress data={progresssBarData} />
      <TestPositiveGauge data={testPositiveGaugeData} />
      <IcuCapacityMeter data={icuCapacityMeterData} />
    </div>
  );
};

export default FeedbackPage;
