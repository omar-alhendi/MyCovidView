import { HeatmapChart } from "@carbon/charts-react";
import { ColorLegendType } from "@carbon/charts/interfaces/enums";

const options = {
  title: "Type of Dose By Age Group in Malaysia",
  resizable: true,
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

const HeatMap = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>Heat Map</h1>
      <HeatmapChart data={data} options={options} />
    </div>
  );
};

export default HeatMap;
