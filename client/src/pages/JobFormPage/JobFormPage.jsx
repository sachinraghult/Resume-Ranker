import React from "react";
import Layout from "../../components/Layout/Layout";
import JobForm from "../../components/JobForm/JobForm";
import "./JobFormPage.css";

function JobFormPage() {
  return (
    <div className="jobFormPageContainer">
      <Layout />
      <div className="formPageContainer">
        <div className="formContainer">
          <JobForm />
        </div>
      </div>
    </div>
  );
}

export default JobFormPage;
