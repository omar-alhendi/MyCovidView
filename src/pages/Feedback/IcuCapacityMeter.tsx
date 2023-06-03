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

const IcuCapacityMeter = ({ data }: { data: any }) => {
  const proportionalMeterChartOptions = {
    title: "Proportional Meter Chart (ICU Capacity)",
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
      <MeterChart
        data={data.icuProportionalMeterData}
        options={proportionalMeterChartOptions}
      />
      <h5 style={{ marginTop: "50px", marginBottom: "20px" }}>
        Meter Chart (ICU Utilisation Percentage For Each State)
      </h5>
      {data.icuMeterDataByState.map((state: any) => (
        <MeterChart data={state} options={meterChartOptions} />
      ))}
    </div>
  );
};

export default IcuCapacityMeter;
