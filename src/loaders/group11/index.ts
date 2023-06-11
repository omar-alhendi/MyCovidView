import { fetcher } from "../../utils";

export const vacRateLoader = async () => {
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
};

export const deathRateLoader = async () => {
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
};
