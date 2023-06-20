import { LoaderFunction } from "react-router-dom";
import {
  progressBarLoader,
  icuCapacityMeterLoader,
  testPositiveLoader,
} from "./feedback";
import { stackedLineLoader, comboChartLoader } from "./communication";
import {
  barLoader,
  columnLoader,
  lollipopLoader,
  stackedBarLoader,
} from "./comparison";
import { boxPlotLoader, donutLoader, histogramLoader } from "./distribution";
import { boxPlotLoader1, heatMapLoader, scatterPlotLoader } from "./patterns";
import { vacRateLoader, barChartLoader } from "./ranking";
import { deathRateLoader, stackedAreaLoader } from "./proportion";
import { treeMapLoader, sunburstLoader } from "./composition";
import { dendrogramLoader } from "./clustering";
import { casesLoader, testsLoader } from "./evaluation";
import { areaLoader, lineLoader } from "./trendIdentification";
import { heatmapLoader } from "./correlation";

export const feedbackLoader = (async (): Promise<any> => {
  const icuCapacityMeterData = await icuCapacityMeterLoader();
  const testPositiveGaugeData = await testPositiveLoader();
  const progresssBarData = await progressBarLoader();
  return { progresssBarData, icuCapacityMeterData, testPositiveGaugeData };
}) satisfies LoaderFunction;

export const communicationLoader = (async (): Promise<any> => {
  const stackedLineData = await stackedLineLoader();
  const comboChartData = await comboChartLoader();
  return { stackedLineData, comboChartData };
}) satisfies LoaderFunction;

export const comparisonLoader = (async (): Promise<any> => {
  const barData = await barLoader();
  const columnData = await columnLoader();
  const stackedBarData = await stackedBarLoader();
  const stackedLineData = await stackedLineLoader();
  const lollipopData = await lollipopLoader();
  return { barData, columnData, stackedBarData, stackedLineData, lollipopData };
}) satisfies LoaderFunction;

export const trendIdentificationLoader = (async (): Promise<any> => {
  const lineData = await lineLoader();
  const areaData = await areaLoader();
  const scatterPlotData = await scatterPlotLoader();
  return { lineData, areaData, scatterPlotData };
}) satisfies LoaderFunction;

export const correlationLoader = (async (): Promise<any> => {
  const scatterPlotData = await scatterPlotLoader();
  const heatmapData = await heatmapLoader();
  return { scatterPlotData, heatmapData };
}) satisfies LoaderFunction;

export const distributionLoader = (async (): Promise<any> => {
  const boxPlotData = await boxPlotLoader();
  const donutData = await donutLoader();
  const histogramData = await histogramLoader();
  return { boxPlotData, donutData, histogramData };
}) satisfies LoaderFunction;

export const patternsLoader = (async () => {
  const heatMapData = await heatMapLoader();
  const boxPlotData = await boxPlotLoader1();
  const scatterPlotData = await scatterPlotLoader();
  return { heatMapData, boxPlotData, scatterPlotData };
}) satisfies LoaderFunction;

export const rankingLoader = (async () => {
  const vacRateData = await vacRateLoader();
  const deathRateData = await deathRateLoader();
  const barChartData = await barChartLoader();
  return { vacRateData, deathRateData, barChartData };
}) satisfies LoaderFunction;

export const proportionLoader = (async () => {
  const deathRateData = await deathRateLoader();
  const donutData = await donutLoader();
  const stackedAreaData = await stackedAreaLoader();
  return { deathRateData, donutData, stackedAreaData };
}) satisfies LoaderFunction;

export const compositionLoader = (async () => {
  const deathRateData = await deathRateLoader();
  const treeMapData = await treeMapLoader();
  const sunburstData = await sunburstLoader();
  return { deathRateData, treeMapData, sunburstData };
}) satisfies LoaderFunction;

export const explorationLoader = (async () => {
  const heatMapData = await heatMapLoader();
  const scatterPlotData = await scatterPlotLoader();
  return { heatMapData, scatterPlotData };
}) satisfies LoaderFunction;

export const anomalyDetectionLoader = (async () => {
  const heatMapData = await heatMapLoader();
  const scatterPlotData = await scatterPlotLoader();
  const boxPlotData = await boxPlotLoader();
  return { heatMapData, scatterPlotData, boxPlotData };
}) satisfies LoaderFunction;

export const clusteringLoader = (async () => {
  const scatterPlotData = await scatterPlotLoader();
  const dendrogramD = await dendrogramLoader();
  return { scatterPlotData, dendrogramD };
}) satisfies LoaderFunction;

export const evaluationLoader = (async () => {
  const kpiData = await casesLoader();
  const balancedData = await testsLoader();
  return { kpiData, balancedData };
}) satisfies LoaderFunction;
