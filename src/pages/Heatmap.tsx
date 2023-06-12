import { heatmapLoader } from "../loaders";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../types";
import { HeatmapChart } from "@carbon/charts-react";
import { ColorLegendType } from '@carbon/charts/interfaces/enums';

const options = {
  title: "Heatmap (Type of Dose By Age Group in Malaysia)",
  axes: {
    bottom: {
      title: "Age Group",
      mapsTo: "age_group",
      scaleType: "labels"
    },
    left: {
      title: "Type of Dose",
      mapsTo: "dose",
      scaleType: "labels"
    }
  },
  heatmap: {
    colorLegend: {
      title: "Indicator",
      type: ColorLegendType.QUANTIZE,
    }
  },
  height: "400px"
};

const Heatmap = () => {
  const data = useLoaderData() as LoaderData<typeof heatmapLoader>;
  return <HeatmapChart data={data} options={options} />;
};

export default Heatmap;
