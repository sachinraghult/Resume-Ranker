import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

import AsyncSelect from "react-select/async";

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { Layout, Report, ReportUI } from "../../components";
import { Context } from "../../context/Context";
import "./ReportGenerated.css";

import { SERVER_URL } from "../../config";

const ReportGenerated = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { authToken } = useContext(Context);

  const [cat, setCat] = useState("Select filter to be applied");
  const [selectedOptions, setSelectedOptions] = useState("");

  const [overall, setOverall] = useState(false);
  const [specific, setSpecific] = useState(false);
  const [title, setTitle] = useState(false);
  const [active, setActive] = useState(false);
  const [time, setTime] = useState(false);
  const [skill, setSkill] = useState(false);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [process, setProcess] = useState(false);
  const [progress, setProgress] = React.useState(0);

  const [result, setResult] = useState();

  //Stying for react-select-async
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      minHeight: 50,
      width: 500,
      marginLeft: 0,
      marginTop: 10,
    }),
    container: (base) => ({
      ...base,
      width: 500,
    }),
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 10 ? 0 : prevProgress + 10
      );
    }, 100);
  });

  function handleSelect(data) {
    setSelectedOptions(data);
  }

  //Getting search bar results
  const fetchData = async (e) => {
    let options = [];

    try {
      const searchBox = await axios.post(
        `${SERVER_URL}/report/searchbox`,
        { search: e, type: cat },
        {
          headers: { authorization: authToken },
        }
      );

      searchBox.data?.map((search) =>
        options.push({
          value: search,
          label: <div>{search}</div>,
        })
      );

      return options;
    } catch (err) {
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcess(true);
    try {
      const res = await axios.post(
        `${SERVER_URL}/report/filter`,
        { type: cat, search: selectedOptions.value, startDate, endDate },
        {
          headers: { authorization: authToken },
        }
      );

      setResult(res.data);
      setProcess(false);
    } catch (err) {}
  };

  function handleListChange(item) {
    setCat(item);
    setSelectedOptions("");
    setOverall(false);
    setSpecific(false);
    setTitle(false);
    setActive(false);
    setTime(false);
    setSkill(false);

    if (item == "Select filter to be applied");
    else if (item == "Overall job posts report") setOverall(true);
    else if (item == "Specific posts reports") setSpecific(true);
    else if (item == "Filter job posts report based on Title") setTitle(true);
    else if (item == "Active job posts report") setActive(true);
    else if (item == "Job posts report between a Time frame") setTime(true);
    else if (item == "Filter job posts report based on Skills") setSkill(true);
  }

  return (
    <div className="reportContainer">
      <Layout />
      <div style={{ display: "none" }}>
        <Report result={result} ref={componentRef} />
      </div>
      <div className="reportSubContainer">
        <h3>Report Generation Dashboard</h3>
        <div className="reportFilterContainer">
          <div className="container mt-5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-10">
                {" "}
                <div className="card p-3  py-4">
                  <h5>Report Generation with filter</h5>

                  <div className="filterAlignContainer">
                    <div className="col-md-3">
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {cat}
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <li
                            onClick={(e) =>
                              handleListChange("Select filter to be applied")
                            }
                          >
                            <a className="dropdown-item" href="#">
                              None
                            </a>
                          </li>
                          {/* <li
                            onClick={(e) =>
                              handleListChange("Overall job posts report")
                            }
                          >
                            <a className="dropdown-item" href="#">
                              <b>Overall</b> job posts report
                            </a>
                          </li> */}
                          <li
                            onClick={(e) =>
                              handleListChange("Specific posts reports")
                            }
                          >
                            <a className="dropdown-item" href="#">
                              Job <b>Specific</b> posts reports
                            </a>
                          </li>
                          <li
                            onClick={(e) =>
                              handleListChange(
                                "Filter job posts report based on Title"
                              )
                            }
                          >
                            <a className="dropdown-item" href="#">
                              Filter job posts report based on <b>Title</b>
                            </a>
                          </li>
                          <li
                            onClick={(e) =>
                              handleListChange("Active job posts report")
                            }
                          >
                            <a className="dropdown-item" href="#">
                              <b>Active</b> job posts report
                            </a>
                          </li>
                          <li
                            onClick={(e) =>
                              handleListChange(
                                "Job posts report between a Time frame"
                              )
                            }
                          >
                            <a className="dropdown-item" href="#">
                              Job posts report between a <b>Time</b> frame
                            </a>
                          </li>
                          <li
                            onClick={(e) =>
                              handleListChange(
                                "Filter job posts report based on Skills"
                              )
                            }
                          >
                            <a className="dropdown-item" href="#">
                              Filter job posts report based on <b>Skill</b>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {title || skill || time ? (
                      ""
                    ) : (
                      <>
                        <div className="filterButtonContainer1">
                          <button
                            className={
                              process
                                ? "productAddButton2process"
                                : "productAddButton2"
                            }
                            onClick={handleSubmit}
                            disabled={process}
                          >
                            {process ? (
                              <div
                                style={{ display: "flex", marginLeft: "60px" }}
                              >
                                <CircularProgress
                                  variant="determinate"
                                  value={progress}
                                />
                              </div>
                            ) : (
                              "Apply Filter"
                            )}
                          </button>
                        </div>
                        <div className="filterButtonContainer2">
                          <button
                            className={
                              process
                                ? "productAddButton2process"
                                : "productAddButton2"
                            }
                            onClick={handlePrint}
                            disabled={process}
                          >
                            Download Report
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="advancedReportFilter">
                    <div className="advance1">
                      {(title || skill || time) && (
                        <h6>
                          Select the advanced filter and click on apply button
                        </h6>
                      )}
                    </div>
                    <div style={{ display: "flex" }}>
                      <div>
                        {title && (
                          <div className="advance2">
                            <AsyncSelect
                              loadOptions={(e) => fetchData(e)}
                              value={selectedOptions}
                              onChange={handleSelect}
                              placeholder="Search job posts based on title"
                              styles={customStyles}
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        {skill && (
                          <div className="advance3">
                            <AsyncSelect
                              loadOptions={(e) => fetchData(e)}
                              value={selectedOptions}
                              onChange={handleSelect}
                              placeholder="Search job posts based on skill"
                              styles={customStyles}
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        {time && (
                          <div className="advance4">
                            <div className="advanceDateLabel">
                              <div className="labelDate1">
                                <b>Start Date :</b>
                              </div>
                              <div className="labelDate2">
                                <b>End Date :</b>
                              </div>
                            </div>
                            <div className="advanceDateInput">
                              <input
                                id="date"
                                className="inputDate1"
                                type="date"
                                onChange={(e) => setStartDate(e.target.value)}
                              />
                              <input
                                id="date"
                                className="inputDate2"
                                type="date"
                                onChange={(e) => setEndDate(e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        {title || skill || time ? (
                          <div
                            style={{
                              display: "flex",
                              marginTop: time ? "40px" : "0px",
                            }}
                          >
                            <div className="filterButtonContainer1a">
                              <button
                                className={
                                  process
                                    ? "productAddButton1process"
                                    : "productAddButton1"
                                }
                                onClick={handleSubmit}
                              >
                                Apply Filter
                              </button>
                            </div>
                            <div className="filterButtonContainer2a">
                              <button
                                className="productAddButton2"
                                onClick={handlePrint}
                              >
                                Download Report
                              </button>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <button onClick={handlePrint}>Print this out!</button> */}
        <div style={{ marginLeft: "-50px" }}>
          {process ? (
            ""
          ) : result ? (
            result?.length > 0 ? (
              <ReportUI result={result} />
            ) : (
              <h3
                style={{ marginLeft: "50px", marginTop: "50px", color: "red" }}
              >
                No results found : (
              </h3>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportGenerated;
