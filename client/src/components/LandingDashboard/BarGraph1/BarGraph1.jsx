import React, { useState, useEffect, useContext } from "react";
import { Chart } from "react-google-charts";
import styles from "./BarGraph1.module.css";

// export const data = [
//   ["Job Posts", "Applicants", { role: "style" }],
//   ["Job #1", 20, "#b87333"], // RGB value
//   ["Job #2", 100, "silver"], // English color name
//   ["Job #3", 96, "gold"],
//   ["Job #4", 108, "color: #e5e4e2"], // CSS-style declaration
// ];

export default function BarGraph({ posts }) {
  const [set, setSet] = useState(false);

  let data = [["Job Posts", "Applicants", { role: "style" }]];

  useEffect(() => {
    const populateData = () => {
      posts?.length &&
        posts?.map((post) =>
          data.push([post?.title, post?.applications.length, "gold"])
        );
      if (data[1]) data[1][2] = "red";
      if (data[2]) data[2][2] = "grey";
      if (data[3]) data[3][2] = "blue";
      if (data[4]) data[4][2] = "black";
      setSet(true);
    };
    populateData();
  }, [data]);

  var options = {
    hAxis: {
      title: "Recent Posts",
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
        <h5></h5>
      )}
    </div>
  );
}
