import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import moment from "moment";
import CalculateTime from "../CalculateTime/CalculateTime";
import styles from "./Appliedcards.module.css";

function Appliedcards({ job }) {
  const folder = `https://lh3.googleusercontent.com/d/`;

  const { authToken } = useContext(Context);

  const [application, setApplication] = useState();

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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axios.get(
          `${SERVER_URL}/application/post/` + job.post._id,
          {
            headers: { Authorization: authToken },
          }
        );
        console.log(res.data);
        setApplication(res.data);
      } catch (err) {}
    };
    fetchApplication();
  }, []);

  return (
    <div className={styles["jobAppliedContainer"]}>
      <div className={styles["product-details"]}>
        <h1>
          {job ? job.post.title : null}{" "}
          {application?.status === "Accepted"
            ? "✅"
            : application?.status === "Rejected"
            ? "❌"
            : ""}
          {application?.status === "In Review" && (
            <span style={{ fontSize: "20px" }}>🟠</span>
          )}
        </h1>
        <br></br>
        <span className={styles["postTime"]}>
          <i>
            applied{" "}
            <CalculateTime
              current={new Date(moment().format())}
              previous={new Date(moment(job?.post?.updatedAt).format())}
            />
          </i>
        </span>

        <p className={styles["information"]}>{job ? job.post.desc : null}</p>

        <div className={styles["control"]}>
          <Link
            to={job ? `/apply/${job.post._id}` : "/"}
            style={{ textDecoration: "none" }}
          >
            <button className={styles["btn"]}>
              <span className={styles["buy"]}>View Application</span>
            </button>
          </Link>
        </div>
      </div>

      <div className={styles["product-image"]}>
        <img src={imageCollection[randomIntFromInterval(0, 9)]} alt="" />

        <div className={styles["info"]}>
          <h2> Description</h2>
          <br></br>
          <b
            style={{
              marginLeft: "30px",
              color:
                application?.status === "In Review"
                  ? "orange"
                  : application?.status === "Accepted"
                  ? "green"
                  : "red",
            }}
          >
            {application?.status}
          </b>
          <ul>
            <li>
              <strong>Job Tags : </strong>
            </li>
            {job
              ? job.post.tags?.map((tag) => (
                  <li>
                    <strong>{"        "}</strong>
                    {tag}
                  </li>
                ))
              : null}
            <br></br>
            <li>
              <strong>Deadline: </strong>
            </li>
            <li>
              <strong>{"        "}</strong>
              {job ? formatDate(job.post.deadline) : null}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Appliedcards;
