import React from "react";
import JobCards from "../../components/JobCards/JobCards";
import { Layout } from "../../components";
import styles from "./JobFeed.module.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import LoadingScreen from "react-loading-screen";
import spinner from "../../components/LoadingScreen/load.gif";

import { SERVER_URL } from "../../config";
import { fetchCards } from "../ApiFunctions";

function JobFeed() {
  const { authToken } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetchCards(authToken);
      setPosts(res.data);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    setTimeout(() => {
      setIsLoading(false);
  },3000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingScreen
        loading={true}
        bgColor = "#f1f1f1"
        logoSrc={spinner}
        />
      ) : (
        <>
          <Layout />
          <div style={{ marginLeft: "50px", marginTop: "50px" }}>
            <h1 style={{ marginLeft: "150px" }}>Job Feed</h1>
            <div className={styles.searchedjobs}>
              <div className={styles.jobcards}>
                {posts.length ? (
                  posts?.map((post) => <JobCards post={post} />)
                ) : (
                  <div>
                    <h5>No new job posts yet</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default JobFeed;
