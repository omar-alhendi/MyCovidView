import { HeatmapChart } from "@carbon/charts-react";
import { ColorLegendType } from "@carbon/charts";

const options = {
  title: "Type of Dose By Age Group in Malaysia",
  axes: {
    bottom: {
      title: "Age Group",
      mapsTo: "age_group",
      scaleType: "labels",
    },
    left: {
      title: "Type of Dose",
      mapsTo: "dose",
      scaleType: "labels",
    },
  },
  heatmap: {
    colorLegend: {
      title: "Indicator",
      type: ColorLegendType.QUANTIZE,
    },
  },
  height: "400px",
};

const Heatmap = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>Heatmap</h1>
      <HeatmapChart data={data.slice(0, 60)} options={options} />
    </div>
  );
};

export default Heatmap;
