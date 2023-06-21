import { BoxplotChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";


const options = {
  title: "Box Plot Chart (New Cases by Quarterly Year)",
  axes: {
    left: {
      mapsTo: "group",
      title: "Year Quarter",
      scaleType: ScaleTypes.LABELS,
    },
    bottom: {
      mapsTo: "value",
      title: "New Cases",
    },
  },

  height: "400px",
};

const BoxPlot = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>My Box Plot View</h1>
      <BoxplotChart data={data} options={options} />
    </div>
  );
};

export default BoxPlot;
