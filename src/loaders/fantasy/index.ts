import { fetcher } from "../../utils";
  
  export const lineChartLoader = async () => {
    const data = await fetcher("epidemic/cases_malaysia.csv");
    
    const lineChartData = data
    .map((row: any) => {
      const { date, cases_active } = row;

      if (!date) {
        return [];
      }

      const activeValue = Number(cases_active) || 0;

      const activeData = {
        group: "cases_active",
        value: activeValue,
        date: new Date(date),
      };

      return [activeData];
    })
    .filter(Boolean) // Remove null entries
    .flat();

  return lineChartData;
  }
  
  export const areaChartLoader = async () => {
    let vaccinationData: any = await fetcher("vaccination/vax_malaysia.csv");
    vaccinationData.pop();
    vaccinationData = vaccinationData.slice(-30);

    const groups = ["Booster 1", "Booster 2"];
    const dailyKeys = [
      "daily_booster",
      "daily_booster2",
    ];

    const data = vaccinationData.flatMap((row: any) =>
      groups.map((group, index) => ({
        group,
        date: row["date"],
        value: row[dailyKeys[index]],
      }))
    );
  
    return data;
  }

  export const scatterPlotLoader = async () => {
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
  }