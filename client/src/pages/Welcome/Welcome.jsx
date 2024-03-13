import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import styles from "./Welcome.module.css";
import LoadingScreen from "react-loading-screen";
import spinner from "../../components/LoadingScreen/load.gif";

import { Url } from "../../enums";

const Welcome = () => {

  const navigate = useNavigate();

  const handleNewUser = () => {
    navigate(Url.SELECTION, { replace: true });
  };

  const handleOldUser = () => {
    navigate(Url.LOGIN, { replace: true });
  };

  const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        },3000);
    },[]);

  return (
    <Fragment>

      {isLoading?(
        <LoadingScreen
        loading={true}
        bgColor = "#f1f1f1"
        logoSrc={spinner}
        />
      ):(
        <div className={styles.loginWrapper}>
        <div className={styles.loginLeft}>
          <h3 className={styles.loginLogo}>Job Finder</h3>
          <span className={styles.loginDesc}>Enter your details...</span>
        </div>
        <div className={styles.welcomeRight}>
          <button
            data-testid="handleNewUser"
            onClick={handleNewUser}
            style={{ backgroundColor: "#4B5D67" }}
          >
            New User
          </button>
          <button data-testid="handleOldUser" onClick={handleOldUser}>
            Existing User
          </button>
        </div>
      </div>
      )}
      {/* { user.value === 'Register' && } */}
      {/* { user.value === 'Login' && <Login/>} */}
    </Fragment>
  );
};

export default Welcome;
