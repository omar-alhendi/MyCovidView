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
import { lineChartLoader, areaChartLoader, scatterPlotLoader } from "./fantasy";
import { columnChartLoader } from "./groupGalaxy";
import { ChartTabularData } from "@carbon/charts/interfaces";

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

export const fantasyLoader = (async (): Promise<any> => {
  const scatterPlotData = await scatterPlotLoader();
  const lineChartData = await lineChartLoader();
  const areaChartData = await areaChartLoader();
  return { scatterPlotData, lineChartData, areaChartData };
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
    value: row.value,
  }));

  return result;
}) satisfies LoaderFunction;

export const groupGalaxyLoader = (async (): Promise<any> => {
  const columnChartData = await columnChartLoader();
  return { columnChartData };
}) satisfies LoaderFunction;

export const barLoader = (async (): Promise<ChartTabularData> => {
  // const vaccinationData = await fetcher("vaccination/vax_state.csv");
  // const populationData = await fetcher("static/population.csv");
  const deathData = await fetcher<{
    date: string,
    state: string,
    deaths_new: string,
    deaths_bid: string,
    deaths_new_dod: string,
    deaths_bid_dod: string,
    deaths_unvax: string,
    deaths_pvax: string,
    deaths_fvax: string,
    deaths_boost: string,
    deaths_tat: string
  }>("epidemic/deaths_state.csv");

  const sumOfDeathForEachState: {[k: string]: number} = {};

  deathData.forEach((row) => {
    const newDeaths = Number(row.deaths_new);
    if (isNaN(newDeaths)) return;
    if (sumOfDeathForEachState[row.state] === undefined) {
      sumOfDeathForEachState[row.state] = Number(row.deaths_new);
    } else {
      sumOfDeathForEachState[row.state] += Number(row.deaths_new);
    }
  });

  const data = Object.keys(sumOfDeathForEachState).map((state) => ({
    group: state,
    value: sumOfDeathForEachState[state],
  }))

  return data;
}) satisfies LoaderFunction;
