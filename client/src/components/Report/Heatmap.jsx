import React from "react";
import { HeatMapGrid } from "react-grid-heatmap";

const HeatMap = ({ scores }) => {
  const xLabels = ["Skill", "Exp", "Org", "JobSwitch", "Keyword", "Institute"];
  const yLabels = [""];
  const datas = scores
    ? [
        [
          scores[1].toFixed(2),
          scores[2].toFixed(2),
          scores[3].toFixed(2),
          scores[4].toFixed(2),
          scores[5].toFixed(2),
          scores[6].toFixed(2),
        ],
      ]
    : [[0, 0, 0, 0, 0, 0]];
  return (
    <div
      style={{
        width: "100%",
        marginLeft: "80px",
      }}
    >
      <HeatMapGrid
        data={datas}
        xLabels={xLabels}
        yLabels={yLabels}
        // Reder cell with tooltip
        cellRender={(x, y, value) => (
          <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
        )}
        xLabelsStyle={(index) => ({
          //   color: index % 2 ? 'transparent' : '#777',
          fontSize: ".8rem",
        })}
        yLabelsStyle={() => ({
          fontSize: ".8rem",
          textTransform: "uppercase",
          color: "#777",
        })}
        cellStyle={(_x, _y, value) => ({
          background: `rgb(0, 153, 255, ${value + 0.05})`,
          fontSize: ".8rem",
          color: `rgb(0, 0, 0)`,
          marginTop: "5px",
        })}
        // cellStyle={(_x, _y, ratio) => ({
        //   background: `rgb(128, 0, 128, ${ratio})`,
        //   fontSize: ".8rem",
        //   color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
        // })}
        cellHeight="4rem"
        cellWidth="4rem"
        xLabelsPos="bottom"
        yLabelsPos="right"
        square
      />
    </div>
  );
};

export default HeatMap;
