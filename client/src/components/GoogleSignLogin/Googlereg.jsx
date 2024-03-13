import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import jwt_decode from "jwt-decode";

import React, { useContext } from "react";
import { Context } from "../../context/Context";
import { LoginStart, LoginSuccess, LoginFailure } from "../../context/Actions";

import { Url, User } from "../../enums";

import "./Googlereg.css";

import { SERVER_URL } from "../../config";

const Google = (props) => {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallbackResponse = async (response) => {
      var userObject;
      if (props.types === User.RECRUITER) {
        userObject = jwt_decode(response.credential);

        try {
          const type = User.RECRUITER;
          const email = userObject.email;
          const name = userObject.name;

          await axios.post(`${SERVER_URL}/auth/register`, {
            email,
            type,
            name,
          });

          navigate(Url.LOGIN, { replace: true });
        } catch (err) {
          console.log(err);
        }
      } else if (props.types === User.SEARCHER) {
        userObject = jwt_decode(response.credential);

        try {
          const type = User.SEARCHER;
          const email = userObject.email;
          const name = userObject.name;

          await axios.post(`${SERVER_URL}/auth/register`, {
            email,
            type,
            name,
          });

          navigate(Url.LOGIN, { replace: true });
        } catch (err) {
          console.log(err);
        }
      } else {
        dispatch(LoginStart());
        userObject = jwt_decode(response.credential);
        try {
          const email = userObject.email;
          const res = await axios.post(`${SERVER_URL}/auth/login`, {
            email,
          });
          // console.log(res.data);
          dispatch(
            LoginSuccess({
              ...res.data,
              type: res.data.type,
              authToken: res.data.token,
            })
          );

          navigate(Url.LOGIN, { replace: true });
        } catch (err) {
          dispatch(LoginFailure());
          console.log(err);
        }
      }
      //   // console.log(response.credential);
      //   dispatch(LoginStart());
      //   var userObject = jwt_decode(response.credential);
      //   console.log(userObject);

      // try {
      //   const res = await axios.post(
      //     `${SERVER_URL}/auth/register`,
      //     userObject
      //   );
      //   // console.log(res.data);
      //   dispatch(
      //     LoginSuccess({ ...res.data, authToken: res.headers.authorization })
      //   );
      //   navigate("/", { replace: true });
      // } catch (err) {
      //   dispatch(LoginFailure());
      //   console.log(err);
      // }
    };

    /* global google */
    if (google.accounts) {
      google.accounts.id.initialize({
        client_id:
          "280321535880-p9lv8i0ko92m0iiq1tmhcenn6i11o54k.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        scope: "profile email",
        width: 365,
        height: 200,
        longtitle: true,
        theme: "dark",
      });
    }
  }, [dispatch, navigate]);
  return <div id="signInDiv">Sign up</div>;
};

export default Google;
