import { SliderMarkLabel } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Bargraph = ({ bargraph }) => {
  const [data, setData] = useState([]);
  // const data = [
  //   {
  //     name: "Page A",
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C",
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D",
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E",
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F",
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G",
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];

  useEffect(() => {
    let tableData = [];

    bargraph?.details?.map((row, i) => {
      console.log("bar");
      console.log(row);
      tableData.push({
        name: row.users,
        Skill: row.scores[1],
        Exp: row.scores[2],
        Org: row.scores[3],
        JobSwitch: row.scores[4],
        Keyword: row.scores[5],
        Institute: row.scores[6],
      });
    });

    setData(tableData);
  }, []);
  // console.log("bar");
  // console.log(data);
  return (
    <div
      width="100%"
      height="100%"
      style={{ marginTop: "25px", marginBottom: "50px" }}
    >
      <h3 style={{ marginBottom: "25px" }}>
        Distribution of Top Applicants Score
      </h3>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend wrapperStyle={{ top: 0, right: 0 }} />
        <Bar dataKey="Skill" stackId="a" fill="#003366" />
        <Bar dataKey="Exp" stackId="a" fill="#0099e6" />
        <Bar dataKey="Org" stackId="a" fill="#ff6600" />
        <Bar dataKey="JobSwitch" stackId="a" fill="#ffa31a" />
        <Bar dataKey="Keyword" stackId="a" fill="#cc33ff" />
        <Bar dataKey="Institute" stackId="a" fill="#66ff33" />
      </BarChart>
    </div>
  );
};

export default Bargraph;
