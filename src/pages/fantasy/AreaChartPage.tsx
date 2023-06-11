import { AreaChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";
import "@carbon/charts/styles.css";
import "@carbon/styles/css/styles.css";

//first ver
// const options = {
//   "title": "Area Chart (2022 Active COVID-19 Cases)",
// 	"axes": {
// 		"bottom": {
// 			"title": "Active COVID-19 Cases",
// 			"mapsTo": "date",
// 			"scaleType": ScaleTypes.TIME
// 		},
// 		"left": {
// 			"mapsTo": "value",
// 			"scaleType": ScaleTypes.LINEAR
// 		}
// 	},
// 	"curve": "curveNatural",
// 	"height": "400px"
// };

// const AreaChartPage = () => {
//   const data = [
//     {
//       "group": "Dataset 1",
//       "date": "2022-01-04T16:00:00.000Z",
//       "value": 39733
//     },
//     {
//       "group": "Dataset 1",
//       "date": "2022-02-26T16:00:00.000Z",
//       "value": 293224
//     },
//     {
//       "group": "Dataset 1",
//       "date": "2022-03-31T16:00:00.000Z",
//       "value": 220862
//     },
//     {
//       "group": "Dataset 1",
//       "date": "2022-04-30T16:00:00.000Z",
//       "value": 45580
//     },
//     {
//       "group": "Dataset 1",
//       "date": "2022-05-31T16:00:00.000Z",
//       "value": 23153
//     },
//     {
//       "group": "Dataset 1",
//       "date": "2022-06-31T16:00:00.000Z",
//       "value": 28716
//     },
//     {
//       "group": "Dataset 1",
//       "date": "2022-07-31T16:00:00.000Z",
//       "value": 47016
//     },
//     {
//       "group": "Dataset 1",
//       "date": "2022-08-31T16:00:00.000Z",
//       "value": 30992
//     },
//     {
//       "group": "Dataset 1",
//       "date": "2022-09-30T16:00:00.000Z",
//       "value": 24714
//     },
//     {
//       "group": "Dataset 1",
//       "date": "2022-10-31T16:00:00.000Z",
//       "value": 31365
//     }
//   ];

//   return (
//     <div>
//       {/* <h1>my covid view</h1> */}
//       <AreaChart data= {data} options = {options} />
//     </div>
//   );
// };

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