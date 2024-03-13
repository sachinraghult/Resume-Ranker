import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { Context } from "../../context/Context";
import styles from "./JobCards.module.css";

function JobCards(props) {
  let navigate = useNavigate();

  const { authToken } = useContext(Context);

  const [application, setApplication] = useState();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  const handleApply = (e) => {
    navigate("/apply/" + props.post._id);
  };

  function onEmailClick() {
    window.open(`mailto:${props.post.email}`);
  }

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axios.get(
          `${SERVER_URL}/application/post/` + props.post._id,
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
    <div className={styles.jobcard}>
      <div className={styles.jobcardheader}>
        <div>
          <img
            className={styles.cardImg}
            src={
              window.location.origin +
              imageCollection[randomIntFromInterval(0, 9)]
            }
            alt="job poster"
          />
        </div>
        <div className={styles.deadline}>
          <div style={{ fontSize: "14px" }}>
            <b>Deadline</b>
          </div>
          <div>
            <time
              className={`${styles.dateAsCalendar} ${styles.positionPixels}`}
            >
              <span className={styles.weekday}>
                {props.post
                  ? dayNames[new Date(props.post.deadline).getDay()]
                  : null}
              </span>
              <span className={styles.day}>
                {props.post ? new Date(props.post.deadline).getDate() : null}
              </span>
              <span className={styles.month}>
                {props.post
                  ? monthNames[new Date(props.post.deadline).getMonth()]
                  : null}
              </span>
              <span className={styles.year}>
                {props.post
                  ? new Date(props.post.deadline).getFullYear()
                  : null}
              </span>
            </time>
          </div>
        </div>
      </div>

      <div className={styles.jobdetailbuttons}>
        {props?.post?.applied ? (
          <button
            className={`${styles.searchbuttons} ${styles.detailbutton}`}
            style={{
              backgroundColor:
                application?.status === "In Review"
                  ? "rgb(245, 214, 157, 0.4)"
                  : application?.status === "Accepted"
                  ? "rgb(184, 236, 184, 0.4)"
                  : "rgb(244, 165, 165, 0.4)",
              color:
                application?.status === "In Review"
                  ? "orange"
                  : application?.status === "Accepted"
                  ? "green"
                  : "red",
            }}
          >
            {application?.status}
          </button>
        ) : null}
      </div>

      <div className={styles.jobcardtitle}>
        {props.post ? props.post.title : null}
      </div>
      <div className={styles.jobcardsubtitle}>
        {props.post ? props.post.desc : null}
      </div>
      <div className={styles.jobdetailbuttons}>
        {props.post
          ? props.post.tags?.map((tag) => (
              <button
                className={`${styles.searchbuttons} ${styles.detailbutton}`}
              >
                {tag}
              </button>
            ))
          : null}
      </div>
      <div className={styles.jobcardbuttons}>
        <button
          data-testid="handleApply"
          className={`${styles.searchbuttons} ${styles.cardbuttons}`}
          onClick={handleApply}
        >
          {props.post ? (props.post.applied ? "Applied" : "Apply Now") : null}
        </button>
        <button
          className={`${styles.searchbuttons} ${styles.cardbuttonsmsg}`}
          onClick={onEmailClick}
        >
          Contact
        </button>
      </div>
    </div>
  );
}

export default JobCards;
