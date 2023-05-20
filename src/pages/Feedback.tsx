import { useLoaderData } from "react-router-dom";
import { StackedBarChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";
import "@carbon/charts/styles.css";
import "@carbon/styles/css/styles.css";
import { LoaderData } from "../types";
import { feedbackLoader } from "../loaders";

const options = {
  title:
    "Horizontal Progress Bar Chart (percentage of vaccinated people in malaysian states)",
  axes: {
    left: {
      mapsTo: "group",
      title: "State",
      scaleType: ScaleTypes.LABELS,
    },
    bottom: {
      title: "Percentage of vaccinated people",
      mapsTo: "value",
    },
  },
  height: "400px",
};
const Feedback = () => {
  const data = useLoaderData() as LoaderData<typeof feedbackLoader>;

  return (
    <div>
      <h1>my covid view</h1>
      <StackedBarChart data={data} options={options} />
    </div>
  );
};

export default Feedback;
