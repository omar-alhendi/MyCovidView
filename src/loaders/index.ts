import { LoaderFunction } from "react-router-dom";
import {
  icuCapacityMeterLoader,
  progressBarLoader,
  testPositiveLoader,
} from "./feedback";
import { vacRateLoader, deathRateLoader } from "./group11";
import { lollipopChartLoader } from "./group5";
import { treeMapLoader, sunburstLoader } from "./impact";

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
