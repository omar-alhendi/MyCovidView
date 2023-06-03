import { fetcher } from "../utils";
import { LoaderFunction } from "react-router-dom";
import {
  icuCapacityMeterLoader,
  progressBarLoader,
  testPositiveLoader,
} from "./feedback";
import {
  vacRateLoader,
  deathRateLoader,
} from "./group11";

import {
  lollipopChartLoader,
} from "./group5";

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
  return { lollipopData};
}) satisfies LoaderFunction;

export const sunburstLoader = (async (): Promise<any> => {
  const districtData = await fetcher("vaccination/vax_district.csv");
  const chartData = districtData.reduce(
    (result: any, row: any) => {
      const { state, district, daily_partial } = row;

      if (!state || !district) {
        return result;
      }

      let stateNode = result.children.find((node: any) => node.name === state);

      if (!stateNode) {
        stateNode = { name: state, children: [] };
        result.children.push(stateNode);
      }

      const districtNode = stateNode.children.find(
        (node: any) => node.name === district
      );

      if (districtNode) {
        districtNode.value += parseInt(daily_partial, 10);
      } else {
        stateNode.children.push({
          name: district,
          value: parseInt(daily_partial, 10),
        });
      }

      return result;
    },
    { name: "home", children: [] }
  );

  return chartData;
}) satisfies LoaderFunction;

export const treeMapLoader = (async (): Promise<any[]> => {
  const districtData = await fetcher("vaccination/vax_district.csv");
  const treeMapData: any[] = (districtData as any[]).reduce(
    (result: any, row: any) => {
      const { state, district, daily_partial } = row;

      if (!state || !district) {
        return result;
      }

      let stateNode = result.find((node: any) => node.name === state);

      if (!stateNode) {
        stateNode = { name: state, children: [] };
        result.push(stateNode);
      }

      const districtNode = stateNode.children.find(
        (node: any) => node.name === district
      );

      if (districtNode) {
        districtNode.value += parseInt(daily_partial, 10);
        if (districtNode.value > 500000) {
          districtNode.showLabel = true;
        }
      } else {
        stateNode.children.push({
          name: district,
          value: parseInt(daily_partial, 10),
        });
      }

      return result;
    },
    []
  );

  return treeMapData;
}) satisfies LoaderFunction;

export const stackedAreaLoader = (async (): Promise<any> => {
    let vaccinationData: any = (await fetcher("vaccination/vax_malaysia.csv"));
    vaccinationData.pop();
    vaccinationData = vaccinationData.slice(-30);
    let data: any = [];

    vaccinationData.forEach((row: any) => {
        data.push({
            group: "Partial Dose",
            date: row["date"],
            value: row["daily_partial"]
        });
        data.push({
            group: "Full Dose",
            date: row["date"],
            value: row["daily_full"]
        });
        data.push({
            group: "Booster 1",
            date: row["date"],
            value: row["daily_booster"]
        });
        data.push({
            group: "Booster 2",
            date: row["date"],
            value: row["daily_booster2"]
        });
    })

    return data;
}) satisfies LoaderFunction;