import { StackedBarChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";

const options = {
  title:
    "Percentage of Vaccinated People in Malaysian States",
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
const ProgressBar = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>Horizontal Progress Bar Chart</h1>
      <StackedBarChart data={data} options={options} />
    </div>
  );
};

export default ProgressBar;
