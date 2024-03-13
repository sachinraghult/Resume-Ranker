import React, { Fragment, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Message from "./Message";
import Progress from "./Progress";

import { Context } from "../../context/Context";
import styles from "./FileUploadRecruiter.module.css";
import { Url } from "../../enums";

import { SERVER_URL } from "../../config";

const FileUpload = ({ path }) => {
  const { authToken } = useContext(Context);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("Choose File");
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [disable, setDisable] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const onVerify = async (e) => {
    console.log(captcha);
    setCaptcha(true);
    console.log(captcha);
  };
  const onchange = async (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);

    if (file) {
      const data = new FormData();
      const newfilename = Date.now() + file.name;
      data.append("name", newfilename);
      data.append("file", file);

      try {
        const resp = await axios.post(`${SERVER_URL}/utils/upload`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authToken,
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        });

        const bulkFileId = resp.data._id;

        await axios.post(
          `${SERVER_URL}/post/${path}/bulk`,
          { bulkFileId: bulkFileId },
          {
            headers: { Authorization: authToken },
          }
        );

        // Clear percentage
        setTimeout(() => setUploadPercentage(0), 10000);

        setMessage("Resumes uploaded successfully");
        setDisable(false);
        setCaptcha(false);
        // navigate(Url.MY_APPLICATIONS, { replace: true });
      } catch (err) {
        if (err) {
          setMessage("There was a problem with the server");
        } else {
          setMessage(err.response.data.msg);
        }
        setUploadPercentage(0);
      }
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            name="file"
            accept="application/zip,zip"
            className="custom-file-input"
            id="customFile"
            onChange={onchange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <ReCAPTCHA
          className={styles["recap"]}
          sitekey="6LemLBMhAAAAALFeKI1IwhQUANqVvDG9gGqoq5Fu"
          onChange={onVerify}
        />

        <input
          type="submit"
          value={
            disable
              ? "Please wait! Uploading your resumes..."
              : "Upload resumes as Zip file"
          }
          style={{ cursor: disable ? "wait" : "pointer" }}
          className="btn btn-primary btn-block mt-4"
          disabled={{ disable } && !captcha}
        />
        <div>
          <br></br>
        </div>
        <Progress percentage={uploadPercentage} />
      </form>
    </Fragment>
  );
};

export default FileUpload;
