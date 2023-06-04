import { lineChartLoaders } from "../loaders";
import { LineChart } from '@carbon/charts-react';
import { LoaderData } from '../types';
import { ScaleTypes } from "@carbon/charts/interfaces";
import { useState, useEffect } from "react";
/*
const options = {
  title: "Linechart(daily new cases)",
  height: "800px",
};

const LineChartPage = () => {
  const data = useLoaderData() as LoaderData<typeof lineChartLoader>;
  return <LineChart data={data} options={options} />;
};

export default LineChartPage;



function useLoaderData(): LoaderData<any> {
  throw new Error('Function not implemented.');
}*/
/*
const LineChartPage: React.FC = () => {
    const [chartData, setChartData] = useState<number[]>([]);
    const [chartLabels, setChartLabels] = useState<string[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await lineChartLoader();
          setChartData(data.chartData);
          setChartLabels(data.chartLabels);
        } catch (error) {
          console.error('Error fetching chart data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const chartConfig = {
      labels: chartLabels,
      datasets: [
        {
          label: 'Number of Cases',
          data: chartData,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  
    return (
      <div>
        <h2>Line Chart</h2>
        <Line data={chartConfig} />
      </div>
    );
  };
  
  export default LineChartPage;
  */

 
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
  const LineChartPage = () => {
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
  
  export default LineChartPage;