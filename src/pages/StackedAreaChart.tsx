import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../types";
import "@carbon/charts/styles.css";
import "@carbon/styles/css/styles.css";
import { stackedAreaLoader } from "../loaders";
import { StackedAreaChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";

const options = {
    title: "Number of vaccinations by dose type in the last 30 days",
    axes: {
        left: {
            stacked: true,
            mapsTo: "value",
            title: "Number of vaccinations",
            scaleType: ScaleTypes.LINEAR
        },
        bottom: {
            mapsTo: "date",
            title: "Date",
            scaleType: ScaleTypes.TIME
        }
    },
    height: "400px"
};

const StackedAreaChartPage = () => {
    const data = useLoaderData() as LoaderData<typeof stackedAreaLoader>;

    return (
        <div>
            <h1>Stacked Area Chart</h1>
            <StackedAreaChart data={data} options={options} />
        </div>
    );
};

export default StackedAreaChartPage;