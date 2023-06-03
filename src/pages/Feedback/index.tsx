import React from "react";
import VaccinationProgress from "./VaccinationProgress";
import IcuCapacityMeter from "./IcuCapacityMeter";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../types";
import { feedbackLoader } from "../../loaders";

const FeedbackPage = () => {
  const { progresssBarData, icuCapacityMeterData } =
    useLoaderData() as LoaderData<typeof feedbackLoader>;
  return (
    <div>
      <IcuCapacityMeter data={icuCapacityMeterData} />
      <VaccinationProgress data={progresssBarData} />
    </div>
  );
};

export default FeedbackPage;
