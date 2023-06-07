import { StackedBarChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";
import styles from "/src/styles/Style.module.css"; 

const options = {
  // title:
  //   "Horizontal Progress Bar Chart (percentage of vaccinated people in malaysian states)",
  axes: {
    left: {
      mapsTo: "group",
      title: "State",
      scaleType: ScaleTypes.LABELS,
    },
    bottom: {
      title: "Percentage of vaccinated people",
      mapsTo: "value",
    },
  },
  height: "400px",
};
const VaccinationProgress = ({ data }: { data: any }) => {
  return (
    <div>
      <h5 className={styles.titleChart}>Horizontal Progress Bar Chart (percentage of vaccinated people in malaysian states)</h5>
      <section className={styles.chartContainer}><StackedBarChart data={data} options={options} /></section>
    </div>
  );
};

export default VaccinationProgress;
