import { fetcher } from "../../utils";

export const lollipopChartLoader = async () => {
  const vaccinatedData = await fetcher("vaccination/vax_state.csv");

  const filteredVaccinatedData = vaccinatedData
    .slice(-17)
    .filter((row: any) => !!row.state);

  const data = filteredVaccinatedData.map((row: any) => {
    return {
      group: row["state"],
      value: (+row["cumul_full"]),
    };
  });

  return data;
};
