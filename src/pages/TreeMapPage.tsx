import { treeMapLoader } from "../loaders";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../types";
import { TreemapChart } from "@carbon/charts-react";
import "@carbon/styles/css/styles.css";
import "@carbon/charts/styles.css";

const TreeMapPage = () => {
    const data = useLoaderData() as LoaderData<typeof treeMapLoader>;
    const state = {
      data,
      options: {
        "title": "Treemap(daily partial of vaccination by districts)",
        "height": "400px"
      }
    }
    console.log(data);
  
    return (
      <TreemapChart
        data={state.data}
        options={state.options}
      />
    );
  };
  
  export default TreeMapPage;