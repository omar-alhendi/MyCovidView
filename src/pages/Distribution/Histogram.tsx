import { SimpleBarChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";
import "@carbon/charts/styles.css";
import "@carbon/styles/css/styles.css";

const options = {
  title: "Histogram Chart (New Cases by Quarterly Year)",
  axes: {
    bottom: {
      mapsTo: "value",
      title: "New Cases",
    },
    left: {
      mapsTo: "group",
      title: "Year Quarter",
      scaleType: ScaleTypes.LABELS,
    },
  },
  bars: {
    spacingFactor: 0.99,
  },
  height: "400px",
};

const Histogram = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>My Histogram View</h1>
      <SimpleBarChart data={data} options={options} />
    </div>
  );
};

export default Histogram;