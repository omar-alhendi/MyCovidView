import ProgressBar from "./ProgressBar";
import Meter from "./Meter";
import Gauge from "./Gauge";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { feedbackLoader } from "../../loaders";

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
          }}
        >
          <ProgressBar data={progresssBarData} />
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
        <Gauge data={testPositiveGaugeData} />
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
      <Meter data={icuCapacityMeterData} />
    </div>
  </div>
  );
};

export default FeedbackPage;
