import { LoaderFunction } from "react-router-dom";
import axios from "axios";

export const homeLoader = (async (): Promise<any> => {
  const response = await fetch("/api");
  const message: Promise<any> = response.json();
  return message;
}) satisfies LoaderFunction;
