import React from "react";
import JobCards from "../../components/JobCards/JobCards";
import { Layout } from "../../components";
import styles from "./Bookmark.module.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";

import { SERVER_URL } from "../../config";

function Bookmark() {
  const { authToken } = useContext(Context);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/post/bookmark`, {
          headers: { Authorization: authToken },
        });
        setPosts(res.data);
      } catch (err) {}
    };
    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Layout />
      <div style={{ marginLeft: "50px", marginTop: "50px" }}>
        <h3 style={{ marginLeft: "160px", marginBottom: "20px" }}>
          My Bookmarks
        </h3>
        <div className={styles.searchedjobs}>
          <div className={styles.jobcards}>
            {posts.length ? (
              posts?.map((post) => <JobCards post={post} />)
            ) : (
              <h5>You haven't bookmarked any</h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookmark;
