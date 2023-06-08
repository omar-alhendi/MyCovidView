import { LoaderFunction } from "react-router-dom";
import {
  progressBarLoader,
  icuCapacityMeterLoader,
  testPositiveLoader,
} from "./feedback";
import { boxPlotLoader, histogramLoader } from "./distribution";
import { vacRateLoader, deathRateLoader } from "./group11";
import {
  lollipopChartLoader,
  stackedAreaLoader,
  donutChartLoader,
} from "./group5";
import { treeMapLoader, sunburstLoader } from "./impact";
import { stackedLineLoader, comboChartLoader } from "./group2";
import { casesLoader, testsLoader } from "./group13";

export const feedbackLoader = (async (): Promise<any> => {
  const icuCapacityMeterData = await icuCapacityMeterLoader();
  const testPositiveGaugeData = await testPositiveLoader();
  const progresssBarData = await progressBarLoader();
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

export const distributionLoader = (async (): Promise<any> => {
  const boxPlotData = await boxPlotLoader();
  const histogramData = await histogramLoader();
  return { boxPlotData, histogramData };
}) satisfies LoaderFunction;

export const group13Loader = (async (): Promise<any> => {
  const balancedData = await testsLoader();
  const kpiData = await casesLoader();
  return { balancedData, kpiData };
}) satisfies LoaderFunction;
