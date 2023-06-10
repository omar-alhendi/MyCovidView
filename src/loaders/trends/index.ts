import { fetcher } from "../../utils";

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

export const comboLoader = async () => {
  const casesData = await fetcher("epidemic/cases_malaysia.csv");
  const comboData: any[] = (casesData as any[]).reduce(
    (result: any, row: any) => {
      const { cases_new, cases_active, date } = row;

      if (!cases_new || !cases_active || !date) {
        return result;
      }

      const group_new_case = {
        group: "cases_new",
        key: date,
        new_cases: cases_new,
      };

      const group_active_case = {
        group: "cases_active",
        key: date,
        active_cases: cases_active,
      };

      result.push(group_new_case);
      result.push(group_active_case);
      return result;
    },
    []
  );
  return comboData;
};

export const stackedAreaLoader = async (): Promise<any> => {
  let vaccinationData: any = await fetcher("vaccination/vax_malaysia.csv");
  vaccinationData.pop();
  vaccinationData = vaccinationData.slice(-30);

  const groups = ["Partial Dose", "Full Dose", "Booster 1", "Booster 2"];
  const dailyKeys = [
    "daily_partial",
    "daily_full",
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
};
