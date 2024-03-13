import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import styles from "./Barchart.module.css";

export default function Barchart({ info }) {
  const [set, setSet] = useState(false);

  let data = [["Skill", "Score", { role: "style" }]];
  // let data = [
  //   [
  //     { label: "Skill", type: "string" },
  //     { label: "Score", type: "number" },
  //   ],
  // ];

  useEffect(() => {
    const populateData = () => {
      let arr = info ? info.count : [];

      info &&
        info.skill &&
        info.skill.map((sk, ind) => {
          const d = arr[ind] / info.d;
          data.push([String(sk), parseFloat(d), "blue"]);
        });
      setSet(true);
    };
    populateData();
  });

  var options = {
    vAxis: {
      title: "Density",
      viewWindowMode: "explicit",
      viewWindow: {
        min: 0,
        max: data.length,
      },
    },
    hAxis: {
      title: "Skills",
    },
  };

  return (
    <div className={styles["container"]}>
      {set && info && info?.skill ? (
        <Chart
          chartType="ColumnChart"
          height={450}
          data={data}
          options={options}
        />
      ) : (
        ""
      )}
    </div>
  );
}
