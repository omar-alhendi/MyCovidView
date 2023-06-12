import { fetcher } from "../../utils";

export const heatMapLoader = (async (): Promise<any[]> => {
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
  });
