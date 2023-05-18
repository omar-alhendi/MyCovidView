import axios, { AxiosError, AxiosResponse } from "axios";
import Papa from "papaparse";
import { ColorScheme } from "@mantine/core";

export const fetcher = async (url: string) => {
  try {
    const { data: csvData } = await axios.get(url);
    const { data } = Papa.parse(csvData, { header: true });
    return data;
  } catch (error) {
    return `failed to fetch the data ${error}`;
  }
};

export const getColorScheme = (scheme: string | null): ColorScheme => {
  if (scheme === "light" || scheme === "dark") {
    return scheme;
  }
  return "light";
};
