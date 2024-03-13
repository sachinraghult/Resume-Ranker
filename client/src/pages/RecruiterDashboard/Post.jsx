import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../components";
import styles from "./Post.module.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MainGraph from "../../components/Dashboard/chart/MainGraph/MainGraph";
import Barchart from "../../components/Dashboard/chart/BarChart/Barchart";
import PostInfo from "../../components/Dashboard/postInfo/PostInfo";
import AsyncSelect from "react-select/async";
import { Context } from "../../context/Context";
import { SERVER_URL } from "../../config";
import { useState, useEffect, useContext } from "react";
import LineChart from "../../components/Dashboard/chart/FunctionalLineChart/LineChart";
import ApplicantTable from "../../components/Dashboard/ApplicantTable/ApplicantTable";

const Post = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { authToken } = useContext(Context);
  const [maingraph, setMaingraph] = useState([]);
  const [linegraph, setLinegraph] = useState([]);
  const [barChart, setBarChart] = useState([]);
  const [postInfo, setPostInfo] = useState([]);
  const [strVal, setStrVal] = useState();

  var strval = "";
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      minHeight: 50,
      width: 700,
    }),
  };

  useEffect(() => {
    const fetchMaingraph = async () => {
      const res = await axios.get(
        `${SERVER_URL}/jobSpecificDashboard/Maingraph/Maingraph/` + path,
        {
          headers: { Authorization: authToken },
        }
      );
      console.log(res.data);
      setMaingraph(res.data);
    };

    fetchMaingraph();
    const fetchBarChart = async () => {
      const res = await axios.get(
        `${SERVER_URL}/jobSpecificDashboard/barchart/barchart/` + path,
        {
          headers: { Authorization: authToken },
        }
      );
      console.log(res.data);
      // setBarChart(res.data);
      setBarChart(res.data);
    };

    fetchBarChart();

    const fetchLinegraph = async () => {
      const res = await axios.get(
        `${SERVER_URL}/jobSpecificDashboard/linegraph/linegraph/` + path,
        {
          headers: { Authorization: authToken },
        }
      );
      console.log(res.data);
      setLinegraph(res.data);
    };

    fetchLinegraph();

    const fetchPostInfo = async () => {
      const res = await axios.get(
        `${SERVER_URL}/jobSpecificDashboard/info/info/` + path,
        {
          headers: { Authorization: authToken },
        }
      );
      console.log(res.data);
      setPostInfo(res.data);
    };

    fetchPostInfo();
  }, []);
  return (
    <div className={styles["post"]} style={{ backgroundColor: "#c3c4ba" }}>
      <Layout />
      <div className={styles["subContainer"]}>
        <div className={styles["titleContainer"]}>
          <h3 className={styles["title"]}>Job Specific Dashboard</h3>
          <div className="productTitleContainer">
            <Link to={`/applyrecruiter/${postInfo?.id}`}>
              <button className={styles["productAddButton"]}>
                Bulk Resume Upload
              </button>
            </Link>
          </div>
        </div>

        <div className={styles["row1"]}>
          <PostInfo info={postInfo} />
        </div>
        <div className={styles["row2"]}>
          <LineChart posts={linegraph} />
        </div>
        <div className={styles["row3"]}>
          <MainGraph scores={maingraph} />
          <Barchart info={barChart} />
        </div>
        <div className={styles["row4"]}>
          <ApplicantTable />
        </div>
      </div>
    </div>
  );
};

export default Post;
