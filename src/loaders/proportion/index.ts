import { fetcher } from '../../utils';

export const deathRateLoader = async () => {
  const death_state = await fetcher('epidemic/deaths_state.csv');
  const case_state = await fetcher('epidemic/cases_state.csv');

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
        key: row['state'],
        group: 'deaths_new',
        value: +row['deaths_new'],
        date: row['date'],
      },
      {
        key: row['state'],
        group: 'cases_new',
        value: +cases['cases_new'],
        date: cases['date'],
      },
    ];
    return data;
  });

  return data;
};

export const donutChartLoader = async () => {
  const vaccinatedPeopleData = await fetcher('vaccination/vax_district.csv');

  const districts = vaccinatedPeopleData.map((row: any) => row['district']);
  const uniqueDistricts = Array.from(new Set(districts));

  const data = uniqueDistricts.map((district) => {
    const filteredDataByDistrict = vaccinatedPeopleData.filter(
      (row: any) => row['district'] === district
    ) as any[]; // Assertion to 'any[]' type

    const state =
      filteredDataByDistrict.length > 0
        ? filteredDataByDistrict[0]['state']
        : '';

    return {
      district: district,
      state: state,
      value: filteredDataByDistrict.reduce(
        (total: number, row: any) => total + +row['cumul_full'],
        0
      ),
    };
  });
  return data;
};

export const stackedAreaLoader = async (): Promise<any> => {
  let vaccinationData: any = await fetcher('vaccination/vax_malaysia.csv');
  vaccinationData.pop();
  vaccinationData = vaccinationData.slice(-30);

  const groups = ['Partial Dose', 'Full Dose', 'Booster 1', 'Booster 2'];
  const dailyKeys = [
    'daily_partial',
    'daily_full',
    'daily_booster',
    'daily_booster2',
  ];

  const data = vaccinationData.flatMap((row: any) =>
    groups.map((group, index) => ({
      group,
      date: row['date'],
      value: row[dailyKeys[index]],
    }))
  );

  return data;
};
