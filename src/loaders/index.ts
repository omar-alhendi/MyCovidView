import { fetcher } from "../utils";
import { LoaderFunction } from "react-router-dom";
import {
  icuCapacityMeterLoader,
  progressBarLoader,
  testPositiveLoader,
} from "./feedback";
import { ChartTabularData } from "@carbon/charts/interfaces";

export const feedbackLoader = (async (): Promise<any> => {
  const progresssBarData = await progressBarLoader();
  const icuCapacityMeterData = await icuCapacityMeterLoader();
  const testPositiveGaugeData = await testPositiveLoader();
  return { progresssBarData, icuCapacityMeterData, testPositiveGaugeData };
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

export const vacRateLoader = (async (): Promise<ChartTabularData> => {
  const populationData = await fetcher("static/population.csv");
  const popMalaysiaDataRow: any = populationData.find(
    ({ state }: any) => state === "Malaysia"
  );
  const popMas = popMalaysiaDataRow["pop"];

  const vaccineData = await fetcher("vaccination/vax_malaysia.csv");

  //partial
  const partialSum = vaccineData.reduce((sum: number, row: any) => {
    const partial = parseInt(row["daily_partial"]);
    return isNaN(partial) ? sum : sum + partial;
  }, 0);

  //fully
  const fullSum = vaccineData.reduce((sum: number, row: any) => {
    const full = parseInt(row["daily_full"]);
    return isNaN(full) ? sum : sum + full;
  }, 0);

  //booster 1
  const b1Sum = vaccineData.reduce((sum: number, row: any) => {
    const b1 = parseInt(row["daily_booster"]);
    return isNaN(b1) ? sum : sum + b1;
  }, 0);

  //booster 2
  const b2Sum = vaccineData.reduce((sum: number, row: any) => {
    const b2 = parseInt(row["daily_booster2"]);
    return isNaN(b2) ? sum : sum + b2;
  }, 0);
  const data_display = [
    {
      title: "Partial Vaccinated",
      group: "PV",
      ranges: [0, 60, 80],
      marker: 75,
      max: 100,
      value: Math.round((partialSum / popMas) * 100 * 100) / 100,
    },
    {
      title: "Fully Vaccinated",
      group: "FV",
      ranges: [0, 60, 80],
      marker: 75,
      max: 100,
      value: Math.round((fullSum / popMas) * 100 * 100) / 100,
    },
    {
      title: "Booster 1",
      group: "B1",
      ranges: [0, 60, 80],
      marker: 75,
      max: 100,
      value: Math.round((b1Sum / popMas) * 100 * 100) / 100,
    },
    {
      title: "Booster 2",
      group: "B2",
      ranges: [0, 60, 80],
      marker: 75,
      max: 100,
      value: Math.round((b2Sum / popMas) * 100 * 100) / 100,
    },
  ];

  return data_display;
}) satisfies LoaderFunction;

export const stackedBarLoader = (async (): Promise<ChartTabularData> => {
  const death_state = await fetcher("epidemic/deaths_state.csv");
  const case_state = await fetcher("epidemic/cases_state.csv");

  const filtered_death_state = death_state
    .slice(-17)
    .filter((row: any) => !!row.state);
  const filtered_case_state = case_state
    .slice(-17)
    .filter((row: any) => !!row.state);

  let data = filtered_death_state.map((row: any) => {
    const cases: any = filtered_case_state.find(
      ({ state }: any) => state === row.state
    );
    let data = [
      {
        key: row["state"],
        group: "deaths_new",
        value: +row["deaths_new"],
      },
      {
        key: row["state"],
        group: "cases_new",
        value: +cases["cases_new"],
      },
    ];
    return data;
  });

  return data;
}) satisfies LoaderFunction;

export const stackedAreaLoader = (async (): Promise<ChartTabularData> => {
    let vaccinationData: any = (await fetcher("vaccination/vax_malaysia.csv"));
    vaccinationData.pop();
    vaccinationData = vaccinationData.slice(-30);
    let data: ChartTabularData = [];

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