import { LineChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";

const options = {
  title: "Line Chart (Active COVID-19 Cases)",
  points: {
    enabled: false, //hide data points
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
        new Date(new Date().getFullYear() - 1, 0, 1), //set auto zoom to 365 days before
        new Date(), // Set the current date
      ],
    },
  },
};

const LineChartPage = ({ data }: { data: any }) => {
  return (
    <div>
      <LineChart data={data} options={options} />
    </div>
  );
};

export default LineChartPage;
