import { dendrogramLoader } from "../loaders";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../types";
import { TreemapChart } from "@carbon/charts-react";
import "@carbon/styles/css/styles.css";
import "@carbon/charts/styles.css";

const options = {
    title: "Treemap(daily partial of vaccination by districts)",
    height: "400px",
};

const Dendrogram = () => {
    const data = useLoaderData() as LoaderData<typeof dendrogramLoader>;
    return <TreemapChart data={data} options={options} />;
};

export default Dendrogram;
