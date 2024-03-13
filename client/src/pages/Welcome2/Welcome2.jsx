import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Welcome2.module.css";
import { User, Url } from "../../enums";

const Welcome2 = () => {
  const navigate = useNavigate();

  const handleSearcher = () => {
    navigate(Url.REGISTER, { state: { type: User.SEARCHER } });
  };

  const handleRecruiter = () => {
    navigate(Url.REGISTER, { state: { type: User.RECRUITER } });
  };

  return (
    <Fragment>
      <div className={styles.loginWrapper}>
        <div className={styles.loginLeft}>
          <h3 className={styles.loginLogo}>Job Finder</h3>
          <span className={styles.loginDesc}>Enter your details...</span>
        </div>
        <div className={styles.welcomeRight}>
          <button
            data-testid="handleSearcher"
            onClick={handleSearcher}
            style={{ backgroundColor: "#4B5D67" }}
          >
            Searcher
          </button>
          <button data-testid="handleRecruiter" onClick={handleRecruiter}>
            Recruiter
          </button>
        </div>
      </div>
      {/* { user.value === 'Register' && } */}
      {/* { user.value === 'Login' && <Login/>} */}
    </Fragment>
  );
};

export default Welcome2;
