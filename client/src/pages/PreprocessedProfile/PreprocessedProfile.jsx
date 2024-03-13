import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import { Layout } from "../../components";
import styles from "./PreprocessedProfile.module.css";

import { SERVER_URL } from "../../config";

export default function PreprocessedProfile() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const { authToken } = useContext(Context);
  const [preprocessed, setPreprocessed] = useState();
  const [isPreprocessedSet, setIsPreprocessedSet] = useState();
  const [applicant, setApplicant] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    const fetchPreprocessed = async () => {
      try {
        const res = await axios.get(
          `${SERVER_URL}/application/preprocess/` + path,
          {
            headers: { Authorization: authToken },
          }
        );
        console.log(res.data);
        setPreprocessed(res.data.preprocessing_data);
        setIsPreprocessedSet(true);
        setStatus(res.data.status);
      } catch (err) {}
    };
    const fetchUser = async () => {
      try {
        const resUser = await axios.get(
          `${SERVER_URL}/application/user/` + path,
          {
            headers: { Authorization: authToken },
          }
        );
        console.log(resUser.data);
        setApplicant(resUser.data);
      } catch (err) {}
    };

    fetchPreprocessed();
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateApplicationStatus = async (status) => {
    try {
      const res = axios.put(
        `${SERVER_URL}/application/status/` + path,
        {
          status: status,
        },
        {
          headers: { Authorization: authToken },
        }
      );
      if (res) setStatus(status);
    } catch (err) {}
  };

  return (
    <div className={styles["preprocessContainer"]}>
      <Layout />
      {applicant && isPreprocessedSet && (
        <div>
          <div className={styles["main"]}>
            <h1>Preprocessed Profile</h1>

            <div>
              <div className={styles["card"]}>
                <div className={styles["card-body"]}>
                  <table className={styles["preprocessedTable"]}>
                    <tbody>
                      <tr>
                        {preprocessed ? (
                          <>
                            <td className={styles["abcd"]}>
                              <b>Applicant Name</b>
                            </td>
                            <td className={styles["abcd"]}>:</td>
                            <td>{applicant.name}</td>
                          </>
                        ) : (
                          <td className={styles["abcd"]}>
                            <b style={{ fontSize: "20px" }}>{applicant.name}</b>
                            <br></br>
                            <small>(no preprocessed data)</small>
                          </td>
                        )}

                        <td
                          rowspan="3"
                          style={{ marginLef: "200px" }}
                          className={styles["abcd"]}
                        >
                          <div>
                            <div>
                              <img
                                src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                                className={styles["ruserShowImg"]}
                                height={"150"}
                                width={"200"}
                              />
                            </div>
                            <div style={{ display: "flex", marginTop: "10px" }}>
                              {status === "In Review" ? (
                                <>
                                  <div>
                                    <button
                                      className={styles["viewButton1"]}
                                      onClick={() =>
                                        updateApplicationStatus("Accepted")
                                      }
                                    >
                                      Accept
                                    </button>
                                  </div>
                                  <div>
                                    <button
                                      className={styles["viewButton2"]}
                                      onClick={() =>
                                        updateApplicationStatus("Rejected")
                                      }
                                    >
                                      Reject
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <div>
                                  <button
                                    className={styles["viewButton3"]}
                                    style={{
                                      color:
                                        status === "Accepted" ? "green" : "",
                                      border:
                                        status === "Accepted"
                                          ? "1px dotted green"
                                          : "",
                                    }}
                                  >
                                    {status === "Accepted"
                                      ? "Accepted"
                                      : "Rejected"}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                      {applicant.isSearcher && (
                        <tr>
                          <td className={styles["abcd"]}>
                            <b>Applicant Email</b>
                          </td>
                          <td className={styles["abcd"]}>:</td>
                          <td>{applicant.email}</td>
                        </tr>
                      )}
                      {preprocessed !== "" ? (
                        <>
                          <tr>
                            <td className={styles["abcd"]}>
                              <b>Scores</b>
                            </td>
                            <td className={styles["abcd"]}>:</td>
                            <td>
                              <div>
                                <b>
                                  Overall &nbsp;
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </b>{" "}
                                :{" "}
                                {preprocessed
                                  ? preprocessed.preprocessing_data.scores[0].toFixed(
                                      2
                                    )
                                  : null}
                              </div>
                              <div>
                                <b>
                                  Skills
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </b>{" "}
                                :{" "}
                                {preprocessed
                                  ? preprocessed.preprocessing_data.scores[1].toFixed(
                                      2
                                    )
                                  : null}
                              </div>
                              <div>
                                <b>
                                  Experience &nbsp;
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </b>
                                :{" "}
                                {preprocessed
                                  ? preprocessed.preprocessing_data.scores[2].toFixed(
                                      2
                                    )
                                  : null}
                              </div>
                              <div>
                                <b>Organisation &nbsp;</b> :{" "}
                                {preprocessed
                                  ? preprocessed.preprocessing_data.scores[3].toFixed(
                                      2
                                    )
                                  : null}
                              </div>
                              <div>
                                <b>
                                  Job Switch &nbsp;
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </b>{" "}
                                :{" "}
                                {preprocessed
                                  ? preprocessed.preprocessing_data.scores[4].toFixed(
                                      2
                                    )
                                  : null}
                              </div>
                              <div>
                                <b>
                                  Keyword &nbsp;
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </b>{" "}
                                :{" "}
                                {preprocessed
                                  ? preprocessed.preprocessing_data.scores[5].toFixed(
                                      2
                                    )
                                  : null}
                              </div>
                              <div>
                                <b>
                                  Instituition &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                                </b>{" "}
                                :{" "}
                                {preprocessed
                                  ? preprocessed.preprocessing_data.scores[6].toFixed(
                                      2
                                    )
                                  : null}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className={styles["abcd"]}>
                              <b>College Names</b>
                            </td>
                            <td className={styles["abcd"]}>:</td>
                            <td>
                              {preprocessed.preprocessing_data.college_name &&
                                preprocessed.preprocessing_data.college_name?.map(
                                  (college) => {
                                    {
                                      return <div>{college},</div>;
                                    }
                                  }
                                )}
                            </td>
                          </tr>
                          <tr>
                            <td className={styles["abcd"]}>
                              <b>Company Names</b>
                            </td>
                            <td className={styles["abcd"]}>:</td>
                            <td>
                              {" "}
                              {preprocessed.preprocessing_data.company_names &&
                                preprocessed.preprocessing_data.company_names?.map(
                                  (company) => {
                                    {
                                      return <div>{company},</div>;
                                    }
                                  }
                                )}
                            </td>
                          </tr>
                          {/* {preprocessed.preprocessing_data.experience && (
                            <tr>
                              <td className={styles["abcd"]}>
                                <b>Experience</b>
                              </td>
                              <td className={styles["abcd"]}>:</td>
                              <td>
                                {" "}
                                {preprocessed.preprocessing_data.experience &&
                                  preprocessed.preprocessing_data.experience?.map(
                                    (exp) => {
                                      {
                                        return <div>{exp},</div>;
                                      }
                                    }
                                  )}
                              </td>
                            </tr>
                          )} */}
                          <tr>
                            <td className={styles["abcd"]}>
                              <b>Skills</b>
                            </td>
                            <td className={styles["abcd"]}>:</td>
                            <td>
                              <div className={styles["xyz"]}>
                                {preprocessed.preprocessing_data.skills &&
                                  preprocessed.preprocessing_data.skills?.map(
                                    (skill) => {
                                      {
                                        return <div>{skill},</div>;
                                      }
                                    }
                                  )}
                              </div>
                            </td>
                          </tr>
                        </>
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* <div>
                <img
                  src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                  className={styles["ruserShowImg"]}
                  height={"200"}
                  width={"200"}
                />
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
