import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { Layout, Appliedcards } from "../../components";
import styles from "./JobsApplied.module.css";
import { fetchAppliedCards } from "../ApiFunctions";
import { SERVER_URL } from "../../config";

function JobCreated() {
  const { authToken } = useContext(Context);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetchAppliedCards(authToken);
      res ? setJobs(res.data) : setJobs(null);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Layout />
      <div style={{ marginLeft: "50px" }}>
        <h3
          style={{
            marginLeft: "200px",
            marginBottom: "25px",
            marginTop: "50px",
          }}
        >
          My Applications
        </h3>
        <div className={styles.searchedjobs}>
          <div className={styles.jobcards}>
            {jobs?.length ? (
              jobs?.map((job) => <Appliedcards job={job} />)
            ) : (
              <h5 style={{ marginLeft: "200px" }}>
                You haven't applied for any jobs yet
              </h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCreated;
