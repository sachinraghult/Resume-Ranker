import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import styles from "./Layout.module.css";
import { Link } from "react-router-dom";

import { User, Url } from "../../enums";

function Layout() {
  const [sidebar, setSidebar] = useState(false);
  const [profile, setProfile] = useState(true);
  const { user, type, dispatch } = useContext(Context);
  const p = user ? user.profile.name : "user";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.pathname !== Url.LOGIN && window.location.assign(Url.LOGIN);
  };

  return (
    <div>
      <div className={styles["skin-blue-black"]}>
        <div className={styles["wrapper"]}>
          <header className={`${styles["main-header"]} ${styles["col-lg-12"]}`}>
            <span
              className={
                sidebar
                  ? styles["logo-mid"]
                  : `${styles["logo-mid"]} ${styles["first"]} ${styles["border"]}`
              }
              style={{ paddingLeft: "2px", backgroundColor: "white" }}
            >
              {sidebar && (
                <img
                  src={"/logo4.jpeg"}
                  style={{ backgroundColor: "white" }}
                  alt="layout-back"
                />
              )}
            </span>
            <div
              className="fa fa-bars"
              id={styles["menu_bar"]}
              onClick={() => setSidebar(!sidebar)}
            ></div>

            <div
              className={styles["user-profile"]}
              onClick={() => setProfile(!profile)}
            >
              <span>{p}</span>
              <div
                className={`${styles["mini-user"]} ${"fa fa-user-circle"}`}
              ></div>
            </div>
          </header>
          <div
            className={
              sidebar
                ? styles["leftMenu"]
                : `${styles["leftMenu"]} ${styles["openMenu"]}`
            }
          >
            <ul className={styles["leftMenuList"]}>
              {/* 







              SEARCHER SIDEBAR LAYOUT
 */}

              {type === User.SEARCHER && (
                <Link to={Url.JOB_FEED}>
                  <li
                    className={`${styles["tooltip_nav"]} ${styles["point01"]}`}
                  >
                    <a href="/#">
                      <i
                        className="fa fa-home  fa-2x"
                        style={{ marginLeft: "12px", paddingTop: "12px" }}
                        aria-hidden="true"
                      ></i>
                      <span>Home</span>
                      <p className={!sidebar ? styles["hide"] : ""}>Home</p>
                    </a>
                  </li>
                </Link>
              )}

              {type === User.SEARCHER && (
                <Link to={Url.MY_APPLICATIONS}>
                  <li
                    className={`${styles["tooltip_nav"]} ${styles["point03"]}`}
                  >
                    <a href="/#">
                      <i
                        className="fa fa-tasks  fa-2x"
                        style={{ marginLeft: "12px", paddingTop: "12px" }}
                        aria-hidden="true"
                      ></i>
                      <span>Applications</span>
                      <p className={!sidebar ? styles["hide"] : ""}>
                        Applications
                      </p>
                    </a>
                  </li>
                </Link>
              )}

              {type === User.SEARCHER && (
                <Link to={Url.JOB_FEED}>
                  <li
                    className={`${styles["tooltip_nav"]} ${styles["point02"]}`}
                  >
                    <a href="/#">
                      <i
                        className="fa fa-briefcase  fa-2x"
                        style={{ marginLeft: "12px", paddingTop: "12px" }}
                        aria-hidden="true"
                      ></i>
                      <span>Job Feed</span>
                      <p className={!sidebar ? styles["hide"] : ""}>Job Feed</p>
                    </a>
                  </li>
                </Link>
              )}

              {type === User.SEARCHER && (
                <Link to={Url.MY_BOOKMARKS}>
                  <li
                    className={`${styles["tooltip_nav"]} ${styles["point04"]}`}
                  >
                    <a href="/#">
                      <i
                        className="fa fa-bookmark  fa-2x"
                        style={{ marginLeft: "12px", paddingTop: "12px" }}
                        aria-hidden="true"
                      ></i>
                      <span>&nbsp;Bookmarks</span>
                      <p className={!sidebar ? styles["hide"] : ""}>
                        Bookmarks
                      </p>
                    </a>
                  </li>
                </Link>
              )}

              {type === User.SEARCHER && (
                <Link to={Url.PROFILE}>
                  <li
                    className={`${styles["tooltip_nav"]} ${styles["point05"]}`}
                  >
                    <a href="/#">
                      <i
                        className="fa fa-user fa-2x"
                        style={{ marginLeft: "14px", paddingTop: "12px" }}
                        aria-hidden="true"
                      ></i>
                      <span>Profile</span>
                      <p className={!sidebar ? styles["hide"] : ""}>Profile</p>
                    </a>
                  </li>
                </Link>
              )}

              {/* 

              





              RECRUITER SIDEBAR LAYOUT
 */}

              {type === User.RECRUITER && (
                <Link to={Url.DASHBOARD}>
                  <li
                    className={`${styles["tooltip_nav"]} ${styles["point01"]}`}
                  >
                    <a href="/#">
                      <i
                        className="fa fa-home fa-2x"
                        style={{ marginLeft: "12px", paddingTop: "12px" }}
                        aria-hidden="true"
                      ></i>
                      <span>Home</span>
                      <p className={!sidebar ? styles["hide"] : ""}>Home</p>
                    </a>
                  </li>
                </Link>
              )}

              {type === User.RECRUITER && (
                <Link to={Url.CREATE_JOB_POST}>
                  <li
                    className={`${styles["tooltip_nav"]} ${styles["point02"]}`}
                  >
                    <a href="/#">
                      <i
                        className="fa fa-tasks fa-2x"
                        style={{ marginLeft: "12px", paddingTop: "12px" }}
                        aria-hidden="true"
                      ></i>
                      <span>Create job</span>
                      <p className={!sidebar ? styles["hide"] : ""}>
                        Create job
                      </p>
                    </a>
                  </li>
                </Link>
              )}

              {type === User.RECRUITER && (
                <Link to={Url.MY_JOBS}>
                  <li
                    className={`${styles["tooltip_nav"]} ${styles["point03"]}`}
                  >
                    <a href="/#">
                      <i
                        className="fa fa-briefcase fa-2x"
                        style={{ marginLeft: "12px", paddingTop: "12px" }}
                        aria-hidden="true"
                      ></i>
                      <span>Jobs Created</span>
                      <p className={!sidebar ? styles["hide"] : ""}>Created</p>
                    </a>
                  </li>
                </Link>
              )}

              {type === User.RECRUITER && (
                <Link to={Url.REPORT}>
                  <li
                    className={`${styles["tooltip_nav"]} ${styles["point04"]}`}
                  >
                    <a href="/#">
                      <i
                        className="fa fa-folder-open fa-2x"
                        style={{ marginLeft: "14px", paddingTop: "12px" }}
                        aria-hidden="true"
                      ></i>
                      <span>Report</span>
                      <p className={!sidebar ? styles["hide"] : ""}>Report</p>
                    </a>
                  </li>
                </Link>
              )}

              {type === User.RECRUITER && (
                <Link to={Url.PROFILE}>
                  <li
                    className={`${styles["tooltip_nav"]} ${styles["point05"]}`}
                  >
                    <a href="/#">
                      <i
                        className="fa fa-user fa-2x"
                        style={{ marginLeft: "14px", paddingTop: "12px" }}
                        aria-hidden="true"
                      ></i>
                      <span>Profile</span>
                      <p className={!sidebar ? styles["hide"] : ""}>Profile</p>
                    </a>
                  </li>
                </Link>
              )}

              {/* <li className={`${styles["tooltip_nav"]} ${styles["point05"]}`}>
                <a href="#">
                  <i
                    className="fa fa-dashboard"
                    style={{ marginLeft: "20px" }}
                    aria-hidden="true"
                  ></i>
                  <span>Dashboard</span>
                  <p className={!sidebar ? styles["hide"] : ""}>Dashboard</p>
                </a>
              </li>
              <li className={`${styles["tooltip_nav"]} ${styles["point06"]}`}>
                <a href="#">
                  <i
                    className="fa fa-dashboard"
                    style={{ marginLeft: "20px" }}
                    aria-hidden="true"
                  ></i>
                  <span>Dashboard</span>
                  <p className={!sidebar ? styles["hide"] : ""}>Dashboard</p>
                </a>
              </li>
              <li className={`${styles["tooltip_nav"]} ${styles["point07"]}`}>
                <a href="#">
                  <i
                    className="fa fa-dashboard"
                    style={{ marginLeft: "20px" }}
                    aria-hidden="true"
                  ></i>
                  <span>Dashboard</span>
                  <p className={!sidebar ? styles["hide"] : ""}>Dashboard</p>
                </a>
              </li> */}
            </ul>
          </div>

          <div
            className={
              sidebar
                ? styles["content-wrapper"]
                : `${styles["content-wrapper"]} ${styles["content-wrapper-mid"]}`
            }
          ></div>

          <div
            className={styles["profile-hover"]}
            style={{ display: profile ? "none" : "block" }}
          >
            <div
              className={`${
                styles["user-profile-icon"]
              } ${"fa fa-user-circle"}`}
            ></div>
            <div
              className={`${styles["user-profile"]} ${styles["our-profile"]}`}
            >
              <span>{p}</span>
              <h1 onClick={handleLogout}>LogOut</h1>
            </div>
          </div>

          <div className={styles["popup-overlay"]}></div>
          <div className={styles["popup-overlay-bell"]}></div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
