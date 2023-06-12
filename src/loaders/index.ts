import { LoaderFunction } from "react-router-dom";
import { fetcher } from "../utils";
import {
  icuCapacityMeterLoader,
  progressBarLoader,
  testPositiveLoader,
} from "./feedback";
import { vacRateLoader, deathRateLoader } from "./group11";
import {
  lollipopChartLoader,
  stackedAreaLoader,
  donutChartLoader,
} from "./group5";
import { treeMapLoader, sunburstLoader } from "./impact";
import { stackedLineLoader, comboChartLoader } from "./group2";


export const feedbackLoader = (async (): Promise<any> => {
  const progresssBarData = await progressBarLoader();
  const icuCapacityMeterData = await icuCapacityMeterLoader();
  const testPositiveGaugeData = await testPositiveLoader();
  return { progresssBarData, icuCapacityMeterData, testPositiveGaugeData };
}) satisfies LoaderFunction;

export const group11Loader = (async (): Promise<any> => {
  const vacRateData = await vacRateLoader();
  const deathRateData = await deathRateLoader();
  return { vacRateData, deathRateData };
}) satisfies LoaderFunction;

export const group5Loader = (async (): Promise<any> => {
  const lollipopData = await lollipopChartLoader();
  const stackedAreaData = await stackedAreaLoader();
  const donutData = await donutChartLoader();
  return { lollipopData, stackedAreaData, donutData };
}) satisfies LoaderFunction;

export const impactLoader = (async (): Promise<any> => {
  const treeMapData = await treeMapLoader();
  const sunburstData = await sunburstLoader();
  return { treeMapData, sunburstData };
}) satisfies LoaderFunction;

export const group2Loader = (async (): Promise<any> => {
  const stackedLineData = await stackedLineLoader();
  const comboChartData = await comboChartLoader();
  return { stackedLineData, comboChartData };
}) satisfies LoaderFunction;



/*
export const lineChartLoader = (async (): Promise<ChartData> => {
  const response = await fetch('https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/cases_malaysia.csv');
  const csvData = await (response as Response).text();

  const parsedData = Papa.parse(csvData, { header: true });
  const chartData = parsedData.data.map((row:any) => parseFloat(row['cases_new']));
  const chartLabels = parsedData.data.map((row:any) => row['date']);

  return {
    chartData,
    chartLabels,
  };
})satisfies LoaderFunction;;*/
/*
export const lineChartLoader = (async (): Promise<any[]> => {
  const districtData = await fetcher("epidemic/cases_malaysia.csv");
  const lineChartData: any[] = (districtData as any[]).reduce(
    (result: any, row: any) => {
      const { date, cases_new } = row;

      if (!date || !cases_new) {
        return result;
      }

      result.push({
        date: new Date(date), // Assuming the date is in a valid format
        cases_new: parseInt(cases_new, 10),
      });

      return result;
    },
    []
  );

  return lineChartData;
}
/*
export const lineChartLoader = (async (): Promise<any[]> => {
  const districtData = await fetcher("epidemic/cases_malaysia.csv");
  const lineChartData: any[] = (districtData as any[]).reduce(
    (result: any, row: any) => {
      const { date, cases_active, cases_new } = row;

      if (!date || !cases_active || !cases_new) {
        return result;
      }

      result.push({
        date: new Date(date), // Assuming the date is in a valid format
        cases_active: parseInt(cases_active, 10),
        cases_new: parseInt(cases_new, 10),
      });

      return result;
    },
    []
  );

  return lineChartData;
}) satisfies LoaderFunction;
*/

/*export const lineChartLoader = (async (): Promise<any[]> => {
  const districtData = await fetcher("epidemic/cases_malaysia.csv");
  
  // Process the CSV data and obtain the desired columns
  const processedData = districtData.map((row: any) => {
    const date = row["date"];
    const newcases = row["cases_new"];
    const activecases = row["cases_active"];
    // Add more columns as needed
    
    return { date, newcases, activecases };
  });
  
  return processedData;
}) satisfies LoaderFunction; */

export const lineChartLoaders = (async (): Promise<any[]> => {
  console.log('Fetching CSV data...');
  const districtData = await fetcher("epidemic/cases_malaysia.csv");
  console.log('Fetched CSV data:', districtData);

  // Process the CSV data and obtain the desired columns
  const processedData = districtData.map((row: any) => {
    const date = row["date"];
    const newcases = parseInt(row["cases_new"]);
    
    // Add more columns as needed

    return { "group":"new cases", "date":date, "value":newcases };
  });

  console.log('Processed data:', processedData);

  return processedData;
}) satisfies LoaderFunction;
