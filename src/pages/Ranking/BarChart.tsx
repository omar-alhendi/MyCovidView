import { SimpleBarChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";

const options = {
  title: "Total Death in Each State",
  axes: {
    left: {
      mapsTo: "group",
      title: "State",
      scaleType: ScaleTypes.LABELS,
    },
    bottom: {
      title: "Total Death",
      mapsTo: "value",
    },
  },
  height: "400px",
};

const BarChart = <T extends Omit<SimpleBarChart["props"], "options">>(
  props: T
) => {
  const { data, ...otherProps } = props;

  return (
    <div>
      <h1>Bar Chart</h1>
      <SimpleBarChart data={data} options={options} {...otherProps} />
    </div>
  );
};

export default BarChart;
