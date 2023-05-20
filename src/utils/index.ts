import axios from "axios";
import Papa from "papaparse";

const root =
  "https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/";

export const fetcher = async (url: string) => {
  const { data: csvData } = await axios.get(root + url);
  const { data } = Papa.parse(csvData, { header: true });
  return data;
};
