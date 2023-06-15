import { ScatterChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";

const options = {
  title: "Percentage of Vaccinated People in Malaysian States",
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

const ScatterPlot = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>Scatter Plot Chart</h1>
      <ScatterChart data={data} options={options} />
    </div>
  );
};

export default ScatterPlot;
