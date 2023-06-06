import { 
    StackedAreaChart 
} from "@carbon/charts-react";
import {
    ScaleTypes,
    ToolbarControl,
    ToolbarControlTypes
} from "@carbon/charts/interfaces";

const controls: ToolbarControl[] = [
    {
        type: ToolbarControlTypes.SHOW_AS_DATATABLE
    },
    {
        type: ToolbarControlTypes.MAKE_FULLSCREEN
    },
    {
        type: ToolbarControlTypes.RESET_ZOOM
    },
    {
        type: ToolbarControlTypes.EXPORT_JPG
    },
    {
        type: ToolbarControlTypes.EXPORT_PNG
    }
]

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
    toolbar: {
        enabled: true,
        numberOfIcons: 3,
        controls
    },
    zoomBar: {
        top: {
            enabled: true
        }
    },
    height: "400px"
};

const VaccineDoseType = ({ data }: { data: any }) => {
    return (
        <div>
            <h1>Stacked Area Chart</h1>
            <StackedAreaChart data={data} options={options} />
        </div>
    );
};

export default VaccineDoseType;