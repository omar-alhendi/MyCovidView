import { fetcher } from "../../utils";
import { ChartTabularData } from "@carbon/charts/interfaces";

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