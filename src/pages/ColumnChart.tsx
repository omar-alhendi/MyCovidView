import { useLoaderData } from "react-router-dom";
import { GroupedBarChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";
import "@carbon/charts/styles.css";
import "@carbon/styles/css/styles.css";
import { LoaderData } from "../types";
import { columnChartLoader } from "../loaders";
import { useState, ChangeEvent } from 'react';
import './ColumnChart.css';

const options = {
  title:
    "Column Chart (percentage of vaccinated people in malaysian states)",
  axes: {
    left: {
      title: "Percentage of vaccinated people (%)",
      mapsTo: "value",
    },
    bottom: {
      padding: {
        inner: 0,
      },
      mapsTo: "key",
      title: "Vaccination Status",
      scaleType: ScaleTypes.LABELS,
    },
  },
  height: "400px",
};
const ColumnChart = () => {
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const handleXAxisChange = (e : ChangeEvent<HTMLInputElement>) => {
    setXAxis(e.target.value);
  };

  const handleYAxisChange = (e : ChangeEvent<HTMLInputElement>) => {
    setYAxis(e.target.value);
  };
  const data = useLoaderData() as LoaderData<typeof columnChartLoader>;
  console.log(data);
  console.log(data.length);

  const flattenedDataArray = data.flat(Infinity);
  console.log(flattenedDataArray);

  return (
    <div>
      <h1>my covid view</h1>
      {/* <input type="text" value={xAxis} placeholder="Enter x-axis variable" onChange={handleXAxisChange} className="input-field"/>
      <input type="text" value={yAxis} placeholder="Enter y-axis variable" onChange={handleYAxisChange} className="input-field"/> */}
      <GroupedBarChart data={flattenedDataArray} options={options} />
    </div>
  );
};

export default ColumnChart;
