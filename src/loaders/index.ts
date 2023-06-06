import { LoaderFunction } from "react-router-dom";
import {
  icuCapacityMeterLoader,
  progressBarLoader,
  testPositiveLoader,
} from "./feedback";
import { vacRateLoader, deathRateLoader } from "./group11";
import { lollipopChartLoader } from "./group5";
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
  return { lollipopData };
}) satisfies LoaderFunction;

export const impactLoader = (async (): Promise<any> => {
  const treeMapData = await treeMapLoader();
  const sunburstData = await sunburstLoader();
  return { treeMapData, sunburstData };
}) satisfies LoaderFunction;

export const stackedAreaLoader = (async (): Promise<any> => {
  let vaccinationData: any = await fetcher("vaccination/vax_malaysia.csv");
  vaccinationData.pop()
  vaccinationData = vaccinationData.slice(-3);
  
  const groups = ["Partial Dose", "Full Dose", "Booster 1", "Booster 2"];
  const dailyKeys = ["daily_partial", "daily_full", "daily_booster", "daily_booster2"];

  const data = vaccinationData.flatMap((row: any) => 
    groups.map((group, index) => ({
      group,
      date: row["date"],
      value: row[dailyKeys[index]],
    }))
  );

  return data;
}) satisfies LoaderFunction;

export const group2Loader = (async (): Promise<any> => {
  const stackedLineData = await stackedLineLoader();
  const comboChartData = await comboChartLoader();
  return { stackedLineData, comboChartData };
}) satisfies LoaderFunction;