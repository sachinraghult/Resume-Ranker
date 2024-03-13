import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import { LoginStart, LoginSuccess, LoginFailure } from "../../context/Actions";
import Google from "../../components/GoogleSignLogin/Googlereg";
import styles from "./Login.module.css";

import { Url } from "../../enums";

import { SERVER_URL } from "../../config";

const Login = () => {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(LoginStart());
    setError(false);

    try {
      const res = await axios.post(`${SERVER_URL}/auth/login`, {
        email,
        password,
      });

      dispatch(
        LoginSuccess({
          ...res.data,
          type: res.data.type,
          authToken: res.data.token,
        })
      );
      navigate(Url.JOB_FEED, { replace: true });
    } catch (err) {
      dispatch(LoginFailure());
      setError(true);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginLeft}>
        <h3 className={styles.loginLogo}>Job Finder</h3>
        <span className={styles.loginDesc}>Enter your details...</span>
      </div>
      <div className={styles.loginRight}>
        <form className={styles.loginBox} onSubmit={handleSubmit}>
          <div className={styles.formtop}>
            <h2>Login</h2>
          </div>
          {/* <button className="googleButton">
            <img
              width="25px"
              alt="Google sign-in"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
            Login with Google
          </button> */}
          <Google />
          <div className={styles.orContainer}>
            <div className={styles.line}>
              <span>
                ---------------------- or Login with Email
                ----------------------
              </span>
            </div>
          </div>

          <input
            type="email"
            placeholder="Email"
            className={styles.loginInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.loginInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <span className={styles.Forgot}>
            <u>Forgot Password ?</u>
          </span> */}
          {error && (
            <span className={styles.loginError}>Invalid Credentials</span>
          )}
          <button
            data-testid="handleSubmit"
            className={styles.loginButton}
            type="submit"
          >
            Login
          </button>
          <span className={styles.caa}>
            Not Registered? <Link to={Url.SELECTION}>Create an Account</Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
