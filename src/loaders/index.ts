import { fetcher } from "../utils";

export const feedbackLoader = async () => {
  const vaccinationData = await fetcher("vaccination/vax_state.csv");
  const populationData = await fetcher("static/population.csv");

  const filteredVaccinationData = vaccinationData
    .slice(-17)
    .filter((row: any) => !!row.state);
  const filteredPopulationdata = populationData.filter(
    (row: any) => !!row.state
  );

  let columns = filteredVaccinationData.map((row: any) => {
    const state: any = filteredPopulationdata.find(
      ({ state }: any) => state === row.state
    );
    return {
      vaccination: +row["cumul_full"],
      state: row["state"],
      percentage: (+row["cumul_full"] / +state["pop"]) * 100,
    };
  });

  return { data: columns };
};
