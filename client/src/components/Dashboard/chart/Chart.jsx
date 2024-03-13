import styles from "./Chart.module.css";
import React from "react";
import Chart from "react-google-charts";
const LineData = [
  ["Job Post", "No. of Candidates"],
  ["Post A", 100],
  ["Post B", 200],
  ["Post C", 1000],
  ["Post D", 2000],
];
const LineChartOptions = {
  title: "Post vs No. of Applicants",
  hAxis: { title: "Job Posts" },
  vAxis: { title: "No. of persons applied" },
};

const DispChart = () => {
  return (
    <div>
      <Chart
        className={styles["chart"]}
        width={"650px"}
        height={"400px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={LineData}
        options={LineChartOptions}
      />
    </div>
  );
};
export default DispChart;
