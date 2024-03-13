import React from "react";
import { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// export const data = [
//   { x: 0.235, y: 2 },
//   { x: 0.2578, y: 1 },
//   { x: 0.266, y: 3 },
//   { x: 0.233, y: 2 },
// ];

export const options = {
  title: "Quality of Applicants",
  curveType: "function",
  legend: { position: "bottom" },
  hAxis: {
    title: "Recent Posts",
  },
  vAxis: {
    title: "No. of Applicants",
  },
};

export default function Scattercharts({ scatter }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("second");
    let scorearray = [];
    let scatterData = scatter?.details;
    scatterData?.map((score) => {
      scorearray.push(score.scores[0]);
    });
    console.log(scorearray);
    let a = 0,
      b = 0,
      c = 0,
      d = 0;
    scorearray?.map((score) => {
      if (score <= 0.25) {
        a = a + 1;
      } else if (score <= 0.5) {
        b = b + 1;
      } else if (score <= 0.75) {
        c = c + 1;
      } else if (score <= 1) {
        d = d + 1;
      }
    });
    let p = [
      { x: 0.25, y: a },
      { x: 0.5, y: b },
      { x: 0.75, y: c },
      { x: 1, y: d },
    ];
    setData(p);
  }, []);
  return (
    <div
      width="100%"
      height="100%"
      style={{ marginTop: "25px", marginBottom: "50px" }}
    >
      <h3>Scatter Distribution of Applicants over Score</h3>
      <br></br>
      <ScatterChart
        width={500}
        height={300}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        options={options}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="Score" unit="" />
        <YAxis type="number" dataKey="y" name="No. of Applicants" unit="" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="A point" data={data} fill="#8884d8" />
      </ScatterChart>
    </div>
  );
}
