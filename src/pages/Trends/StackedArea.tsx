import { StackedAreaChart } from "@carbon/charts-react";
import {
  ScaleTypes,
  ToolbarControl,
  ToolbarControlTypes,
} from "@carbon/charts/interfaces";

const controls: ToolbarControl[] = [
  { type: ToolbarControlTypes.SHOW_AS_DATATABLE },
  { type: ToolbarControlTypes.MAKE_FULLSCREEN },
  { type: ToolbarControlTypes.RESET_ZOOM },
  { type: ToolbarControlTypes.EXPORT_JPG },
  { type: ToolbarControlTypes.EXPORT_PNG },
];

const options = {
  title: "Number of Vaccinations by Dose Type in the Last 30 Days",
  axes: {
    left: {
      stacked: true,
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
  toolbar: {
    enabled: true,
    numberOfIcons: 3,
    controls,
  },
  zoomBar: {
    top: {
      enabled: true,
    },
  },
  height: "400px",
};

const StackedArea = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>Stacked Area Chart</h1>
      <StackedAreaChart data={data} options={options} />
    </div>
  );
};

export default StackedArea;
