import { Layout } from "../../components";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FileUploadRecruiter } from "../../components";
import { useLocation } from "react-router-dom";
import { BookmarkBorder, Bookmark } from "@mui/icons-material";
import { Context } from "../../context/Context";
import styles from "./JobApplicationRecruiter.module.css";

import { SERVER_URL } from "../../config";

const JobApplicationRecruiter = () => {
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
  // const path = "62bfefb5621bb36610eb7de9";

  const { authToken } = useContext(Context);

  const [post, setPost] = useState();
  const [applied, setApplied] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/post/` + path, {
          headers: { Authorization: authToken },
        });
        setPost(res.data);
      } catch (err) {}
    };
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
          {post && (
            <div className={styles.jobcontainer}>
              <br></br>
              <h1>{post.title}</h1>
              <small>
                <i style={{ color: "grey" }}>
                  created on {formatDate(post.createdAt)}
                </i>
              </small>
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

              <div className={styles.description}>Qualified Experience</div>
              <p className={styles.paragraph}>{post.exp}</p>
              <div className={styles.description}>Keywords</div>
              <p className={styles.paragraph}>
                <div>
                  {post?.keywords.map((keyword) => {
                    return (
                      <div>
                        <i>{keyword.keyword}</i>
                      </div>
                    );
                  })}
                </div>
              </p>
              <div className={styles.description}>Skills Required</div>
              <p className={styles.paragraph}>
                <table className={styles.tableContainer}>
                  {post?.skills.map((skill) => {
                    return (
                      <tr>
                        <td>
                          <b>{skill.skill}</b>
                        </td>
                        <td>&nbsp;-&nbsp;</td>
                        <td>{skill.value}</td>
                      </tr>
                    );
                  })}
                </table>
              </p>
              <br></br>
              <div className={styles.description}>Number of Applications</div>
              <p className={styles.paragraph}>
                <i style={{ color: "grey" }}>
                  {post.applications.length} applications received till now
                </i>
              </p>
              <br></br>
              {applied ? (
                <>
                  <br></br>
                  <br></br>
                  <input
                    type="submit"
                    value={"View your resume"}
                    style={{ cursor: "pointer" }}
                    className="btn btn-primary btn-block mt-4"
                  />
                </>
              ) : (
                <>
                  <div className={styles.resumed}>Upload Bulk resume </div>
                  <FileUploadRecruiter path={path} />
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

export default JobApplicationRecruiter;
