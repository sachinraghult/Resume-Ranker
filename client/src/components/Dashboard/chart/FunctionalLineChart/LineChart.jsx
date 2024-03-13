import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import styles from "./LineChart.module.css";

function LineChart({ posts }) {
  const [data, setData] = useState([]);
  const [set, setSet] = useState(false);

  useEffect(() => {
    const populateData = () => {
      let data = posts
        ? [
            ["Timeline", "No of Applicants"],
            ["Last Week", posts[0]],
            ["2nd last week", posts[1]],
            ["3rd last week", posts[2]],
            ["Last month", posts[3]],
          ]
        : [[]];

      setData(data);
      setSet(true);
    };
    populateData();
  }, []);

  const options = {
    title: "Applicants",

    legend: { position: "bottom" },
  };

  return (
    <div>
      {set && data ? (
        <Chart
          className={styles["chart"]}
          chartType="LineChart"
          width="99.5%"
          margin={{ top: 10, right: 25, bottom: 10 }}
          padding-top="20px"
          height="400px"
          data={data}
          options={options}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default LineChart;
