import { AreaChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";
import "@carbon/charts/styles.css";
import "@carbon/styles/css/styles.css";

const options = {
  "title": "Area (time series - natural curve)",
	"axes": {
		"bottom": {
			"title": "2019 Annual Sales Figures",
			"mapsTo": "date",
			"scaleType": ScaleTypes.TIME
		},
		"left": {
			"mapsTo": "value",
			"scaleType": ScaleTypes.LINEAR
		}
	},
	"curve": "curveNatural",
	"height": "400px"
};

const AreaChartPage = () => {
  const data = [
    {
      "group": "Dataset 1",
      "date": "2018-12-31T16:00:00.000Z",
      "value": 0
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-05T16:00:00.000Z",
      "value": -37312
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-07T16:00:00.000Z",
      "value": -22392
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-14T16:00:00.000Z",
      "value": -52576
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-18T16:00:00.000Z",
      "value": 20135
    },
    {
      "group": "Dataset 2",
      "date": "2018-12-31T16:00:00.000Z",
      "value": 47263
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-04T16:00:00.000Z",
      "value": 14178
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-07T16:00:00.000Z",
      "value": 23094
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-12T16:00:00.000Z",
      "value": 45281
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-18T16:00:00.000Z",
      "value": -63954
    }
  ];

  return (
    <div>
      <h1>my covid view</h1>
      <AreaChart data= {data} options = {options} />
    </div>
  );
};

export default AreaChartPage;