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

const charts = ({ data: formData }: any) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const filteredData = formData.filter(
      (d: any) => d.state !== "Malaysia" && !!d.state
    );

    setData(filteredData);
  }, [formData]);

  return (
    <div>
      <h1 style={{ margin: "4rem" }}>Line Charts For Malaysia Population</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" interval={0} />
          <YAxis type="number" />
          <Tooltip />
          <Legend />
          <Bar dataKey="pop_5" fill="#8884d8" />
          <Bar dataKey="pop_12" fill="#82ca9d" />
          <Bar dataKey="pop_18" fill="#8884d8" />
          <Bar dataKey="pop_60" fill="#82ca9d" />
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
