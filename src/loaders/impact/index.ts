import { fetcher } from "../../utils";

export const treeMapLoader = (async (): Promise<any[]> => {
  const districtData = await fetcher("vaccination/vax_district.csv");
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
})

export const sunburstLoader = (async (): Promise<any> => {
  const districtData = await fetcher("vaccination/vax_district.csv");
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
    { name: "home", children: [] }
  );

  return chartData;
})
