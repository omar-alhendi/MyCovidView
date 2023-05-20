import "../App.css";
import { useLoaderData } from "react-router-dom";
import { StackedBarChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";

const options = {
  title: "Horizontal stacked bar (discrete)",
  axes: {
    left: {
      scaleType: ScaleTypes.LABELS,
    },
    bottom: {
      stacked: true,
    },
  },
  height: "400px",
};
const Feedback = () => {
  const { data }: any = useLoaderData();

  console.log(data, "from the loader data");

  return (
    <div>
      <StackedBarChart data={data} options={options} />
    </div>
  );
};

export default Feedback;
