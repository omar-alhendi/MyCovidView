import { GaugeChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import { GaugeTypes, Statuses } from "@carbon/charts/interfaces";


const TestPositiveGauge = ({ data }: { data: any })=>{
    const options = {
        "title": "Gauge (Covid-19 Test Positve Rate)",
        "resizable": true,
        "height": "250px",
        "width": "100%",
        "gauge": {
          "type": GaugeTypes.SEMI,
          "status": Statuses.DANGER
        }
    }

    return (
        <div>
            <h1>Positive Rate for Covid Tests</h1>
            <GaugeChart options={options} data={data}/>
        </div>
    )
}

export default TestPositiveGauge