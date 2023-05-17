import axios from "axios";
import Papa from "papaparse";

export const fetcher = async (url: string) => {
  const { data: csvData } = await axios.get(url);
  const { data } = Papa.parse(csvData, { header: true });
  return data;
};
