import React from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { Layout } from "../../components";
import Profiles from "../../components/Profile/Profile";
import "./Profile.css";

function Profile() {
  const { type } = useContext(Context);

  return (
    <div
      className="profileContainer"
      style={{
        backgroundColor: type === "RECRUITER" ? "#c3c4ba" : "",
      }}
    >
      <Layout />
      <Profiles />
    </div>
  );
}

export default Profile;
