import { lineChartLoaders } from "../../loaders/group15";
import { LineChart } from '@carbon/charts-react';
import { LoaderData } from '../../types';
import { ScaleTypes } from "@carbon/charts/interfaces";
import { useState, useEffect } from "react";

  const options = {
    "title": "Linechart (daily new cases)",
    "axes": {
      "bottom": {
        "title": "Linechart (daily new cases)",
        "mapsTo": "date",
        "scaleType": ScaleTypes.TIME
      },
      "left": {
        "mapsTo": "value",
        "title": "cases",
        "scaleType": ScaleTypes.LINEAR
      }
    },
    "curve": "curveMonotoneX",
    "height": "400px"
  };
  const DailyCases = () => {
    const [chartData, setChartData] = useState<any[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        console.log('Fetching data...');
        const data = await lineChartLoaders();
        console.log('Fetched data:', data);
        setChartData(data);
      };
      fetchData();
    }, []);
  
    console.log('chartData:', chartData);
  
    return <LineChart data={chartData} options={options} />;
  };
  
  export default DailyCases;