import { fetcher } from '../../utils';

export const lollipopChartLoader = async () => {
  const vaccinatedData = await fetcher('vaccination/vax_state.csv');

  const filteredVaccinatedData = vaccinatedData
    .slice(-17)
    .filter((row: any) => !!row.state);

  const data = filteredVaccinatedData.map((row: any) => {
    return {
      group: row['state'],
      value: +row['cumul_full'],
    };
  });
  console.log(data);
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

  console.log(data);

  return data;
};

// export const donutChartLoader = async () => {
//   const vaccinatedData = await fetcher('vaccination/vax_district.csv');

//   const filteredVaccinatedData = vaccinatedData
//     .slice(-100)
//     .filter((row: any) => !!row.district);

//   const data = filteredVaccinatedData.map((row: any) => {
//     return {
//       group: row['district'],
//       value: +row['cumul_full'],
//     };
//   });
//   console.log(data);
//   return data;
// };
