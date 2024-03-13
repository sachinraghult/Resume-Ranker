import React, { useState, useEffect, useContext } from "react";
import { Chart } from "react-google-charts";
import styles from "./BarGraph2.module.css";

// export const data = [
//   ["Job Posts", "Applicants", { role: "style" }],
//   ["Job #1", 20, "#b87333"], // RGB value
//   ["Job #2", 100, "silver"], // English color name
//   ["Job #3", 96, "gold"],
//   ["Job #4", 108, "color: #e5e4e2"], // CSS-style declaration
// ];

export default function BarGraph2({ posts }) {
  const [set, setSet] = useState(false);

  let data = [["Job Posts", "Applicants", { role: "style" }]];

  useEffect(() => {
    const populateData = () => {
      posts?.length &&
        posts?.map((post) =>
          data.push([post?.title, post?.applications.length, "gold"])
        );
      if (data[1]) data[1][2] = "green";
      if (data[2]) data[2][2] = "orange";
      setSet(true);
    };
    populateData();
  }, [data]);

  var options = {
    hAxis: {
      title: "Highest vs Lowest post",
    },
    vAxis: {
      title: "No. of Applicants",
    },
  };

  return (
    <div className={styles["container"]}>
      {set && posts?.length ? (
        <Chart
          chartType="ColumnChart"
          // width="700px"
          height="400px"
          data={data}
          options={options}
        />
      ) : (
        <h5>No statistical graphs to be shown</h5>
      )}
    </div>
  );
}
