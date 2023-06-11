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
import { fetcher } from "../utils";

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

export const dendrogramLoader = (async (): Promise<any[]> => {
  const data = await fetcher("epidemic/linelist/param_geo.csv");

  const dendrogramData: any[] = data.reduce((result: any[], row: any) => {
    const { state, district, idxd } = row;

    if (!state || !district) {
      return result;
    }

    let stateNode = result.find((node: any) => node.name === state);

    if (!stateNode) {
      stateNode = { name: state, children: [] };
      result.push(stateNode);
    }

    stateNode.children.push({
      name: district,
      idxd: idxd.toString(),
    });

    return result;
  }, []);
  return dendrogramData;
}) satisfies LoaderFunction;

export const heatmapLoader = (async (): Promise<any[]> => {
  const dataset = await fetcher("vaccination/vax_snapshot.csv");
  // Filter the data for the specific state (e.g., Malaysia)
  const filteredData = dataset.filter((row: any) => row.state === "Malaysia");

  // Create the desired array with age_group, dose, and value
  const result = filteredData.map((row: any) => ({
    age_group: row.age_group,
    dose: row.dose,
    value: row.value
  }));

  return result;
}) satisfies LoaderFunction;

