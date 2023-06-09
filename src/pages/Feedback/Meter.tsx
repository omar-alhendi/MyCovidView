import { MeterChart } from "@carbon/charts-react";

const meterChartOptions: any = {
  meter: {
    title: null,
    style: {
      ".header": { display: "none" },
    },
    peak: 80,
    status: {
      ranges: [
        {
          range: [0, 50],
          status: "success",
        },
        {
          range: [50, 60],
          status: "warning",
        },
        {
          range: [60, 100],
          status: "danger",
        },
      ],
    },
  },
  toolbar: { enabled: false },
  height: "32px",
};

const Meter = ({ data }: { data: any }) => {
  const proportionalMeterChartOptions = {
    title: "ICU Capacity",
    height: "200px",
    meter: {
      proportional: {
        total: data.totalIcuBeds,
        unit: "Bed",
      },
    },
    color: {
      pairing: {
        option: 2,
      },
    },
  };
  return (
    <div>
      <h1>Proportional Meter Chart</h1>
      <MeterChart
        data={data.icuProportionalMeterData}
        options={proportionalMeterChartOptions}
      />
      <h1 style={{ marginTop: "50px", marginBottom: "20px" }}>
        Meter Chart
      </h1>
      <h5> ICU Utilisation Percentage For Each State</h5>
      {data.icuMeterDataByState.map((state: any) => (
        <MeterChart data={state} options={meterChartOptions} />
      ))}
    </div>
  );
};

export default Meter;
