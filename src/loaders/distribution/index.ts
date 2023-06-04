import { fetcher } from "../../utils";

export const boxPlotLoader = async () => {
    const casesData = await fetcher("epidemic/cases_malaysia.csv");
  
    const quarterlyCases: Record<string, Record<string, number[]>> = {};
  
    const cleanedData = casesData.filter((data: any) => {
      return data.date && data.cases_new;
    });
  
    cleanedData.forEach((data: any) => {
      const dateParts = data.date.split('-');
      const year = dateParts[0];
      const month = parseInt(dateParts[1], 10);
      const quarter = Math.ceil(month / 3);
      const quarterKey = `Q${quarter}`;
  
      const cases = parseInt(data.cases_new, 10);
  
      if (quarterlyCases[year]) {
        if (quarterlyCases[year][quarterKey]) {
          quarterlyCases[year][quarterKey].push(cases);
        } else {
          quarterlyCases[year][quarterKey] = [cases];
        }
      } else {
        quarterlyCases[year] = { [quarterKey]: [cases] };
      }
    });
  
    const boxPlotData: { group: string; key: string; value: number }[] = [];
  
    Object.entries(quarterlyCases).forEach(([year, quarterData]) => {
      Object.entries(quarterData).forEach(([quarter, values]) => {
        const sortedValues = values.sort((a, b) => a - b);
        const min = sortedValues[0];
        const q1 = sortedValues[Math.ceil(sortedValues.length * 0.25)];
        const median = sortedValues[Math.ceil(sortedValues.length * 0.5)];
        const q3 = sortedValues[Math.ceil(sortedValues.length * 0.75)];
        const max = sortedValues[sortedValues.length - 1];
  
        boxPlotData.push(
          { group: `${year} ${quarter}`, key: 'Minimum', value: min },
          { group: `${year} ${quarter}`, key: 'Q1', value: q1 },
          { group: `${year} ${quarter}`, key: 'Median', value: median },
          { group: `${year} ${quarter}`, key: 'Q3', value: q3 },
          { group: `${year} ${quarter}`, key: 'Maximum', value: max },
        );
      });
    });
  
    return boxPlotData;
  }

  export const histogramLoader = async () => {
    const casesData = await fetcher("epidemic/cases_malaysia.csv");
  
    const quarterlyCases: Record<string, Record<string, number[]>> = {};
  
    const cleanedData = casesData.filter((data: any) => {
      return data.date && data.cases_new;
    });
  
    cleanedData.forEach((data: any) => {
      const date = new Date(data.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const quarter = Math.ceil(month / 3);
      const quarterKey = `Q${quarter}`;
  
      const cases = parseInt(data.cases_new, 10);
  
      if (quarterlyCases[year]) {
        if (quarterlyCases[year][quarterKey]) {
          quarterlyCases[year][quarterKey].push(cases);
        } else {
          quarterlyCases[year][quarterKey] = [cases];
        }
      } else {
        quarterlyCases[year] = { [quarterKey]: [cases] };
      }
    });
  
    const histogramData: { group: string; value: number; year: number }[] = [];
  
    Object.entries(quarterlyCases).forEach(([year, quarterData]) => {
      Object.entries(quarterData).forEach(([quarter, values]) => {
        const sumValues = values.reduce((sum, current) => sum + current, 0);
  
        histogramData.push({
          group: `${year} ${quarter}`,
          value: sumValues,
          year: parseInt(year, 10),
        });
      });
    });
  
    return histogramData;
  };