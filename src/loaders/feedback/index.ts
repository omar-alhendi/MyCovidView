import { fetcher } from "../../utils";

export const progressBarLoader = async () => {
  const vaccinationData = await fetcher("vaccination/vax_state.csv");
  const populationData = await fetcher("static/population.csv");

  const filteredVaccinationData = vaccinationData
    .slice(-17)
    .filter((row: any) => !!row.state);
  const filteredPopulationdata = populationData.filter(
    (row: any) => !!row.state
  );

  const data = filteredVaccinationData.map((row: any) => {
    const state: any = filteredPopulationdata.find(
      ({ state }: any) => state === row.state
    );
    return {
      group: row["state"],
      value: (+row["cumul_full"] / +state["pop"]) * 100,
    };
  });

  return data;
};

export const icuCapacityMeterLoader = async () => {
  const icuData = await fetcher("epidemic/icu.csv");
  const latestIcuData = icuData.slice(-17).filter((row: any) => !!row.state);

  let totalIcuBeds = 0;

  const icuProportionalMeterData = latestIcuData.map((row: any) => {
    const { state, beds_icu_total, icu_covid, icu_pui, icu_noncovid } = row;
    totalIcuBeds += parseInt(beds_icu_total);
    return {
      group: state,
      value: parseInt(icu_covid) + parseInt(icu_pui) + parseInt(icu_noncovid),
    };
  });

  const icuMeterDataByState = latestIcuData.map((row: any) => {
    const { state, beds_icu_total, icu_covid, icu_pui, icu_noncovid } = row;
    return [
      {
        group: state,
        value: (
          ((parseInt(icu_covid) + parseInt(icu_pui) + parseInt(icu_noncovid)) /
            parseInt(beds_icu_total)) *
          100
        ).toFixed(2),
      },
    ];
  });

  const icuCapacityMeterData = {
    icuProportionalMeterData,
    icuMeterDataByState,
    totalIcuBeds,
  };

  return icuCapacityMeterData;
};
