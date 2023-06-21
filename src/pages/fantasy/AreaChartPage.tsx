import { AreaChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";
import "@carbon/charts/styles.css";
import "@carbon/styles/css/styles.css";

const options = {
  title: "Area chart (Number of vaccinations by dose type in the last 30 days)",
  axes: {
    left: {
      mapsTo: "value",
      title: "Number of vaccinations",
      scaleType: ScaleTypes.LINEAR,
    },
    bottom: {
      mapsTo: "date",
      title: "Date",
      scaleType: ScaleTypes.TIME,
    },
  },
	curve: "curveNatural",
	height: "400px"
};

const AreaChartPage = ({ data }: { data: any }) => {
  return (
    <div>
      <AreaChart data={data} options={options} />
    </div>
  );
};

export default AreaChartPage;