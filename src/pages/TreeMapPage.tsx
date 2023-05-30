import { treeMapLoader } from "../loaders";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../types";
import { TreemapChart } from "@carbon/charts-react";
import "@carbon/styles/css/styles.css";
import "@carbon/charts/styles.css";

const options = {
  title: "Treemap(daily partial of vaccination by districts)",
  height: "400px",
};

const TreeMapPage = () => {
  const data = useLoaderData() as LoaderData<typeof treeMapLoader>;
  return <TreemapChart data={data} options={options} />;
};

export default TreeMapPage;
