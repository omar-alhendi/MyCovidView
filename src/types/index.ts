import { LoaderFunction } from "react-router-dom";

export type LoaderData<TLoaderFN extends LoaderFunction> = Awaited<
  ReturnType<TLoaderFN>
> extends Response | infer D
  ? D
  : never;
