import { ScatterChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";

const options = {
  title: "Scatter Plot (Percentage of Vaccinated People in Malaysian States)",
  axes: {
    bottom: {
      title: "Percentage of vaccinated people",
      mapsTo: "value",
      scaleType: ScaleTypes.LINEAR,
    },
    left: {
      mapsTo: "group",
      title: "State",
      scaleType: ScaleTypes.LABELS,
    },
  },
  height: "400px",
};

const ScatterPlotPage = ({ data }: { data: any }) => {
  return (
    <div>
      <ScatterChart data={data} options={options} />
    </div>
  );
};

export default ScatterPlotPage;
