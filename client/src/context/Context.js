import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import Reducer from "./Reducer";
import React from "react";

import { Url } from "../enums";

import { SERVER_URL } from "../config";

const INIT_STATE = {
  authToken: JSON.parse(localStorage.getItem("authorization")) || null,
  user: null,
  type: null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INIT_STATE);

const ContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(Reducer, INIT_STATE);

  useEffect(() => {
    //don't change this
    const newState = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/user`, {
          headers: { Authorization: state.authToken },
        });
        console.log(res);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            ...res.data,
            type: res.data.type,
            authToken: state.authToken,
          },
        });
      } catch (err) {
        dispatch({ type: "LOGOUT" });
        window.location.pathname !== Url.LOGIN &&
          window.location.assign(Url.LOGIN);
      }
    };

    if (state.authToken) newState();
  }, []);

  useEffect(() => {
    if (state.authToken)
      localStorage.setItem("authorization", JSON.stringify(state.authToken));
    else {
      localStorage.setItem("authorization", null);
    }
  }, [state.authToken]);

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
