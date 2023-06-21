import { GroupedBarChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";

const options = {
  title:
    "Percentage of Fully Vaccinated Adults and Children Across Different Malaysia States",
  axes: {
    left: {
      title: "Percentage of fully vaccinated people (%)",
      mapsTo: "value",
    },
    bottom: {
      padding: {
        inner: 0,
      },
      mapsTo: "key",
      title: "Group (Adults/Children)",
      scaleType: ScaleTypes.LABELS,
    },
  },
  height: "400px",
};
const ColumnChart = ({ data }: { data: any }) => {
  const flattenedDataArray = data.flat(Infinity);

  return (
    <div>
      <h1>Column Chart</h1>
      <GroupedBarChart data={flattenedDataArray} options={options} />
    </div>
  );
};

export default ColumnChart;
