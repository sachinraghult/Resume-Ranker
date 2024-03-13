import React from "react";
import Table from "./Table";
import Bargraph from "./Bargraph";
import Scattercharts from "./Scattercharts";
import "./ReportUI.css";

const ReportUI = React.forwardRef((props, ref) => {
  return (
    <div
      style={{
        marginLeft: "50px",
        marginRight: "50px",
      }}
      ref={ref}
    >
      {props &&
        props.result &&
        props?.result?.map((result) => {
          return (
            <div
              width="100%"
              height="100%"
              style={{
                padding: "10px",
                marginTop: "10px",
                marginBottom: "10px",
                background: "#6f7161",
                borderRadius: "10px",
              }}
            >
              <br></br>
              <br></br>

              <div className="cardContainer">
                <h1>Report Card</h1>
                <br></br>
                <br></br>

                <div>
                  <h3>
                    <b>Post Title :</b>&nbsp;{result.title}
                  </h3>
                  <h6>
                    <b>
                      <i>Number of Aplicants :</i>
                    </b>
                    &nbsp;{result.applications}
                  </h6>
                </div>
              </div>

              <br></br>

              <div className="tableContainer">
                <Table tableDetails={result.table} />
              </div>

              <br></br>

              <div className="graphContainer">
                <div>
                  <Bargraph bargraph={result.table} />
                </div>
                <div>
                  <Scattercharts scatter={result.scatter} />
                </div>
              </div>

              <br></br>
            </div>
          );
        })}
    </div>
  );
});

export default ReportUI;
