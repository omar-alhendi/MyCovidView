import React, { useState, useEffect } from "react";
import { DonutChart } from "@carbon/charts-react";

const options = {
  title: "The number of vaccinated people by states",
  axes: {
    left: {
      title: "The number of vaccinated people",
      mapsTo: "value",
    },
    bottom: {
      mapsTo: "group",
      title: "District",
    },
  },
  height: "500px",
};

const VaccinatedPeopleByDistrict = ({ data }: { data: any }) => {
  const [districtData, setDistrictData] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    setDistrictData(data);
  }, [data]);

  const handleStateChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedState(event.target.value);
  };

  const states = Array.from(new Set(districtData.map((row: any) => row.state)));

  const filteredData = districtData.filter(
    (row: any) => row.state === selectedState
  );

  const chartData = filteredData.map((row: any) => ({
    group: row.district,
    value: row.value,
  }));

  return (
    <div>
      <h1>Donut Chart</h1>
      <label htmlFor="state-select">Select a State:</label>
      <select
        id="state-select"
        value={selectedState}
        onChange={handleStateChange}
      >
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <DonutChart data={chartData} options={options} />
    </div>
  );
};

export default VaccinatedPeopleByDistrict;
