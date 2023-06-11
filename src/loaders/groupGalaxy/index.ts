import { fetcher } from "../../utils";
import { ChartTabularData } from "@carbon/charts/interfaces";
import { DeathsStateType } from "../../types";

export const columnChartLoader = (async (): Promise<ChartTabularData> => {
  const vaccinationData = await fetcher("vaccination/vax_state.csv");
  const populationData = await fetcher("static/population.csv");

  const filteredVaccinationData = vaccinationData
    .filter((row: any) => !!row.state)
    .slice(-17);
  
  const filteredPopulationdata = populationData.filter(
    (row: any) => !!row.state
  );

  const data = filteredVaccinationData.map((row: any) => {
    const state: any = filteredPopulationdata.find(
      ({ state }: any) => state === row.state
    );
    return [
      {
        group: row["state"],
        key: "Adults",
        value: (+row["cumul_full_adol"] / +state["pop"]) * 100,
      },
      {
        group: row["state"],
        key: "Children",
        value: (+row["cumul_full_child"] / +state["pop"]) * 100,
      },
    ];
  });

  return data;
})

export const barChartLoader = async () => {
  const deathData = await fetcher<DeathsStateType>("epidemic/deaths_state.csv");

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
};