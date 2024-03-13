import React from "react";
import styles from "./JobForm.module.css";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { Url } from "../../enums";

import { SERVER_URL } from "../../config";

function JobForm() {
  const { authToken } = useContext(Context);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [exp, setExp] = useState("");
  const [serviceList, setServiceList] = useState([{ skill: "", value: null }]);
  const [keywordList, setKeywordList] = useState([{ keyword: "" }]);
  const [tags, setTags] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [disable, setDisable] = useState(false);
  const [calcError, setCalcError] = useState(false);
  const [skillError, setSkillError] = useState(false);
  const [partCheckDisable, setPartCheckDisable] = useState(false);
  const [fullCheckDisable, setFullCheckDisable] = useState(false);
  const [calc, setCalc] = useState(0);

  // const [file, setFile] = useState(null);
  // const [filename, setFilename] = useState("Choose File");
  // const [uploadPercentage, setUploadPercentage] = useState(0);

  // const onchange = async (e) => {
  //   setFile(e.target.files[0]);
  //   setFilename(e.target.files[0].name);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);

    let skills = [];
    let keywords = [];
    skills = serviceList.filter((service) => {
      if (
        service &&
        service.skill &&
        service.value &&
        service.skill !== "" &&
        service.value !== 0
      )
        return true;
    });

    keywords = keywordList.filter((keyword) => {
      if (keyword && keyword.keyword && keyword.keyword !== "") return true;
    });

    // if (file) {
    //   const post = {
    //     title,
    //     desc,
    //     exp,
    //     skills,
    //     keywords,
    //     tags,
    //     deadline,
    //     email,
    //     image: filename,
    //   };

    //   const data = new FormData();
    //   const newfilename = Date.now() + file.name;
    //   data.append("name", newfilename);
    //   data.append("file", file);

    //   try {
    //     await axios
    //       .post(`${SERVER_URL}/utils/upload`, data, {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //         onUploadProgress: (progressEvent) => {
    //           setUploadPercentage(
    //             parseInt(
    //               Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //             )
    //           );
    //         },
    //       })
    //       .then((res) => (post.image = res.data.fileId));

    //     await axios.post(`${SERVER_URL}/post`, post, {
    //       headers: { Authorization: authToken },
    //     });

    //     setDisable(false);
    //     e.target.reset();
    //     navigate(Url.MY_JOBS, { replace: true });
    //   } catch (err) {
    //     setError(true);
    //   }
    // } else {

    if (skills.length === 0) {
      setDisable(false);
      setSkillError(true);
    } else {
      const post = {
        title,
        desc,
        exp,
        skills,
        keywords,
        tags,
        deadline,
        email,
      };

      await axios.post(`${SERVER_URL}/post`, post, {
        headers: { Authorization: authToken },
      });

      setDisable(false);
      e.target.reset();
      navigate(Url.MY_JOBS, { replace: true });
    }
    // }
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (value === "Full Time")
      if (checked) setPartCheckDisable(true);
      else setPartCheckDisable(false);

    if (value === "Part Time")
      if (checked) setFullCheckDisable(true);
      else setFullCheckDisable(false);

    if (checked) {
      setTags([value, ...tags]);
    } else {
      var newTags = tags.filter((tag) => tag !== value);
      setTags(newTags);
    }
  };

  const handleKeywordChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...keywordList];
    list[index][name] = value;
    setKeywordList(list);
  };

  const handleKeywordRemove = (index) => {
    const list = [...keywordList];
    list.splice(index, 1);
    setKeywordList(list);
  };

  const handleKeywordAdd = () => {
    setKeywordList([...keywordList, { Keyword: "" }]);
  };

  const handleServiceChange = (e, index) => {
    setCalcError(false);
    setSkillError(false);
    let sum = 0;
    {
      serviceList?.map((singleService, i) => {
        if (i !== index)
          sum = sum + (singleService.value ? singleService.value : 0);
      });
    }

    const { name, value } = e.target;

    if (name === "value" && parseInt(value) + sum > 100) {
      setCalcError(true);
      // e.target.reset();
    }

    const list = [...serviceList];
    if (name === "value") {
      list[index][name] = parseInt(value);
      if (value) {
        sum = sum + parseInt(value);
        setCalc(sum);
      } else {
        setCalc(sum);
      }
    } else {
      list[index][name] = value;
    }
    setServiceList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);

    let sum = 0;
    {
      serviceList?.map((singleService, i) => {
        if (i !== index)
          sum = sum + (singleService.value ? singleService.value : 0);
      });
    }

    setCalc(sum);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { skill: "", value: null }]);
  };

  return (
    <div>
      <h1 id={styles.title}>Application Form</h1>
      <div id={styles.formcontainer}>
        <p id={styles.desc}>
          Thank you for your interest in working with us. Please check below for
          available job opportunities that meet your criteria and send your
          application by filling out the Job Application Form.
        </p>
        {error && <span className={styles.subError}>Invalid Details</span>}
        <form onSubmit={handleSubmit}>
          <div className={styles.rowTab}>
            <div className={styles.labels}>
              <label id="email-label" htmlFor="email">
                <i style={{ color: "red" }}>*&nbsp;</i>Job Title{" "}
              </label>
            </div>
            <div className={styles.rightTab}>
              <input
                type="text"
                name="email"
                id="email"
                className={styles.inputfield}
                required
                placeholder="Job Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.rowTab}>
            <div className={styles.labels}>
              <label htmlFor="comments">
                <i style={{ color: "red" }}>*&nbsp;</i>Job desc
              </label>
            </div>
            <div className={styles.rightTab}>
              <textarea
                id="email"
                className={styles.text2Inputfield}
                name="email"
                placeholder="Job Description"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className={styles.rowTab}>
            <div className={styles.labels}>
              <label htmlFor="comments">
                <i style={{ color: "red" }}>*&nbsp;</i>Experience
              </label>
            </div>
            <div className={styles.rightTab}>
              <textarea
                id="email"
                className={styles.textInputfield}
                name="email"
                placeholder="Qualified Experience"
                onChange={(e) => setExp(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className={styles.rowTabx}>
            <div className={styles.labels}>
              <label htmlFor="comments">
                <i style={{ color: "red" }}>*&nbsp;</i>Keywords
              </label>
            </div>
            <div className={styles.rightTab}>
              <form className={styles.skillform} autoComplete="off">
                <div className={styles["form-field"]}>
                  <label htmlFor="service">Keyword(s)</label>
                  {keywordList?.map((keyword, index) => (
                    <div key={index} className={styles["services"]}>
                      <div className={styles["first-division"]}>
                        <div className={styles["f"]}>
                          <input
                            className={styles["inputx"]}
                            name="keyword"
                            type="text"
                            id="service"
                            placeholder="keyword"
                            value={keyword.keyword}
                            onChange={(e) => handleKeywordChange(e, index)}
                            required
                          />
                        </div>
                        {keywordList.length - 1 === index && (
                          <button
                            data-testid="handleKeywordAdd"
                            type="button"
                            onClick={handleKeywordAdd}
                            className="add-btn"
                          >
                            <span>Add a Keyword</span>
                          </button>
                        )}
                      </div>
                      <div className={styles["second-division"]}>
                        {keywordList.length !== 1 && (
                          <button
                            data-testid="handleKeywordRemove"
                            type="button"
                            onClick={() => handleKeywordRemove(index)}
                            className={styles["remove-btn"]}
                          >
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </div>
          <div className={styles.rowTabx}>
            <div className={styles.labels}>
              <label htmlFor="comments">
                <i style={{ color: "red" }}>*&nbsp;</i>Skills
              </label>
            </div>
            <div className={styles.rightTab}>
              <form className={styles.skillform} autoComplete="off">
                <div className={styles["form-field"]}>
                  <label htmlFor="service">Skill(s)</label>
                  <label className={styles["secondlabel"]}>Priority(s)</label>
                  {serviceList?.map((singleService, index) => (
                    <div key={index} className={styles["services"]}>
                      <div className={styles["first-division"]}>
                        <div className={styles["f"]}>
                          <input
                            className={
                              skillError ? styles["inputs1"] : styles["inputx"]
                            }
                            name="skill"
                            type="text"
                            id="service"
                            placeholder="Skill"
                            value={singleService.skill}
                            onChange={(e) => handleServiceChange(e, index)}
                            required
                          />
                          <div>
                            <input
                              className={
                                calcError
                                  ? styles["inputz"]
                                  : skillError
                                  ? styles["inputs2"]
                                  : styles["inputy"]
                              }
                              name="value"
                              type="number"
                              id="score"
                              value={singleService.value}
                              min="0"
                              max="100"
                              placeholder={`0 - ${100 - calc}`}
                              onChange={(e) => handleServiceChange(e, index)}
                              required
                            />
                          </div>
                        </div>

                        {serviceList.length - 1 === index && calcError && (
                          <div style={{ color: "red", marginTop: "5px" }}>
                            <small>Sum should not be greater than 100</small>
                          </div>
                        )}
                        {serviceList.length - 1 === index && calc < 100 && (
                          <button
                            type="button"
                            data-testid="handleServiceAdd"
                            onClick={handleServiceAdd}
                            className="add-btn"
                          >
                            <span>Add a Skill</span>
                          </button>
                        )}
                      </div>
                      <div className={styles["second-division"]}>
                        {serviceList.length !== 1 && (
                          <button
                            data-testid="handleServiceRemove"
                            type="button"
                            onClick={() => handleServiceRemove(index)}
                            className={styles["remove-btn"]}
                          >
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </div>

          <div className={styles.rowTab}>
            <div className={styles.labels}>
              <label htmlFor="tags">Select Tags</label>
            </div>
            <div className={styles.checkBoxDiv}>
              <label className={styles.checkBoxContainer}>
                <span
                  style={{
                    color: fullCheckDisable ? "grey" : "",
                  }}
                >
                  Full Time
                </span>
                <input
                  value="Full Time"
                  type="checkbox"
                  disabled={fullCheckDisable}
                  onChange={handleChange}
                />
                <span className={styles.checkmark}></span>
              </label>
              <label className={styles.checkBoxContainer}>
                <span
                  style={{
                    color: partCheckDisable ? "grey" : "",
                  }}
                >
                  Part Time
                </span>
                <input
                  value="Part Time"
                  type="checkbox"
                  disabled={partCheckDisable}
                  onChange={handleChange}
                />
                <span className={styles.checkmark}></span>
              </label>
              <label className={styles.checkBoxContainer}>
                Internship
                <input
                  value="Internship"
                  type="checkbox"
                  onChange={handleChange}
                />
                <span className={styles.checkmark}></span>
              </label>
              <label className={styles.checkBoxContainer}>
                Distant
                <input
                  value="Distant"
                  type="checkbox"
                  onChange={handleChange}
                />
                <span className={styles.checkmark}></span>
              </label>
              <label className={styles.checkBoxContainer}>
                Flex work
                <input
                  value="Flex work"
                  type="checkbox"
                  onChange={handleChange}
                />
                <span className={styles.checkmark}></span>
              </label>
            </div>
          </div>

          <div className={styles.rowTab}>
            <div className={styles.labels}>
              <label htmlFor="date">
                <i style={{ color: "red" }}>*&nbsp;</i>Deadline
              </label>
            </div>
            <div className={styles.rightTab}>
              <input
                id="date"
                className={styles.dropdown}
                type="date"
                onChange={(e) => setDeadline(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div className={styles.rowTab}>
            <div className={styles.labels}>
              <label id="email-label" htmlFor="email">
                <i style={{ color: "red" }}>*&nbsp;</i>Contact Email{" "}
              </label>
            </div>
            <div className={styles.rightTab}>
              <input
                type="email"
                name="email"
                id="email"
                className={styles.inputfield}
                required
                placeholder="Contact Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* <div className={styles.rowTab}>
            <div className={styles.labels}>
              <label id="email-label" htmlFor="email">
                Job Poster{" "}
              </label>
            </div>
            <div className={styles.rightTab}>
              <input
                type="file"
                name="image"
                id="image"
                className={styles.inputfield}
                onChange={onchange}
              />
            </div>
          </div> */}

          {skillError && (
            <div>
              <span className={styles.subError} style={{ marginLeft: "310px" }}>
                Atleast one skill should be added
              </span>
              <br></br>
            </div>
          )}
          <br></br>
          <div id={styles.wrapper}>
            <button
              data-testid="handleSubmit"
              id={styles.submit}
              type="submit"
              disabled={disable || calcError}
              style={{
                opacity: disable || calcError || skillError ? "0.7" : "1",
                cursor:
                  disable || calcError || skillError
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {disable ? "Submitting..." : "Submit"}
            </button>{" "}
          </div>
          <br></br>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
