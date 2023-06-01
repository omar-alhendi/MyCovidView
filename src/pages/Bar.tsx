import { SimpleBarChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
// Or
// import "@carbon/charts/styles/styles.scss";

// IBM Plex should either be imported in your project by using Carbon
// or consumed manually through an import
// import "./plex-and-carbon-components.css";
import { useLoaderData } from "react-router-dom";
import { ScaleTypes, AxisChartOptions } from "@carbon/charts/interfaces";
import "@carbon/charts/styles.css";
import "@carbon/styles/css/styles.css";
import { LoaderData } from "../types";
import { barLoader } from "../loaders";

const options: AxisChartOptions = {
	"title": "Total Death in Each State",
	"axes": {
		"left": {
			"mapsTo": "group",
      "title": "State",
			"scaleType": ScaleTypes.LABELS,
		},
		"bottom": {
      "title": "Total Death",
			"mapsTo": "value"
		}
	},
	"height": "400px",
}

const BarChart = () => {
  const data = useLoaderData() as LoaderData<typeof barLoader>;

	return (
		<SimpleBarChart
			data={data}
			options={options} />
	);
}

export default BarChart;
  