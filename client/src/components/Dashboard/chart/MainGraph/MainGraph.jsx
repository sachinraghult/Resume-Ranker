import React from "react";
import { Chart } from "react-google-charts";
import styles from "./MainGraph.module.css";

const MainGraph = ({ scores }) => {
  var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var i = 0;
  console.log(scores);
  for (i = 0; i < (scores ? scores.length : 0); i++) {
    if (scores[i] >= 0 && scores[i] <= 10) {
      count[0]++;
    } else if (scores[i] > 10 && scores[i] <= 20) {
      count[1]++;
    } else if (scores[i] > 20 && scores[i] <= 30) {
      count[2]++;
    } else if (scores[i] > 30 && scores[i] <= 40) {
      count[3]++;
    } else if (scores[i] > 40 && scores[i] <= 50) {
      count[4]++;
    } else if (scores[i] > 50 && scores[i] <= 60) {
      count[5]++;
    } else if (scores[i] > 60 && scores[i] <= 70) {
      count[6]++;
    } else if (scores[i] > 70 && scores[i] <= 80) {
      count[7]++;
    } else if (scores[i] > 80 && scores[i] <= 90) {
      count[8]++;
    } else if (scores[i] > 90 && scores[i] <= 100) {
      count[9]++;
    }
  }

  const Main_data = [
    ["Score Range", "No. of applicants "],
    ["0-10", count[0]],
    ["11-20", count[1]],
    ["21-30", count[2]],
    ["31-40", count[3]],
    ["41-50", count[4]],
    ["51-60", count[5]],
    ["61-70", count[6]],
    ["71-80", count[7]],
    ["81-90", count[8]],
    ["91-100", count[9]],
  ];

  const ChartOptions = {
    title: "Score vs Applicants",
    hAxis: {
      title: "No. of applicants",
      viewWindowMode: "explicit",
      viewWindow: {
        min: 0,
      },
    },
    vAxis: { title: "Normalized Score Range" },
    legend: "none",
  };

  return (
    <div className={styles["container"]}>
      {scores ? (
        <Chart
          chartType="BarChart"
          height={450}
          data={Main_data}
          options={ChartOptions}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default MainGraph;
