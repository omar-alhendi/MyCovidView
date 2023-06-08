import { LoaderFunction } from "react-router-dom";
import { fetcher } from "../../utils";
import { ChartTabularData } from "@carbon/charts/interfaces";

export const lineChartLoaders = (async (): Promise<any[]> => {
    console.log('Fetching CSV data...');
    const districtData = await fetcher("epidemic/cases_malaysia.csv");
    console.log('Fetched CSV data:', districtData);
  
    // Process the CSV data and obtain the desired columns
    const processedData = districtData.map((row: any) => {
      const date = row["date"];
      const newcases = parseInt(row["cases_new"]);
      
      // Add more columns as needed
  
      return { "group":"new cases", "date":date, "value":newcases };
    });
  
    console.log('Processed data:', processedData);
  
    return processedData;
  }) satisfies LoaderFunction;

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
    return [data1,data2];
}) satisfies LoaderFunction;
