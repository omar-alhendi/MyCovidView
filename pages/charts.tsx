import React, { useState, useEffect } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { fetcher } from "@/utils";
import { URL } from "@/constants";
import { Title, createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  chart: {
    width: "100%",
    height: "400px",
    boxSizing: "border-box",
  },
}));

const charts = ({ data: formData }: any) => {
  const [data, setData] = useState([]);
  const { classes } = useStyles();

  useEffect(() => {
    const filteredData = formData.filter(
      (d: any) => d.state !== "Malaysia" && !!d.state
    );

    setData(filteredData);
  }, [formData]);

  return (
    <div>
      <Title py={32}>Line Charts For Malaysia Population</Title>
      <ResponsiveContainer height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pop" fill="#8884d8" />
          <Bar dataKey="pop_5" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const getServerSideProps = async () => {
  const data = await fetcher(URL.CHARTS1);
  return { props: { data } };
};

export default charts;
