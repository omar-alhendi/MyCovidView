import { fetcher } from "../../utils";

export const horizontalBarLoader = async () => {
  const casesData = await fetcher("epidemic/cases_malaysia.csv");

  const quarterlyCases: Record<string, Record<string, number[]>> = {};

  const cleanedData = casesData.filter((data: any) => {
    return data.date && data.cases_new;
  });

  cleanedData.forEach((data: any) => {
    const date = new Date(data.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const quarter = Math.ceil(month / 3);
    const quarterKey = `Q${quarter}`;

    const cases = parseInt(data.cases_new, 10);

    if (quarterlyCases[year]) {
      if (quarterlyCases[year][quarterKey]) {
        quarterlyCases[year][quarterKey].push(cases);
      } else {
        quarterlyCases[year][quarterKey] = [cases];
      }
    } else {
      quarterlyCases[year] = { [quarterKey]: [cases] };
    }
  });

  const horizontalBarData: { group: string; value: number; year: number }[] = [];

  Object.entries(quarterlyCases).forEach(([year, quarterData]) => {
    Object.entries(quarterData).forEach(([quarter, values]) => {
      const sumValues = values.reduce((sum, current) => sum + current, 0);

      horizontalBarData.push({
        group: `${year} ${quarter}`,
        value: sumValues,
        year: parseInt(year, 10),
      });
    });
  });

  return horizontalBarData;
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