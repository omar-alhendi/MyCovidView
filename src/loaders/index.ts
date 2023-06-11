import { LoaderFunction } from "react-router-dom";
import { fetcher } from "../utils";
import {
  progressBarLoader,
  icuCapacityMeterLoader,
  testPositiveLoader,
} from "./feedback";
import { ChartTabularData } from "@carbon/charts/interfaces";

import { boxPlotLoader, histogramLoader } from "./distribution";
import { vacRateLoader, deathRateLoader } from "./group11";
import {
  lollipopChartLoader,
  stackedAreaLoader,
  donutChartLoader,
} from "./group5";
import { treeMapLoader, sunburstLoader } from "./impact";
import { stackedLineLoader, comboChartLoader } from "./group2";

export const feedbackLoader = (async (): Promise<any> => {
  const icuCapacityMeterData = await icuCapacityMeterLoader();
  const testPositiveGaugeData = await testPositiveLoader();
  const progresssBarData = await progressBarLoader();
  return { progresssBarData, icuCapacityMeterData, testPositiveGaugeData };
}) satisfies LoaderFunction;

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
export const group11Loader = (async (): Promise<any> => {
  const vacRateData = await vacRateLoader();
  const deathRateData = await deathRateLoader();
  return { vacRateData, deathRateData };
}) satisfies LoaderFunction;

export const group5Loader = (async (): Promise<any> => {
  const lollipopData = await lollipopChartLoader();
  const stackedAreaData = await stackedAreaLoader();
  const donutData = await donutChartLoader();
  return { lollipopData, stackedAreaData, donutData };
}) satisfies LoaderFunction;

export const impactLoader = (async (): Promise<any> => {
  const treeMapData = await treeMapLoader();
  const sunburstData = await sunburstLoader();
  return { treeMapData, sunburstData };
}) satisfies LoaderFunction;

export const group2Loader = (async (): Promise<any> => {
  const stackedLineData = await stackedLineLoader();
  const comboChartData = await comboChartLoader();
  return { stackedLineData, comboChartData };
}) satisfies LoaderFunction;

export const vacRateLoader = (async (): Promise<ChartTabularData> => {
  const populationData = await fetcher("static/population.csv");
  const popMalaysiaDataRow: any = populationData.find(
    ({ state }: any) => state === "Malaysia"
  );
  const popMas = popMalaysiaDataRow["pop"];

  const vaccineData = await fetcher("vaccination/vax_malaysia.csv");

  //partial
  const partialSum = vaccineData.reduce((sum: number, row: any) => {
    const partial = parseInt(row["daily_partial"]);
    return isNaN(partial) ? sum : sum + partial;
  }, 0);

  //fully
  const fullSum = vaccineData.reduce((sum: number, row: any) => {
    const full = parseInt(row["daily_full"]);
    return isNaN(full) ? sum : sum + full;
  }, 0);

  //booster 1
  const b1Sum = vaccineData.reduce((sum: number, row: any) => {
    const b1 = parseInt(row["daily_booster"]);
    return isNaN(b1) ? sum : sum + b1;
  }, 0);

  //booster 2
  const b2Sum = vaccineData.reduce((sum: number, row: any) => {
    const b2 = parseInt(row["daily_booster2"]);
    return isNaN(b2) ? sum : sum + b2;
  }, 0);
  const data_display = [
    {
      title: "Partial Vaccinated",
      group: "PV",
      ranges: [0, 60, 80],
      marker: 75,
      max: 100,
      value: Math.round((partialSum / popMas) * 100 * 100) / 100,
    },
    {
      title: "Fully Vaccinated",
      group: "FV",
      ranges: [0, 60, 80],
      marker: 75,
      max: 100,
      value: Math.round((fullSum / popMas) * 100 * 100) / 100,
    },
    {
      title: "Booster 1",
      group: "B1",
      ranges: [0, 60, 80],
      marker: 75,
      max: 100,
      value: Math.round((b1Sum / popMas) * 100 * 100) / 100,
    },
    {
      title: "Booster 2",
      group: "B2",
      ranges: [0, 60, 80],
      marker: 75,
      max: 100,
      value: Math.round((b2Sum / popMas) * 100 * 100) / 100,
    },
  ];

  return data_display;
}) satisfies LoaderFunction;

export const stackedBarLoader = (async (): Promise<ChartTabularData> => {
  const death_state = await fetcher("epidemic/deaths_state.csv");
  const case_state = await fetcher("epidemic/cases_state.csv");

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
        key: row["state"],
        group: "5_11",
        value: +row["deaths_new"],
      },
      {
        key: row["state"],
        group: "cases_new",
        value: +cases["cases_new"],
      },
    ];
    return data;
  });

  return data;
}) satisfies LoaderFunction;




// export const histogramLoader = (async (): Promise<any[]> => {
//   console.log('Fetching CSV data...');
//   const districtData = await fetcher("vaccination/vax_demog_age.csv");
//   console.log('Fetched CSV data:', districtData);

