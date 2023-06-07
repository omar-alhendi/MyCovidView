import { GaugeChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import { GaugeTypes, Statuses } from "@carbon/charts/interfaces";
import styles from "/src/styles/Style.module.css";

const options = {
    // "title": "Gauge (Covid-19 Test Positve Rate)",
    "resizable": true,
    "height": "250px",
    "width": "100%",
    "gauge": {
      "type": GaugeTypes.SEMI,
      "status": Statuses.DANGER
    }
}


const TestPositiveGauge = ({ data }: { data: any })=>{
    return (
        <><div className={styles.chartWrapper}>
            <h5 className={styles.titleChart}>Positive Rate for Covid Tests</h5>
            <div className={styles.chartContainer}><GaugeChart options={options} data={data} /></div>
        </div></>
    )
}

export default TestPositiveGauge