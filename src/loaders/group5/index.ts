import { fetcher } from "../../utils";

export const lollipopChartLoader = async () => {
    const vaccinatedData = await fetcher("vaccination/vax_state.csv");

    const filteredVaccinatedData = vaccinatedData
        .slice(-17)
        .filter((row: any) => !!row.state);

    const data = filteredVaccinatedData.map((row: any) => {
        return {
            group: row["state"],
            value: (+row["cumul_full"]),
        };
    });

    return data;
};

export const stackedAreaLoader = async (): Promise<any> => {
    let vaccinationData: any = (await fetcher("vaccination/vax_malaysia.csv"));
    vaccinationData.pop();
    vaccinationData = vaccinationData.slice(-30);
    
    const groups = ["Partial Dose", "Full Dose", "Booster 1", "Booster 2"];
    const dailyKeys = ["daily_partial", "daily_full", "daily_booster", "daily_booster2"];

    const data = vaccinationData.flatMap((row: any) =>
        groups.map((group, index) => ({
            group,
            date: row["date"],
            value: row[dailyKeys[index]],
        }))
    );

    return data;
};