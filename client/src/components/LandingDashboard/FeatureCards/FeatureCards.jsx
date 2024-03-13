import "./FeatureCards.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../../context/Context";

import { SERVER_URL } from "../../../config";

export default function FeatureCards() {
  const { authToken } = useContext(Context);
  const [postnum, setPostnum] = useState();
  const [resumenum, setResumenum] = useState();
  const [avg, setAvg] = useState();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/landingDashboard/cards`, {
          headers: { Authorization: authToken },
        });
        setPostnum(res.data.postnum);
        setResumenum(res.data.resumenum);
        setAvg(res.data.avg);
      } catch (err) {}
    };

    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Applications received </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{resumenum}</span>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Active Job Posts</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{postnum}</span>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Resumes received</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{resumenum} 📈</span>
          <span className="featuredMoneyRate">
            {/* +2.4 <ArrowUpward className="featuredIcon" /> */}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem" style={{ marginRight: "4%" }}>
        <span className="featuredTitle">Average Resumes</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{avg} 🗓️</span>
          <span className="featuredMoneyRate">
            {/* +2.4 <span style={{ fontSize: "20px" }}>📈</span> */}
          </span>
        </div>
        <span className="featuredSub">For a year</span>
      </div>
    </div>
  );
}
