import BulletChart from "@carbon/charts-react/bullet-chart";
import { ScaleTypes } from "@carbon/charts/interfaces";
import "@carbon/charts/styles.css";
import "@carbon/styles/css/styles.css";
import { useLoaderData } from "react-router-dom";
import { vacRateLoader } from "../loaders";
import { LoaderData } from "../types";

const options = {
    "title": "Percentage of Vaccinated People",
    "axes": {
        "bottom": {
            "mapsTo": "value",
            "extendLinearDomainBy": "max"
        }, 
        "left": {
            "scaleType": ScaleTypes.LABELS,
            "mapsTo": "title"
        },
        "right": {
            "scaleType": ScaleTypes.LABELS_RATIO,
            "mapsTo": "title"
        }
    },
    "height": "400px"
};

const Vaccine = () => {
    const data = useLoaderData() as LoaderData<typeof vacRateLoader>;
    return (
        <div>
            <h1>my covid view</h1>
            <BulletChart data={data} options={options} />
        </div>
    );
};

export default Vaccine;
