//Gauge / Progress bar for Test Rates (from tests_malaysia.csv and tests_state.csv): This can show the percentage of daily tests that come back positive for COVID-19, both at a national and state level. This is often referred to as the test positivity rate.
import { GaugeChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import { GaugeTypes, Statuses } from "@carbon/charts/interfaces";
import { LoaderData } from "../types";
import { testPositiveLoader } from "../loaders";
import { useLoaderData } from "react-router-dom";


const options = {
    "title": "Gauge semicircular -- danger status",
    "resizable": true,
    "height": "250px",
    "width": "100%",
    "gauge": {
      "type": GaugeTypes.SEMI,
      "status": Statuses.DANGER
    }
}

const TestPositiveGauge = ()=>{
  const data = useLoaderData() as LoaderData<typeof testPositiveLoader>;

    return (
        <div>
            <h1>Positive Rate for Covid Tests</h1>
            <GaugeChart options={options} data={data}/>
        </div>
    )
}

export default TestPositiveGauge