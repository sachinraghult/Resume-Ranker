import React from "react";
import Chart from "react-google-charts";
import styles from "./DispScatter.module.css";

const scatterData = [
  ["Job Post", "No. of Candidates"],
  ["Post A", 100],
  ["Post B", 200],
  ["Post C", 1000],
  ["Post D", 2000],
];
const scatterOptions = {
  title: "Post vs No. of Applicants",
  hAxis: { title: "Job Post" },
  vAxis: { title: "No. of persons applied", minValue: 1, maxValue: 1000 },
  legend: "displayed",
};

const DispScatter = () => {
  return (
    <div width="100%" height="100%" className={styles["container"]}>
      <Chart
        width={"600px"}
        height={"400px"}
        chartType="ScatterChart"
        loader={<div>Loading Chart</div>}
        data={scatterData}
        options={scatterOptions}
      />
    </div>
  );
};
export default DispScatter;
