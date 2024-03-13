import React from "react";
import Table from "./Table";
import Bargraph from "./Bargraph";
import Scattercharts from "./Scattercharts";

const Report = React.forwardRef((props, ref) => {
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
              }}
            >
              <br></br>
              <br></br>

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
              <br></br>

              <Table tableDetails={result.table} />

              <Bargraph bargraph={result.table} />
              <br></br>

              <Scattercharts scatter={result.scatter} />
              <br></br>
            </div>
          );
        })}
    </div>
  );
});

export default Report;
