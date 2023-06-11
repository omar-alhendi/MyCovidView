import { dendrogramLoader } from "../loaders";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../types";
import { TreeChart } from "@carbon/charts-react";
import { TreeTypes } from "@carbon/charts/interfaces/enums";

const options = {
  title: "States with districts in Malaysia",
  height: "4000px",
  tree: {
    type: TreeTypes.DENDROGRAM,
    rootTitle: "Malaysia",
  },
};

const Dendrogram = () => {
  const data = useLoaderData() as LoaderData<typeof dendrogramLoader>;
  return <TreeChart data={data} options={options} />;
};

export default Dendrogram;
