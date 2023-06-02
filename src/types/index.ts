import { LoaderFunction } from "react-router-dom";

export type LoaderData<TLoaderFN extends LoaderFunction> = Awaited<
  ReturnType<TLoaderFN>
> extends Response | infer D
  ? D
  : never;

export type DeathsStateType = {
  date: string,
  state: string,
  deaths_new: string,
  deaths_bid: string,
  deaths_new_dod: string,
  deaths_bid_dod: string,
  deaths_unvax: string,
  deaths_pvax: string,
  deaths_fvax: string,
  deaths_boost: string,
  deaths_tat: string
}
