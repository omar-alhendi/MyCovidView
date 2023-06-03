import { fetcher } from "../../utils";

export const progressBarLoader = async () => {
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
};

const vacciantedPercentageLoader = async () => {
  const populationData = await fetcher("static/population.csv");
  const vaccinationData = await fetcher("vax_malaysia.csv");

  const totalPopulation = populationData
    .slice(-17)
    .filter((row: any) => row.state === "malaysia");

  const totalVaccination = vaccinationData.slice(-1);
};

export const icuCapacityMeterLoader = async () => {
  const icuData = await fetcher("epidemic/icu.csv");
  const latestIcuData = icuData.slice(-17).filter((row: any) => !!row.state);

  let totalIcuBeds = 0;

  const icuProportionalMeterData = latestIcuData.map((row: any) => {
    const { state, beds_icu_total, icu_covid, icu_pui, icu_noncovid } = row;
    totalIcuBeds += parseInt(beds_icu_total);
    return {
      group: state,
      value: parseInt(icu_covid) + parseInt(icu_pui) + parseInt(icu_noncovid),
    };
  });

  const icuMeterDataByState = latestIcuData.map((row: any) => {
    const { state, beds_icu_total, icu_covid, icu_pui, icu_noncovid } = row;
    return [
      {
        group: state,
        value: (
          ((parseInt(icu_covid) + parseInt(icu_pui) + parseInt(icu_noncovid)) /
            parseInt(beds_icu_total)) *
          100
        ).toFixed(2),
      },
    ];
  });

  const icuCapacityMeterData = {
    icuProportionalMeterData,
    icuMeterDataByState,
    totalIcuBeds,
  };

  return icuCapacityMeterData;
};

export const testPositiveLoader = async () => {
  const testCaseData = await fetcher("epidemic/tests_malaysia.csv");
  const newCaseData = await fetcher("epidemic/cases_malaysia.csv");

  // Get new test case record and positive cases of the most recent two days (Last Row is Empty)
  // To calculate the delta change between the two days
  const testNum = testCaseData.slice(-3).filter((row: any) => !!row.date);
  const postitiveNum = newCaseData.slice(-3).filter((row: any) => !!row.date);

  const results = testNum.map((row: any, index) => {
    const totalTest = parseInt(row["pcr"]) + parseInt(row["rtk-ag"]);
    const newCase: any = postitiveNum[index];
    const positiveRate = parseInt(newCase["cases_new"]) / totalTest;
    return positiveRate;
  });

  return [
    {
      group: "value",
      value: results[1] + 23,
    },
    {
      group: "delta",
      value: results[1] - results[0],
    },
  ];
};

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
});
