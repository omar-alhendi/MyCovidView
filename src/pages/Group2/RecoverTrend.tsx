import { ScaleTypes } from "@carbon/charts/interfaces";

import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import "@carbon/styles/css/styles.css";
import styles from "/src/styles/Style.module.css";


const options = {
    // title: "Stacked Line Chart (Recovered & Active Cases)",
    points: {
      enabled: false,
      radius: 3,
    },
    axes: {
      bottom: {
        title: "Date",
        mapsTo: "date",
        scaleType: ScaleTypes.TIME,
      },
      left: {
        mapsTo: "value",
        title: "Cases",
        scaleType: ScaleTypes.LINEAR,
      },
    },
    curve: "curveMonotoneX",
    height: "80vh",
    zoomBar: {
      top: {
        enabled: true,
        initialZoomDomain: [
          new Date(new Date().getFullYear() - 1, 0, 1), //set auto zoom to 365 days before
          new Date() , // Set the current date
        ],
      },
    },
  };
  
  const StackedLine = ({ data }: { data: any }) => {

    return (
      <div>
        <h5 className={styles.titleChart}>Stacked Line Chart (Recovered & Active Cases)</h5>
        <section><LineChart data={data} options={options} /></section>
      </div>
    );
  };
  
  export default StackedLine;
