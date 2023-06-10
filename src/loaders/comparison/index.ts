import { fetcher } from "../../utils";

export const stackedBarLoader = async () => {
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