//   // Process the CSV data and obtain the desired columns
//   const processedData = districtData.map((row: any) => {
//     const state = row["state"];
//     const date = row["date"];
//     const partial_dose = parseInt(row["partial_5_11"]);
//     const full_dose = parseInt(row["full_5_11"]);

//     // Add more columns as needed

//     return { "state": state, "date": date, "partial": partial_dose, "full":full_dose};
//   });

//   console.log('Processed data:', processedData);

//   return processedData;
// }) satisfies LoaderFunction;

// export const histogramLoader = (async (): Promise<ChartTabularData> => {
//   const vaccination_rate = await fetcher("vaccination/vax_demog_age.csv");
//   const filtered_vaccination_rate = vaccination_rate
//     .filter((row: any) => !!row.state);
//   let data = filtered_vaccination_rate.map((row: any) => {
//     const cases: any = filtered_vaccination_rate.find(
//       ({ value }: any) => value === row.value
//     );
//     let data = [
//       {
//         key: row["state"],
//         group: "partial_5_11",
//         value: +cases["partial_5_11"],
//       },
//     ];
//     return data;
//   });

//   return data;
// }) satisfies LoaderFunction;

export const histogramLoader = (async (): Promise<ChartTabularData> => {
  const vaccination_rate = await fetcher("vaccination/vax_demog_age_children.csv");

  const filtered_vaccination_rate = vaccination_rate
    .filter((row: any) => !!row.state);

  let data1 = filtered_vaccination_rate.map((row: any) => {
    let data1 = [
      {
        group: "5",
        value: parseInt(row["partial_5"]),
        age: 5
      },
      {
        group: "6",
        value: parseInt(row["partial_6"]),
        age: 6
      },
      {
        group: "17",
        value: parseInt(row["partial_7"]),
        age: 7
      },
      {
        group: "8",
        value: parseInt(row["partial_8"]),
        age: 8
      },
      {
        group: "9",
        value: parseInt(row["partial_9"]),
        age: 9
      },
      {
        group: "10",
        value: parseInt(row["partial_10"]),
        age: 10
      },
      {
        group: "11",
        value: parseInt(row["partial_11"]),
        age: 11
      },
      {
        group: "12",
        value: parseInt(row["partial_12"]),
        age: 12
      },
      {
        group: "13",
        value: parseInt(row["partial_13"]),
        age: 13
      },
      {
        group: "14",
        value: parseInt(row["partial_14"]),
        age: 14
      },
      {
        group: "15",
        value: parseInt(row["partial_15"]),
        age: 15
      },
      {
        group: "16",
        value: parseInt(row["partial_16"]),
        age: 16
      },
      {
        group: "17",
        value: parseInt(row["partial_17"]),
        age: 17
      },
    ];
    return data1;
  });
    let data2 = filtered_vaccination_rate.map((row: any) => {
      let data2 = [
        {
          group: "5",
          value: parseInt(row["full_5"]),
          age: 5
        },
        {
          group: "6",
          value: parseInt(row["full_6"]),
          age: 6
        },
        {
          group: "17",
          value: parseInt(row["full_7"]),
          age: 7
        },
        {
          group: "8",
          value: parseInt(row["full_8"]),
          age: 8
        },
        {
          group: "9",
          value: parseInt(row["full_9"]),
          age: 9
        },
        {
          group: "10",
          value: parseInt(row["full_10"]),
          age: 10
        },
        {
          group: "11",
          value: parseInt(row["full_11"]),
          age: 11
        },
        {
          group: "12",
          value: parseInt(row["full_12"]),
          age: 12
        },
        {
          group: "13",
          value: parseInt(row["full_13"]),
          age: 13
        },
        {
          group: "14",
          value: parseInt(row["full_14"]),
          age: 14
        },
        {
          group: "15",
          value: parseInt(row["full_15"]),
          age: 15
        },
        {
          group: "16",
          value: parseInt(row["full_16"]),
          age: 16
        },
        {
          group: "17",
          value: parseInt(row["full_17"]),
          age: 17
        },
      ];
    return data2;
  });

  // let data1 = filtered_vaccination_rate.map((row: any) => {
  //   let data1 = [
  //     {
  //       group: "5-11",
  //       value: parseInt(row["partial_5_11"]),
  //       age: 5
  //     },
  //     {
  //       group: "12-17",
  //       value: parseInt(row["partial_12_17"]),
  //       age: 15
  //     },
  //     {
  //       group: "18-29",
  //       value: parseInt(row["partial_18_29"]),
  //       age: 20
  //     },
  //     {
  //       group: "30-39",
  //       value: parseInt(row["partial_30_39"]),
  //       age: 35
  //     },
  //     {
  //       group: "40-49",
  //       value: parseInt(row["partial_5_11"]),
  //       age: 45
  //     },
  //     {
  //       group: "50-59",
  //       value: parseInt(row["partial_12_17"]),
  //       age: 55
  //     },
  //     {
  //       group: "60-69",
  //       value: parseInt(row["partial_18_29"]),
  //       age: 65
  //     },
  //     {
  //       group: "70-79",
  //       value: parseInt(row["partial_30_39"]),
  //       age: 75
  //     },
  //     {
  //       group: "80+",
  //       value: parseInt(row["partial_80"]),
  //       age: 85
  //     }
  //   ];
  //   return data1;
  // });

  // let data2 = filtered_vaccination_rate.map((row: any) => {
  //   let data2 = [
  //     {
  //       group: "5-11",
  //       value: parseInt(row["full_5_11"]),
  //       age: 5
  //     },
  //     {
  //       group: "12-17",
  //       value: parseInt(row["full_12_17"]),
  //       age: 15
  //     },
  //     {
  //       group: "18-29",
  //       value: parseInt(row["full_18_29"]),
  //       age: 20
  //     },
  //     {
  //       group: "30-39",
  //       value: parseInt(row["full_30_39"]),
  //       age: 35
  //     },
  //     {
  //       group: "40-49",
  //       value: parseInt(row["full_5_11"]),
  //       age: 45
  //     },
  //     {
  //       group: "50-59",
  //       value: parseInt(row["full_12_17"]),
  //       age: 55
  //     },
  //     {
  //       group: "60-69",
  //       value: parseInt(row["full_18_29"]),
  //       age: 65
  //     },
  //     {
  //       group: "70-79",
  //       value: parseInt(row["full_30_39"]),
  //       age: 75
  //     },
  //     {
  //       group: "80+",
  //       value: parseInt(row["full_80"]),
  //       age: 85
  //     }
  //   ];
  //   return data2;
  // });

  // let data3 = filtered_vaccination_rate.map((row: any) => {
  //   let data3 = [
  //     {
  //       group: "5-11",
  //       value: parseInt(row["booster_5_11"]),
  //       age: 5
  //     },
  //     {
  //       group: "12-17",
  //       value: parseInt(row["booster_12_17"]),
  //       age: 15
  //     },
  //     {
  //       group: "18-29",
  //       value: parseInt(row["booster_18_29"]),
  //       age: 20
  //     },
  //     {
  //       group: "30-39",
  //       value: parseInt(row["booster_30_39"]),
  //       age: 35
  //     },
  //     {
  //       group: "40-49",
  //       value: parseInt(row["booster_5_11"]),
  //       age: 45
  //     },
  //     {
  //       group: "50-59",
  //       value: parseInt(row["booster_12_17"]),
  //       age: 55
  //     },
  //     {
  //       group: "60-69",
  //       value: parseInt(row["booster_18_29"]),
  //       age: 65
  //     },
  //     {
  //       group: "70-79",
  //       value: parseInt(row["booster_30_39"]),
  //       age: 75
  //     },
  //     {
  //       group: "80+",
  //       value: parseInt(row["booster_80"]),
  //       age: 85
  //     }
  //   ];
  //   return data3;
  // });


  // let data4= filtered_vaccination_rate.map((row: any) => {
  //   let data4 = [
  //     {
  //       group: "5-11",
  //       value: parseInt(row["booster2_5_11"]),
  //       age: 5
  //     },
  //     {
  //       group: "12-17",
  //       value: parseInt(row["booster2_12_17"]),
  //       age: 15
  //     },
  //     {
  //       group: "18-29",
  //       value: parseInt(row["booster2_18_29"]),
  //       age: 20
  //     },
  //     {
  //       group: "30-39",
  //       value: parseInt(row["booster2_30_39"]),
  //       age: 35
  //     },
  //     {
  //       group: "40-49",
  //       value: parseInt(row["booster2_5_11"]),
  //       age: 45
  //     },
  //     {
  //       group: "50-59",
  //       value: parseInt(row["booster2_12_17"]),
  //       age: 55
  //     },
  //     {
  //       group: "60-69",
  //       value: parseInt(row["booster2_18_29"]),
  //       age: 65
  //     },
  //     {
  //       group: "70-79",
  //       value: parseInt(row["booster2_30_39"]),
  //       age: 75
  //     },
  //     {
  //       group: "80+",
  //       value: parseInt(row["booster2_80"]),
  //       age: 85
  //     }
  //   ];
  //   return data4;
  // });

  return [data1,data2];
}) satisfies LoaderFunction;

// export const histogramLoader = (async (): Promise<any[]> => {
//   console.log('Fetching CSV data...');
//   const vaccination_rate = await fetcher("vaccination/vax_demog_age.csv");
//   console.log('Fetched CSV data:', vaccination_rate);

//   // Process the CSV data and obtain the desired columns
//   const processedData = vaccination_rate.map((row: any) => {
//     const partial_5_11 = parseInt(row["partial_5_11"]);

//     // Add more columns as needed

//     return { "group": "5_11", "value": partial_5_11 };
//   });

//   console.log('Processed data:', processedData);

//   return processedData;
// }) satisfies LoaderFunction;
export const distributionLoader = (async (): Promise<any> => {
  const boxPlotData = await boxPlotLoader();
  const histogramData = await histogramLoader();
  return { boxPlotData, histogramData };
}) satisfies LoaderFunction;
