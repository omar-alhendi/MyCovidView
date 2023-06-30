import { LineChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";

const options = {
  title: "Recovered and Active Cases",
  points: {
    enabled: false,
    radius: 3,
  },
  axes: {
    bottom: {
      title: "Date",
      mapsTo: "date",
      scaleType: ScaleTypes.TIME,
    },
    left: {
      mapsTo: "value",
      title: "Cases",
      scaleType: ScaleTypes.LINEAR,
    },
  },
  curve: "curveMonotoneX",
  height: "80vh",
  zoomBar: {
    top: {
      enabled: true,
      initialZoomDomain: [
        //set auto zoom to 365 days before
        new Date(new Date().getFullYear() - 1, 0, 1),
        new Date(), // Set the current date
      ],
    },
  },
};

const StackedLine = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>Stacked Line Chart</h1>
      <LineChart data={data} options={options} />
    </div>
  );
};

export default StackedLine;
