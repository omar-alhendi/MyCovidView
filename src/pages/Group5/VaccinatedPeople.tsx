import { LollipopChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";

const options = {
  title:
    "Lollipop Chart (The number of vaccinated people by states)",
  axes: {
    left: {
      title: "The number of vaccinated people",
      mapsTo: "value",
      scaleType: ScaleTypes.LINEAR,
    },
    bottom: {
      mapsTo: "group",
      title: "State",
      scaleType: ScaleTypes.LABELS,
    },
  },
  height: "500px",
};
const VaccinatedPeople = ({ data }: { data: any }) => {
  return (
    <div>
      <LollipopChart data={data} options={options}/>
    </div>
  );
};

export default VaccinatedPeople;
