import React from "react";
import { Chart } from "react-google-charts";
import styles from "./Pie.module.css";

export const data = [
  ["Skill", "Applicants per skill"],
  ["Machine Learning", 11],
  ["Java", 2],
  ["Web Development", 2],
  ["Deep Learning", 2],
  ["Spring", 7],
];

export const options = {
  title: "Skill-Set",
  is3D: true,
};

function Pie() {
  return (
    <Chart
      className={styles["chart"]}
      chartType="PieChart"
      data={data}
      options={options}
      width={"60%"}
      height={"350px"}
    />
  );
}

export default Pie;
