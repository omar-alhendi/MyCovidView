import { AreaChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";

const options = {
  title: "Number of Vaccinations by Dose Type in The Last 30 Days",
  axes: {
    left: {
      mapsTo: "value",
      title: "Number of Vaccinations",
      scaleType: ScaleTypes.LINEAR,
    },
    bottom: {
      mapsTo: "date",
      title: "Date",
      scaleType: ScaleTypes.TIME,
    },
  },
  curve: "curveNatural",
  height: "400px",
};

const Area = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>Area Chart</h1>
      <AreaChart data={data} options={options} />
    </div>
  );
};

export default Area;
