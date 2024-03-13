import "./postInfo.css";
import { productData } from "../../../dummyData";
import LineChart from "../chart/FunctionalLineChart/LineChart";
import { useEffect } from "react";

export default function PostInfo({ info }) {
  const imageCollection = [
    "/Hiring/one.jpg",
    "/Hiring/two.jpg",
    "/Hiring/three.jpg",
    "/Hiring/four.png",
    "/Hiring/five.jpg",
    "/Hiring/six.jpg",
    "/Hiring/seven.jpg",
    "/Hiring/eight.jpg",
    "/Hiring/nine.jpg",
    "/Hiring/ten.jpg",
  ];

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="product">
      {/* JobPost information card */}

      <div className="productTopRight" style={{ backgroundColor: "#f2f2f2" }}>
        <div className="productName">{info ? info.title : null}</div>
        <i style={{ color: "grey" }}>
          created at {info ? info.createdAt : null} and{" "}
          {info ? (info.active === "YES" ? "passes " : "passed ") : null}{" "}
          deadline by {info ? info.deadline : null}
        </i>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">
                  <b>Description</b>
                </span>
                <div className="productInfoValue">
                  <span>{info ? info.description : null}</span>
                  <br></br>
                </div>
              </div>

              {/* <div className="productInfoItem">
            <span className="productInfoKey">
              <b>Experience</b>
            </span>
            <div className="productInfoValue">
              <span>{info.experience}</span>
            </div>
          </div> */}

              <div className="productInfoItem">
                <span className="productInfoKey">
                  <b>Skills Required</b>
                </span>
                <div className="productInfoValue" style={{ display: "flex" }}>
                  {info &&
                    info.skills &&
                    info.skills.map((skill, i) => (
                      <div key={i}>
                        {" "}
                        {skill.skill} {i === info.skills.length - 1 ? "" : ","}{" "}
                      </div>
                    ))}
                </div>
              </div>

              <div className="productInfoItem">
                <span className="productInfoKey">
                  <b>Number of Applications</b>
                </span>
                <div className="productInfoValue">
                  <i>{info ? info.num : null} applicant received till now</i>
                </div>
              </div>

              <div className="productInfoItem">
                <span className="productInfoKey">
                  <b>Status of Job post</b>
                </span>
                <div className="productInfoValue">
                  {info ? (
                    info.active === "YES" ? (
                      <span>
                        <span class="logged-in">● </span>
                        <span>Active </span>
                      </span>
                    ) : (
                      <span>
                        <span class="logged-out">● </span>
                        <span>Deadline Passed </span>
                      </span>
                    )
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              className="posterImg"
              src={imageCollection[randomIntFromInterval(0, 9)]}
              alt="poster"
            />
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
