import { heatmapLoader } from "../loaders";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../types";
import { HeatmapChart } from "@carbon/charts-react";
import "@carbon/styles/css/styles.css";
import "@carbon/charts/styles.css";
import { ColorLegendType } from '@carbon/charts/interfaces/enums';

const options = {
  title: "Heatmap",
  axes: {
    bottom: {
      title: "Letters",
      mapsTo: "letter",
      scaleType: "labels"
    },
    left: {
      title: "Months",
      mapsTo: "month",
      scaleType: "labels"
    }
  },
  heatmap: {
    colorLegend: {
      title: "Legend title",
      type: ColorLegendType.LINEAR,
    }
  },
  height: "400px"
};

const Heatmap = () => {
  const data = useLoaderData() as LoaderData<typeof heatmapLoader>;
  return <HeatmapChart data={data} options={options} />;
};

export default Heatmap;
