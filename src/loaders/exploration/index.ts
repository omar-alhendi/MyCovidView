import { fetcher } from '../../utils';

export const heatMapLoader = async (): Promise<any[]> => {
  const dataset = await fetcher('vaccination/vax_snapshot.csv');
  // Filter the data for the specific state (e.g., Malaysia)
  const filteredData = dataset.filter((row: any) => row.state === 'Malaysia');

  // Create the desired array with age_group, dose, and value
  const result = filteredData.map((row: any) => ({
    age_group: row.age_group,
    dose: row.dose,
    value: row.value,
  }));

  return result;
};

export const scatterPlotLoader = async () => {
  const vaccinationData = await fetcher('vaccination/vax_state.csv');
  const populationData = await fetcher('static/population.csv');

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
      group: row['state'],
      value: (+row['cumul_full'] / +state['pop']) * 100,
    };
  });

  return data;
};
