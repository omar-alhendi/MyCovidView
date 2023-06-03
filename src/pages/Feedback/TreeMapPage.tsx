import { TreemapChart } from "@carbon/charts-react";
import "@carbon/styles/css/styles.css";
import "@carbon/charts/styles.css";

const options = {
  title: "Treemap(daily partial of vaccination by districts)",
  height: "400px",
};

const TreeMapPage = ({ data }: { data: any }) => {
  return <TreemapChart data={data} options={options} />;
};

export default TreeMapPage;
