import { fetcher } from "../../utils";

export const heatMapLoader = async (): Promise<any[]> => {
  const dataset = await fetcher("vaccination/vax_snapshot.csv");
  // Filter the data for the specific state (e.g., Malaysia)
  const filteredData = dataset.filter((row: any) => row.state === "Malaysia");

  // Create the desired array with age_group, dose, and value
  const result = filteredData.map((row: any) => ({
    age_group: row.age_group,
    dose: row.dose,
    value: row.value,
  }));

  return result;
};

export const boxPlotLoader1 = async () => {
  const casesData = await fetcher("epidemic/cases_malaysia.csv");

  const quarterlyCases: Record<string, Record<string, number[]>> = {};

  const cleanedData = casesData.filter((data: any) => {
    return data.date && data.cases_new;
  });

  cleanedData.forEach((data: any) => {
    const dateParts = data.date.split("-");
    const year = dateParts[0];
    const month = parseInt(dateParts[1], 10);
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

  const boxPlotData: { group: string; key: string; value: number }[] = [];

  Object.entries(quarterlyCases).forEach(([year, quarterData]) => {
    Object.entries(quarterData).forEach(([quarter, values]) => {
      const sortedValues = values.sort((a, b) => a - b);
      const min = sortedValues[0];
      const q1 = sortedValues[Math.ceil(sortedValues.length * 0.25)];
      const median = sortedValues[Math.ceil(sortedValues.length * 0.5)];
      const q3 = sortedValues[Math.ceil(sortedValues.length * 0.75)];
      const max = sortedValues[sortedValues.length - 1];

      boxPlotData.push(
        { group: `${year} ${quarter}`, key: "Minimum", value: min },
        { group: `${year} ${quarter}`, key: "Q1", value: q1 },
        { group: `${year} ${quarter}`, key: "Median", value: median },
        { group: `${year} ${quarter}`, key: "Q3", value: q3 },
        { group: `${year} ${quarter}`, key: "Maximum", value: max }
      );
    });
  });

  return boxPlotData;
};

export const scatterPlotLoader = async () => {
  const vaccinationData = await fetcher("vaccination/vax_state.csv");
  const populationData = await fetcher("static/population.csv");

  const filteredVaccinationData = vaccinationData
    .slice(-17)
    .filter((row: any) => !!row.state);
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
    return {
      group: row["state"],
      value: (+row["cumul_full"] / +state["pop"]) * 100,
    };
  });

  return data;
};
