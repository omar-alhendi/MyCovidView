import axios from "axios";
import Papa from "papaparse";
import { ColorScheme } from "@mantine/core";

export const fetcher = async (url: string) => {
  const { data: csvData } = await axios.get(url);
  const { data } = Papa.parse(csvData, { header: true });
  return data;
};

export const getColorScheme = (scheme: string | null): ColorScheme => {
  if (scheme === "light" || scheme === "dark") {
    return scheme;
  }
  return "light";
};
