import React from "react";
import { Layout, Createdcards } from "../../components";
import styles from "./JobCreated.module.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";

import { SERVER_URL } from "../../config";

function JobCreated() {
  const { authToken } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [set, setSet] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      const res = await axios.get(`${SERVER_URL}/post/myJobs/myJobs`, {
        headers: { Authorization: authToken },
      });
      if (res) {
        setPosts(res.data.posts);
        setCount(res.data.count);
      }
      setSet(true);
    };
    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.jobCreatedContainer}>
      <Layout />
      <div
        style={{
          marginLeft: "50px",
          marginTop: "50px",
        }}
      >
        <h1 style={{ marginLeft: "150px" }}>Your Jobs</h1>
        <div className={styles.searchedjobs}>
          {set && posts.length > 0 ? (
            <>
              {count !== posts.length ? (
                <div
                  style={{
                    marginTop: "25px",
                    backgroundColor: "#d5d6c9",
                    padding: "20px",
                  }}
                >
                  <h5>Active Job Posts</h5>
                  <div className={styles.jobcards}>
                    {posts?.map(
                      (post) =>
                        new Date(post.deadline) >= new Date() && (
                          <Createdcards post={post} />
                        )
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}

              {set && count > 0 && (
                <div
                  style={{
                    marginTop: "40px",
                    backgroundColor: "#9fa09c",
                    padding: "20px",
                  }}
                >
                  <h5>Inactive Job posts</h5>
                  <div className={styles.jobcards}>
                    {posts?.map(
                      (post) =>
                        new Date(post.deadline) < new Date() && (
                          <Createdcards post={post} />
                        )
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <h5>You haven't created any job posts yet</h5>
          )}
        </div>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default JobCreated;
