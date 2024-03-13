import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import Google from "../../components/GoogleSignLogin/Googlereg.jsx";

import styles from "./Register.module.css";

import { Url } from "../../enums";

import { SERVER_URL } from "../../config";

// All comments are correct don't chnage
const Register = () => {
  const { state } = useLocation();

  var type;
  if (state) {
    type = state.type;
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setPwdError(false);

    // console.log(password);
    // console.log(email);
    //quite important dont touch
    try {
      const res = await axios.post(`${SERVER_URL}/auth/register`, {
        name,
        type,
        email,
        password,
      });
      res.data && window.location.replace(Url.LOGIN);
    } catch (err) {
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
        <form className={styles.RegisterBox} onSubmit={handleSubmit}>
          <div className={styles.formtop}>
            <h2>Create Account</h2>
          </div>
          {/* <button className="googleButton" >
            <img
              width="25px"
              alt="Google sign-in"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
            Sign up with Google
          </button> */}
          <Google types={type} />
          <div className={styles.orContainer}>
            <div className={styles.line}>
              <span>
                ---------------------- or Sign up with Email
                ----------------------
              </span>
            </div>
          </div>
          <label>
            Name
            <input
              type="text"
              placeholder="Name"
              className={styles.loginInput}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              placeholder="Email"
              className={styles.loginInput}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </label>
          <label>
            Password
            <input
              placeholder="Password"
              type="password"
              className={styles.loginInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {pwdError && <div className="">Password error</div>}
          {error && (
            <span className={styles.registerError}>Email already exists</span>
          )}
          <button className={styles.loginButton} type="submit">
            Sign up
          </button>
          <span>
            Already have an account? <Link to={Url.LOGIN}>Log in</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
