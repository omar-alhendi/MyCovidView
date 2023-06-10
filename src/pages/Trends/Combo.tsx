import { ComboChart } from "@carbon/charts-react";
import { ScaleTypes } from "@carbon/charts/interfaces";

const options = {
  "title": "Active vs New Cases",
  "points": {
    "enabled": false
  },
  "axes": {
    "left": {
      "title": "Active Cases",
      "mapsTo": "active_cases",
      "domain": [0, 350000]
    },
    "bottom": {
      "scaleType": ScaleTypes.TIME,
      "mapsTo": "key"
    },
    "right": {
      "title": "New Cases",
      "mapsTo": "new_cases",
      "correspondingDatasets": [
        "cases_new"
      ],
      "domain": [0, 350000]
    }
  },
  "comboChartTypes": [
    {
      "type": "area",
      "options": {},
      "correspondingDatasets": [
        "cases_active"
      ]
    },
    {
      "type": "line",
      "options": {},
      "correspondingDatasets": [
        "cases_new"
      ]
    }
  ],
  "curve": "curveNatural",
  "timeScale": {
    "addSpaceOnEdges": 0
  },
  "height": "700px"
};

const Combo = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>Combo (Line + Area) Chart</h1>
      <ComboChart data={data} options={options} />
    </div>
  )
};

export default Combo;