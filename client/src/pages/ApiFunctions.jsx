import { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";
import { SERVER_URL } from "../config";
import axios from "axios";

const fetchCards = async (authToken) => {
  try {
    const res = await axios.get(`${SERVER_URL}/post/jobFeed/jobFeed`, {
      headers: { Authorization: authToken },
    });
    console.log(res);

    return res;
  } catch (err) {}
};

const fetchAppliedCards = async (authToken) => {
  try {
    const res = await axios.get(`${SERVER_URL}/application/`, {
      headers: { Authorization: authToken },
    });
    console.log(res);
    return res;
  } catch (err) {}
};

export { fetchCards, fetchAppliedCards };
