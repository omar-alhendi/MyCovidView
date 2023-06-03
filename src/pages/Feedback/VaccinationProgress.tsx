import { StackedBarChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";

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
const VaccinationProgress = ({ data }: { data: any }) => {
  return (
    <div>
      <StackedBarChart data={data} options={options} />
    </div>
  );
};

export default VaccinationProgress;
