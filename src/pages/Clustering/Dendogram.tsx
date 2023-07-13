import { TreeChart } from "@carbon/charts-react";
import { TreeTypes } from "@carbon/charts";

const options = {
  title: "States with districts in Malaysia",
  resizable: true,
  height: "4000px",
  tree: {
    type: TreeTypes.DENDROGRAM,
    rootTitle: "Malaysia",
  },
};

const Dendrogram = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>Dendogram</h1>
      <TreeChart data={data} options={options} />
    </div>
  );
};

export default Dendrogram;
