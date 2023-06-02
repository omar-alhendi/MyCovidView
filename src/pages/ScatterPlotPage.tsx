import { useLoaderData } from "react-router-dom";
import { ScatterChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";
import "@carbon/charts/styles.css";
import "@carbon/styles/css/styles.css";
import { LoaderData } from "../types";
import { feedbackLoader } from "../loaders";

const options = {
  "title": "Scatter (time series)",
	"axes": {
		"bottom": {
			"title": "2019 Annual Sales Figures",
			"scaleType": ScaleTypes.TIME,
			"mapsTo": "date"
		},
		"left": {
			"mapsTo": "value"
		}
	},
	"height": "400px"
};

const ScatterPlotPage = () => {
  const data = [
    {
      "group": "Dataset 1",
      "date": "2018-12-31T16:00:00.000Z",
      "value": 50000,
      "surplus": 1153736069.6409326
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-04T16:00:00.000Z",
      "value": 65000,
      "surplus": 271680143.2078235
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-07T16:00:00.000Z",
      "value": null,
      "surplus": 1863.0001351787273
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-12T16:00:00.000Z",
      "value": 49213,
      "surplus": 813894077.4221452
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-16T16:00:00.000Z",
      "value": 51213,
      "surplus": 807046092.0921923
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-01T16:00:00.000Z",
      "value": 0,
      "surplus": 14890.355092115668
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-05T16:00:00.000Z",
      "value": 57312,
      "surplus": 685014040.9205244
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-07T16:00:00.000Z",
      "value": 27432,
      "surplus": 1881011.7473168145
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-14T16:00:00.000Z",
      "value": 70323,
      "surplus": 1357778793.3400106
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-18T16:00:00.000Z",
      "value": 21300,
      "surplus": 5609767.383210559
    },
    {
      "group": "Dataset 3",
      "date": "2018-12-31T16:00:00.000Z",
      "value": 40000,
      "surplus": 970075463.719182
    },
    {
      "group": "Dataset 3",
      "date": "2019-01-04T16:00:00.000Z",
      "value": null,
      "surplus": 12102.941741195367
    },
    {
      "group": "Dataset 3",
      "date": "2019-01-07T16:00:00.000Z",
      "value": 18000,
      "surplus": 148206448.04005167
    },
    {
      "group": "Dataset 3",
      "date": "2019-01-12T16:00:00.000Z",
      "value": 39213,
      "surplus": 612545567.6186209
    },
    {
      "group": "Dataset 3",
      "date": "2019-01-16T16:00:00.000Z",
      "value": 61213,
      "surplus": 820007417.347907
    },
    {
      "group": "Dataset 4",
      "date": "2019-01-01T16:00:00.000Z",
      "value": 20000,
      "surplus": 313414421.8792354
    },
    {
      "group": "Dataset 4",
      "date": "2019-01-05T16:00:00.000Z",
      "value": 37312,
      "surplus": 342269328.26256466
    },
    {
      "group": "Dataset 4",
      "date": "2019-01-07T16:00:00.000Z",
      "value": 51432,
      "surplus": 416105780.2766757
    },
    {
      "group": "Dataset 4",
      "date": "2019-01-14T16:00:00.000Z",
      "value": 25332,
      "surplus": 57984722.811518274
    },
    {
      "group": "Dataset 4",
      "date": "2019-01-18T16:00:00.000Z",
      "value": null,
      "surplus": 20158.39913658234
    }
  ];

  return (
    <div>
      <h1>my covid view</h1>
      <ScatterChart data= {data} options = {options} />
    </div>
  );
};

export default ScatterPlotPage;
