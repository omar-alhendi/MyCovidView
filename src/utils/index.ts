import axios from "axios";
import Papa from "papaparse";
import { db } from "../indexedDB";

const root =
  "https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/";

export const fetcher = async <T extends { [key: string]: string }>(
  url: string
): Promise<T[]> => {
  if ((await db.source.get(1)).url === root + url)
    return await db.store.toArray();
  const { data: csvData } = await axios.get(root + url);
  const { data } = Papa.parse<T>(csvData, { header: true });
  return data;
};
