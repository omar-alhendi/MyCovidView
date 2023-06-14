import { fetcher } from '../../utils';

export const treeMapLoader = async (): Promise<any[]> => {
  const districtData = await fetcher('vaccination/vax_district.csv');
  const treeMapData: any[] = (districtData as any[]).reduce(
    (result: any, row: any) => {
      const { state, district, daily_partial } = row;

      if (!state || !district) {
        return result;
      }

      let stateNode = result.find((node: any) => node.name === state);

      if (!stateNode) {
        stateNode = { name: state, children: [] };
        result.push(stateNode);
      }

      const districtNode = stateNode.children.find(
        (node: any) => node.name === district
      );

      if (districtNode) {
        districtNode.value += parseInt(daily_partial, 10);
        if (districtNode.value > 500000) {
          districtNode.showLabel = true;
        }
      } else {
        stateNode.children.push({
          name: district,
          value: parseInt(daily_partial, 10),
        });
      }

      return result;
    },
    []
  );

  return treeMapData;
};

export const sunburstLoader = async (): Promise<any> => {
  const districtData = await fetcher('vaccination/vax_district.csv');
  const chartData = districtData.reduce(
    (result: any, row: any) => {
      const { state, district, daily_partial } = row;

      if (!state || !district) {
        return result;
      }

      let stateNode = result.children.find((node: any) => node.name === state);

      if (!stateNode) {
        stateNode = { name: state, children: [] };
        result.children.push(stateNode);
      }

      const districtNode = stateNode.children.find(
        (node: any) => node.name === district
      );

      if (districtNode) {
        districtNode.value += parseInt(daily_partial, 10);
      } else {
        stateNode.children.push({
          name: district,
          value: parseInt(daily_partial, 10),
        });
      }

      return result;
    },
    { name: 'home', children: [] }
  );

  return chartData;
};

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
