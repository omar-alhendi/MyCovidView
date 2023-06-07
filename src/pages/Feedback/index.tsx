import VaccinationProgress from "./VaccinationProgress";
import IcuCapacityMeter from "./IcuCapacityMeter";
import TestPositiveGauge from "./TestPositiveGauge";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { feedbackLoader } from "../../loaders";
import styles from "/src/styles/Style.module.css";

const FeedbackPage = () => {
  const { progresssBarData, icuCapacityMeterData, testPositiveGaugeData } =
    useLoaderData() as LoaderData<typeof feedbackLoader>;
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
          // marginBottom: "100px"
        }}>
      <VaccinationProgress data={progresssBarData} /></div>
      
      <div style={{
        display: "grid",
        gap: "2rem",
        background: "#e0e0e0",
        padding: "2rem",
        borderRadius: "1rem",
        margin: "2rem",
        // marginBottom: "100px"
      }}>
      <TestPositiveGauge data={testPositiveGaugeData} /></div>

      <div style={{
        display: "grid",
        gap: "2rem",
        background: "#e0e0e0",
        padding: "2rem",
        borderRadius: "1rem",
        margin: "2rem",
        // marginBottom: "100px"
      }}>
      <IcuCapacityMeter data={icuCapacityMeterData} /></div>
      
    </div>
  );
};

export default FeedbackPage;
