import { GaugeChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import { GaugeTypes, Statuses } from "@carbon/charts/interfaces";

const options = {
    title: "Covid-19 Test Positve Rate",
    resizable: true,
    height: "250px",
    width: "100%",
    gauge: {
      type: GaugeTypes.SEMI,
      status: Statuses.DANGER
    }
}

const Gauge = ({ data }: { data: any })=>{
    return (
        <div>
            <h1>Gauge Chart</h1>
            <GaugeChart options={options} data={data}/>
        </div>
    )
}

export default Gauge