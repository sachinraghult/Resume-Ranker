import { Layout } from "../../components";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FileUpload } from "../../components";
import { useLocation } from "react-router-dom";
import { BookmarkBorder, Bookmark } from "@mui/icons-material";
import { Context } from "../../context/Context";
import styles from "./JobApplication.module.css";

import { SERVER_URL } from "../../config";

const JobApplication = () => {
  const folder = `https://lh3.googleusercontent.com/d/`;

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

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const { user, authToken } = useContext(Context);

  const [post, setPost] = useState();
  const [application, setApplication] = useState();
  const [applied, setApplied] = useState(false);
  const [checkBookmark, setCheckBookmark] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [resume, setResume] = useState();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/post/` + path, {
          headers: { Authorization: authToken },
        });
        setPost(res.data);
      } catch (err) {}
    };
    const fetchApplication = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/application/post/` + path, {
          headers: { Authorization: authToken },
        });
        console.log(res.data);
        setApplication(res.data);
      } catch (err) {}
    };
    const checkApplied = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/application/check/` + path, {
          headers: { Authorization: authToken },
        });
        if (res.data != null) {
          setApplied(true);
          fetchApplication();
          fetchResume();
        }
      } catch (err) {}
    };
    const checkBookmark = async () => {
      if (user) {
        if (user.profile.bookmarks.includes(path)) {
          setBookmark(true);
          setCheckBookmark(true);
        } else setCheckBookmark(true);
      }
    };
    fetchDetails();
    checkApplied();
    checkBookmark();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchResume = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/application/resume/` + path, {
        headers: { Authorization: authToken },
      });
      setResume(res.data);
    } catch (err) {}
  };

  const handleBookmark = async () => {
    try {
      const res = await axios.put(
        `${SERVER_URL}/post/bookmark/` + path,
        {},
        {
          headers: { Authorization: authToken },
        }
      );
      if (res.data != null) setBookmark(!bookmark);
    } catch (err) {}
  };

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

  return (
    <div>
      <Layout />
      <div className={styles.JobApplicationContainer}>
        <>
          {post && checkBookmark && (
            <div className={styles.jobcontainer}>
              <br></br>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "-10px",
                }}
              >
                <div>
                  <h1>{post.title}</h1>
                </div>
                {application?.status && (
                  <div className={styles.jobdetailbuttons}>
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
                  </div>
                )}
              </div>

              <br></br>
              <div className={styles.jobcardheader}>
                <div>
                  <img
                    className={styles.cardImg}
                    src={imageCollection[randomIntFromInterval(0, 5)]}
                  />
                </div>
                <div className={styles.deadline}>
                  <div style={{ fontSize: "16px" }}>
                    <b>Deadline</b>
                  </div>
                  <div>
                    <time
                      className={`${styles.dateAsCalendar} ${styles.positionPixels}`}
                    >
                      <span className={styles.weekday}>
                        {dayNames[new Date(post.deadline).getDay()]}
                      </span>
                      <span className={styles.day}>
                        {new Date(post.deadline).getDate()}
                      </span>
                      <span className={styles.month}>
                        {monthNames[new Date(post.deadline).getMonth()]}
                      </span>
                      <span className={styles.year}>
                        {new Date(post.deadline).getFullYear()}
                      </span>
                    </time>
                  </div>
                </div>
              </div>
              <div className={styles.jobtitle}>
                <h1 className={styles.jth}>{post.domain}</h1>
                <div>
                  <span className={styles.icon} onClick={handleBookmark}>
                    {bookmark ? <Bookmark /> : <BookmarkBorder />}
                  </span>
                </div>
              </div>

              <div className={styles.jobdetailbuttons}>
                {post.tags?.map((tag) => (
                  <button
                    className={`${styles.searchbuttons} ${styles.detailbutton}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <br></br>
              <div className={styles.description}>Description</div>
              <p className={styles.paragraph}>{post.desc}</p>
              <br></br>
              <div className={styles.description}>Qualified Experience</div>
              <p className={styles.paragraph}>{post.exp}</p>
              <div className={styles.description}>Skills Required</div>
              <p className={styles.paragraph}>
                {post &&
                  post.skills &&
                  post.skills?.map((skill) => {
                    return skill.skill + ", ";
                  })}
              </p>
              <br></br>
              {applied ? (
                <>
                  <br></br>
                  <br></br>
                  <a
                    href={
                      resume
                        ? `https://drive.google.com/uc?id=${resume.key}`
                        : ""
                    }
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <input
                      type="submit"
                      value={"View your resume"}
                      style={{ cursor: "pointer" }}
                      className="btn btn-primary btn-block mt-4"
                    />
                  </a>
                </>
              ) : (
                <>
                  <div className={styles.resumed}>Upload Your resume </div>
                  <FileUpload path={path} />
                </>
              )}

              <br></br>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default JobApplication;
