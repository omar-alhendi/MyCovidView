import { fetcher } from "../../utils";
import { DeathsStateType } from "../../types";
import { ChartTabularData } from "@carbon/charts/interfaces";

export const barLoader = async () => {
  const deathData = await fetcher<DeathsStateType>("epidemic/deaths_state.csv");

  const sumOfDeathForEachState: { [k: string]: number } = {};

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
  }));

  return data;
};

export const columnLoader = async (): Promise<ChartTabularData> => {
  const vaccinationData = await fetcher("vaccination/vax_state.csv");
  const populationData = await fetcher("static/population.csv");

  const filteredVaccinationData = vaccinationData
    .filter((row: any) => !!row.state)
    .slice(-17);

  const filteredPopulationdata = populationData.filter(
    (row: any) => !!row.state
  );
  const inPopulationData = filteredVaccinationData.filter(row => {
    return !!filteredPopulationdata.find(({ state }: any) => state === row.state)
  })
  const data = inPopulationData.map((row: any) => {
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
};

export const stackedBarLoader = async () => {
  const death_state = await fetcher("epidemic/deaths_state.csv");
  const case_state = await fetcher("epidemic/cases_state.csv");

  const filtered_death_state = death_state
    .slice(-17)
    .filter((row: any) => !!row.state);
  const filtered_case_state = case_state
    .slice(-17)
    .filter((row: any) => !!row.state);

  const data = filtered_death_state.map((row: any) => {
    const cases: any = filtered_case_state.find(
      ({ state }: any) => state === row.state
    );
    const data = [
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
};

export const stackedLineLoader = async () => {
  const data = await fetcher("epidemic/cases_malaysia.csv");

  const stackedLineData = data
    .map((row: any) => {
      const { date, cases_active, cases_recovered } = row;

      if (!date) {
        return [];
      }

      const activeValue = Number(cases_active) || 0;
      const recoveredValue = Number(cases_recovered) || 0;

      const activeData = {
        group: "cases_active",
        value: activeValue,
        date: new Date(date),
      };

      const recoveredData = {
        group: "cases_recovered",
        value: recoveredValue,
        date: new Date(date),
      };
      return [activeData, recoveredData];
    })
    .filter(Boolean) // Remove null entries
    .flat();

  return stackedLineData;
};

export const lollipopLoader = async () => {
  const vaccinatedData = await fetcher("vaccination/vax_state.csv");

  const filteredVaccinatedData = vaccinatedData
    .slice(-17)
    .filter((row: any) => !!row.state);

  const data = filteredVaccinatedData.map((row: any) => {
    return {
      group: row["state"],
      value: +row["cumul_full"],
    };
  });

  return data;
};
