import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { Layout } from "../../components";
import FeatureCards from "../../components/LandingDashboard/FeatureCards/FeatureCards";
import RecentTable from "../../components/LandingDashboard/RecentTable/RecentTable";
import BarGraph1 from "../../components/LandingDashboard/BarGraph1/BarGraph1";
import BarGraph2 from "../../components/LandingDashboard/BarGraph2/BarGraph2";
import PieChart from "../../components/LandingDashboard/PieChart/PieChart";

import AsyncSelect from "react-select/async";

import { Context } from "../../context/Context";
import styles from "./RecruiterDashboard.module.css";

import { SERVER_URL } from "../../config";

const RecruiterDashboard = () => {
  const { authToken } = useContext(Context);
  const [bargraph1, setBargraph1] = useState([]);
  const [bargraph2, setBargraph2] = useState([]);
  const [strVal, setStrVal] = useState();
  const [selectedOptions, setSelectedOptions] = useState();
  const [skillApplicant, setSkillApplicant] = useState(0);
  const [piechart, setPiechart] = useState([]);
  const [isBargraphSet, SetIsBargraphSet] = useState(false);

  var strval = "";
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      minHeight: 50,
      width: 700,
    }),
  };

  const fetchSearchPie = async (e) => {
    let options = [];

    try {
      const searchBox = await axios.post(
        `${SERVER_URL}/application/searchbox`,
        { search: e, type: "Skills" },
        {
          headers: { authorization: authToken },
        }
      );

      console.log(searchBox.data);

      searchBox.data?.map((search) =>
        options.push({
          value: search,
          label: (
            <div
              onClick={() => {
                console.log("first " + search);
                var strval = search;
                console.log(strval);
                fetchPieChartSelected(strval);
              }}
            >
              {search}
            </div>
          ),
        })
      );

      return options;
    } catch (err) {
      return [];
    }
  };

  const fetchPieChartSelected = async (str) => {
    try {
      console.log("see " + str);
      const scores = await axios.post(
        `${SERVER_URL}/landingDashboard/piechart/piechart`,
        { skill: str },
        {
          headers: { authorization: authToken },
        }
      );
      console.log(scores.data);
      setSkillApplicant(scores.data.length);

      let count = [0, 0, 0, 0, 0];
      scores.data?.map((score) => {
        if (score >= 0 && score <= 0.25) count[0]++;
        else if (score > 0.25 && score <= 0.5) count[1]++;
        else if (score > 0.5 && score <= 0.7) count[2]++;
        else if (score > 0.7 && score <= 0.9) count[3]++;
        else if (score > 0.9 && score <= 1.0) count[4]++;
      });
      setPiechart(count);
    } catch (err) {
      return [];
    }
  };

  useEffect(() => {
    const fetchBargraph1 = async () => {
      const res = await axios.get(
        `${SERVER_URL}/landingDashboard/bargraph/bargraph`,
        {
          headers: { Authorization: authToken },
        }
      );
      setBargraph1(res.data);
    };

    const fetchBargraph2 = async () => {
      const res = await axios.get(
        `${SERVER_URL}/landingDashboard/highest/lowest`,
        {
          headers: { Authorization: authToken },
        }
      );
      setBargraph2(res.data);
      SetIsBargraphSet(true);
    };

    fetchBargraph1();
    fetchBargraph2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelect(data) {
    setSelectedOptions(data);
  }

  return (
    <div className={styles["dashboard"]}>
      <Layout />
      <FeatureCards />
      {bargraph1.length > 0 && bargraph2.length > 0 ? (
        <div className={styles["disp"]}>
          <BarGraph2 posts={bargraph2} />
          <BarGraph1 posts={bargraph1} />
        </div>
      ) : (
        isBargraphSet && (
          <h4 style={{ marginLeft: "200px", marginTop: "50px" }}>
            No Statistical Data! Create a new post to find something interesting
            : )
          </h4>
        )
      )}

      <div className={styles["pieContainer"]}>
        <div>
          <h5>
            Score Distribution of Applicants for a particular Skills Selected
          </h5>
          <div className={styles["reactSelect"]}>
            <h6>Search for Skills</h6>
            <AsyncSelect
              loadOptions={(e) => fetchSearchPie(e)}
              value={selectedOptions}
              onChange={handleSelect}
              placeholder="Search here..."
              styles={customStyles}
            />
          </div>
          <div className={styles["featured"]}>
            <div className={styles["featuredItem"]}>
              <span className={styles["featuredTitle"]}>
                No.of Applicants received slected skill
              </span>
              <div className={styles["featuredMoneyContainer"]}>
                <span className={styles["featuredMoney"]}>
                  {skillApplicant}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["subPieContainer"]}>
          <PieChart score={piechart} />
        </div>
      </div>
      <div className={styles["recentContainer"]}>
        <RecentTable />
      </div>
    </div>
  );
};
export default RecruiterDashboard;
