import React from "react";
import { Chart } from "react-google-charts";

const Piechart = ({ score }) => {
  const data = score
    ? [
        ["Scores", "No of Applicants"],
        ["Score: 0  - 25", score[0]],
        ["Score: 26 - 50", score[1]],
        ["Score: 51 - 70", score[2]],
        ["Score: 71 - 90", score[3]],
        ["Score: 91 - 100", score[4]],
      ]
    : [
        ["Scores", "No of Applicants"],
        ["Score: 0  - 25", 0],
        ["Score: 26 - 50", 0],
        ["Score: 51 - 70", 0],
        ["Score: 71 - 90", 0],
        ["Score: 91 - 100", 0],
      ];

  const options = {
    backgroundColor: "transparent",
    chartArea: { width: 700, height: 700 },
  };

  return (
    <div
      width="100%"
      height="100%"
      style={{ marginBottom: "50px", cursor: "pointer" }}
    >
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"200px"}
      />
    </div>
  );
};

export default Piechart;
