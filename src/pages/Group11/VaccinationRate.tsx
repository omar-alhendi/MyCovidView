import BulletChart from "@carbon/charts-react/bullet-chart";
import { ScaleTypes } from "@carbon/charts/interfaces";


const options = {
  title: "Percentage of Vaccinated People",
  axes: {
    bottom: {
      mapsTo: "value",
      extendLinearDomainBy: "max",
    },
    left: {
      scaleType: ScaleTypes.LABELS,
      mapsTo: "title",
    },
    right: {
      scaleType: ScaleTypes.LABELS_RATIO,
      mapsTo: "title",
    },
  },
  height: "400px",
};

const VaccinationRate = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>Bullet Chart</h1>
      <BulletChart data={data} options={options} />
    </div>
  );
};

export default VaccinationRate;
