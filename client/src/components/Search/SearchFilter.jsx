import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AsyncSelect from "react-select/async";
import { Context } from "../../context/Context";
import "./SearchFilter.css";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Datatable from "../Datatable/Datatable";

import { SERVER_URL } from "../../config";

export default function SearchFilter() {
  const { authToken } = useContext(Context);

  const [cat, setCat] = useState("Select Category");
  const [exp, setExp] = useState(false);
  const [skill, setSkill] = useState(false);
  const [org, setOrg] = useState(false);
  const [jobs, setJobs] = useState(false);
  const [keyword, setKeyword] = useState(false);
  const [ins, setIns] = useState(false);
  const [searcher, setSearcher] = useState(false);
  const [bulk, setBulk] = useState(false);
  const [str, setStr] = useState("");
  const [selectedOptions, setSelectedOptions] = useState();

  //Getting search bar results
  const fetchData = async (e) => {
    let options = [];

    try {
      const searchBox = await axios.post(
        `${SERVER_URL}/application/searchbox`,
        { search: e, type: cat },
        {
          headers: { authorization: authToken },
        }
      );

      // console.log(searchBox.data);

      searchBox.data?.map((search) =>
        options.push({
          value: search,
          label: (
            <div
              onClick={() => {
                setStr(search);
                setExp(false);
                setOrg(false);
                setSkill(false);
                setJobs(false);
                setKeyword(false);
                setIns(false);
                setSearcher(false);
                setBulk(false);
              }}
            >
              {search}
            </div>
          ),
        })
      );

      return options;
    } catch (err) {
      return [];
    }
  };

  //Stying for react-select-async
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      minHeight: 50,
      // width: 750,
      marginLeft: 2,
    }),
    container: (base) => ({
      ...base,
      // width: 600,
    }),
  };

  function handleSelect(data) {
    setSelectedOptions(data);
  }

  return (
    <div className="searchFilterContainer">
      <div class="searchFilterSubContainer">
        <h5>An easier way to search and sort</h5>

        <div class="row g-3 mt-2">
          <div class="col-md-3">
            <div class="dropdown">
              <button
                class="btn1 btn-secondary1 dropdown-toggle1"
                type="button"
                id="dropdownMenuButton1"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                {cat}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li
                  onClick={(e) => {
                    setCat("Select Category");
                    setExp(false);
                    setOrg(false);
                    setSkill(false);
                    setJobs(false);
                    setKeyword(false);
                    setIns(false);
                    setSearcher(false);
                    setBulk(false);
                    setStr("");
                    setSelectedOptions(null);
                  }}
                >
                  <a class="dropdown-item" href="#">
                    None
                  </a>
                </li>
                <li
                  onClick={(e) => {
                    setCat("Organisation");
                    setExp(false);
                    setOrg(false);
                    setSkill(false);
                    setJobs(false);
                    setKeyword(false);
                    setIns(false);
                    setSearcher(false);
                    setBulk(false);
                    setStr("");
                    setSelectedOptions(null);
                  }}
                >
                  <a class="dropdown-item" href="#">
                    Organisation
                  </a>
                </li>
                <li
                  onClick={(e) => {
                    setCat("Instituition");
                    setExp(false);
                    setOrg(false);
                    setSkill(false);
                    setJobs(false);
                    setKeyword(false);
                    setIns(false);
                    setSearcher(false);
                    setBulk(false);
                    setStr("");
                    setSelectedOptions(null);
                  }}
                >
                  <a class="dropdown-item" href="#">
                    Instituition
                  </a>
                </li>
                <li
                  onClick={(e) => {
                    setCat("Skills");
                    setExp(false);
                    setOrg(false);
                    setSkill(false);
                    setJobs(false);
                    setKeyword(false);
                    setIns(false);
                    setSearcher(false);
                    setBulk(false);
                    setStr("");
                    setSelectedOptions(null);
                  }}
                >
                  <a class="dropdown-item" href="#">
                    Skills
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-6">
            <AsyncSelect
              loadOptions={(e) => fetchData(e)}
              value={selectedOptions}
              onChange={handleSelect}
              placeholder="Search here..."
              styles={customStyles}
              className="asyncContainer"
            />
          </div>
        </div>
        <br></br>
        <div class="mt-3">
          <a
            data-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
            class="advanced"
          >
            Advance Ranking With Filters <i class="fa fa-angle-down"></i>
          </a>

          <div class="collapse" id="collapseExample">
            <div class="card card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <FormGroup>
                    <h5>Rank By 🎯</h5>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={exp}
                              onClick={(e) => setExp(!exp)}
                            />
                          }
                          label="Experience"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={jobs}
                              onClick={(e) => setJobs(!jobs)}
                            />
                          }
                          label="Job switches"
                          style={{ marginLeft: "100px" }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={org}
                              onClick={(e) => setOrg(!org)}
                            />
                          }
                          label="Organisation"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={skill}
                              onClick={(e) => setSkill(!skill)}
                            />
                          }
                          label="Skill Sets&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                          style={{ marginLeft: "100px" }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={keyword}
                              onClick={(e) => setKeyword(!keyword)}
                            />
                          }
                          label="Keywords"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={ins}
                              onClick={(e) => setIns(!ins)}
                            />
                          }
                          label="Instituition&nbsp;&nbsp;&nbsp;&nbsp;"
                          style={{ marginLeft: "100px" }}
                        />
                      </div>
                    </div>
                  </FormGroup>
                </div>
                <div style={{ marginRight: "50px" }}>
                  <h5>Filter By 🔍</h5>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={searcher}
                          onClick={(e) => setSearcher(!searcher)}
                        />
                      }
                      label="From Searcher"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={bulk}
                          onClick={(e) => setBulk(!bulk)}
                        />
                      }
                      label="Bulk Upload Resume"
                      style={{ marginLeft: "100px" }}
                    />
                  </div>
                </div>
                {/* <div style={{ marginRight: "100px" }}>
                        <h6>&nbsp;&nbsp;&nbsp;Filter By</h6>
                        <div
                          class="col-md-4"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "25px",
                          }}
                        >
                          <label htmlFor="comments">
                            Minimum&nbsp;&nbsp;&nbsp;&nbsp;
                          </label>
                          <input
                            type="number"
                            defaultValue={0.0}
                            min="0.0"
                            max="1.0"
                            step="0.1"
                            class="form-control"
                            style={{ width: "150px" }}
                          />
                        </div>
                        <div
                          class="col-md-4"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "25px",
                          }}
                        >
                          <label htmlFor="comments">
                            Maximum&nbsp;&nbsp;&nbsp;
                          </label>
                          <input
                            type="number"
                            defaultValue={1.0}
                            min="0.0"
                            max="1.0"
                            step="0.1"
                            class="form-control"
                            style={{ width: "150px" }}
                          />
                        </div>
                      </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rankingTableContainer">
        <Datatable
          exp={exp}
          org={org}
          skill={skill}
          jobs={jobs}
          keyword={keyword}
          ins={ins}
          searcher={searcher}
          bulk={bulk}
          str={str}
          cat={cat}
        />
      </div>
    </div>
  );
}
