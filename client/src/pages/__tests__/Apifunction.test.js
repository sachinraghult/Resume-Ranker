import axios, { AxiosResponse } from "axios";
import { act, render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { SERVER_URL } from "../../config";
// import { useState, useEffect, useContext } from "react";
// import { Context } from "../../../context/Context";
import { fetchCards, fetchAppliedCards } from "../ApiFunctions";
import { Experimental_CssVarsProvider } from "@mui/material";
// import { jssPreset } from "@material-ui/core";

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  get: jest.fn(),
}));

test("getting the posts", async () => {
  const data = [
    {
      _id: "62cad06e225d2dcfbe60e8e2",
      user: "62cacfd5225d2dcfbe60e8c1",
      title: "Sales Executive",
      desc: "Check out latest 2020 Wells Fargo job vacancies in India. Get details on salary, company and location. Apply quickly to various Wells Fargo jobs ",
      exp: "Bachelor's degree in Engineering. \\nGood spoken and written English skills to effectively communicate technical concepts. \\nStrong logical, analytical skills and a systematic problem solving approach. \\nGood understanding of Software Development Life Cycle (SDLC).\\nDetail oriented, results driven, accountable and ability to work with multiple priorities.\\nAbility to research and report on a variety of issues using problem solving skills.\\nAbility to interact with integrity and a high level of professionalism with all levels of team members and management.\\nAbility to make timely and independent judgment decisions while working in a fast paced and results-driven environment",
      skills: [
        {
          skill: "Sales",
          value: 29,
          _id: "62cad06e225d2dcfbe60e8e3",
        },
        {
          skill: "Marketing",
          value: 35,
          _id: "62cad06e225d2dcfbe60e8e4",
        },
        {
          skill: "Business Management",
          value: 35,
          _id: "62cad06e225d2dcfbe60e8e5",
        },
      ],
      tags: ["Part Time", "Flex work", "Distant", "Full Time"],
      deadline: "2022-08-31T00:00:00.000Z",
      email: "wellsfargo@gmail.com",
      applications: ["62cb1d8bab7429104fb50d48"],
      createdAt: "2022-07-10T13:13:18.119Z",
      updatedAt: "2022-07-10T18:42:20.001Z",
      __v: 10,
      keywords: [],
      applied: false,
    },
    {
      _id: "62cacefc225d2dcfbe60e8af",
      user: "62c9ea1df448b0664028a3c2",
      title: "Senior Manager",
      desc: "Check out latest 2020 Wells Fargo job vacancies in India. Get details on salary, company and location. Apply quickly to various Wells Fargo jobs ",
      exp: "Bachelor's degree in Engineering. \\nGood spoken and written English skills to effectively communicate technical concepts. \\nStrong logical, analytical skills and a systematic problem solving approach. \\nGood understanding of Software Development Life Cycle (SDLC).\\nDetail oriented, results driven, accountable and ability to work with multiple priorities.\\nAbility to research and report on a variety of issues using problem solving skills.\\nAbility to interact with integrity and a high level of professionalism with all levels of team members and management.\\nAbility to make timely and independent judgment decisions while working in a fast paced and results-driven environment",
      skills: [
        {
          skill: "Java",
          value: 99,
          _id: "62cacefc225d2dcfbe60e8b0",
        },
      ],
      tags: ["Full Time"],
      deadline: "2022-07-31T00:00:00.000Z",
      email: "wellsfargo@gmail.com",
      applications: [
        "62cb1db6ab7429104fb50d62",
        "62cb1df2ab7429104fb50d99",
        "62cb1ef0ab7429104fb50e49",
        "62cb1f74ab7429104fb50ea2",
      ],
      createdAt: "2022-07-10T13:07:08.477Z",
      updatedAt: "2022-07-10T18:50:28.205Z",
      __v: 8,
      keywords: [],
      applied: false,
    },
    {
      _id: "62cacab1225d2dcfbe60e8a5",
      user: "62c9ea1df448b0664028a3c2",
      title: "Web Developer",
      desc: "Check out latest 2020 Wells Fargo job vacancies in India. Get details on salary, company and location. Apply quickly to various Wells Fargo jobs ",
      exp: "Bachelor's degree in Engineering. \\nGood spoken and written English skills to effectively communicate technical concepts. \\nStrong logical, analytical skills and a systematic problem solving approach. \\nGood understanding of Software Development Life Cycle (SDLC).\\nDetail oriented, results driven, accountable and ability to work with multiple priorities.\\nAbility to research and report on a variety of issues using problem solving skills.\\nAbility to interact with integrity and a high level of professionalism with all levels of team members and management.\\nAbility to make timely and independent judgment decisions while working in a fast paced and results-driven environment",
      skills: [
        {
          skill: "React",
          value: 40,
          _id: "62cacab1225d2dcfbe60e8a6",
        },
        {
          skill: "Node",
          value: 40,
          _id: "62cacab1225d2dcfbe60e8a7",
        },
        {
          skill: "Mongo",
          value: 20,
          _id: "62cacab1225d2dcfbe60e8a8",
        },
      ],
      tags: ["Internship", "Flex work", "Full Time"],
      deadline: "2022-08-20T00:00:00.000Z",
      email: "wellsfargo@gmail.com",
      applications: [
        "62cb1d6cab7429104fb50d2e",
        "62cb1ebcab7429104fb50e25",
        "62cb1f8eab7429104fb50ebc",
      ],
      createdAt: "2022-07-10T12:48:49.870Z",
      updatedAt: "2022-07-10T18:50:54.458Z",
      __v: 9,
      keywords: [],
      applied: false,
    },
    {
      _id: "62caad3248bc73a7e0585749",
      user: "62c9ea1df448b0664028a3c2",
      title: "Analyst",
      desc: "Participates in a formal internship program with a duration of at least 8 – 10 weeks. Internship includes performing various assignments to become familiar with the organization and gain basic work experience. Work assignments are augmented by classroom training, self-study assignments, workshops, networking and/or other events.",
      exp: "Detail oriented, results driven, accountable and ability to work with multiple priorities\nAbility to research and report on a variety of issues using problem solving skills\nAbility to interact with integrity and a high level of professionalism with all levels of\nteam members and management\nAbility to make timely and independent judgment decisions while working in a fast-paced and results-driven environment",
      skills: [
        {
          skill: "Java",
          value: 44,
          _id: "62caad3248bc73a7e058574a",
        },
        {
          skill: "C#",
          value: 25,
          _id: "62caad3248bc73a7e058574b",
        },
        {
          skill: "SQL",
          value: 30,
          _id: "62caad3248bc73a7e058574c",
        },
      ],
      tags: ["Internship", "Full Time"],
      deadline: "2022-10-30T00:00:00.000Z",
      email: "wellsfargo@gmail.com",
      applications: ["62cb1e2bab7429104fb50dd4"],
      createdAt: "2022-07-10T10:42:58.918Z",
      updatedAt: "2022-07-10T18:44:59.113Z",
      __v: 4,
      keywords: [],
      applied: true,
    },
    {
      _id: "62c9ebadf448b0664028a3d8",
      user: "62c9ea1df448b0664028a3c2",
      title: "Software Engineer",
      desc: "Check out latest 2020 Wells Fargo job vacancies in India. Get details on salary, company and location. Apply quickly to various Wells Fargo jobs ",
      exp: "Bachelor's degree in Engineering. \\nGood spoken and written English skills to effectively communicate technical concepts. \\nStrong logical, analytical skills and a systematic problem solving approach. \\nGood understanding of Software Development Life Cycle (SDLC).\\nDetail oriented, results driven, accountable and ability to work with multiple priorities.\\nAbility to research and report on a variety of issues using problem solving skills.\\nAbility to interact with integrity and a high level of professionalism with all levels of team members and management.\\nAbility to make timely and independent judgment decisions while working in a fast paced and results-driven environment",
      skills: [
        {
          skill: "Java",
          value: 40,
          _id: "62c9ebadf448b0664028a3d9",
        },
        {
          skill: "C#",
          value: 10,
          _id: "62c9ebadf448b0664028a3da",
        },
        {
          skill: "SQL",
          value: 15,
          _id: "62c9ebadf448b0664028a3db",
        },
        {
          skill: "Python",
          value: 35,
          _id: "62c9ebadf448b0664028a3dc",
        },
      ],
      tags: ["Internship", "Full Time"],
      deadline: "2022-07-31T00:00:00.000Z",
      email: "wellsfargo@gmail.com",
      applications: [
        "62cb1d52ab7429104fb50d14",
        "62cb1de2ab7429104fb50d7f",
        "62cb1e7aab7429104fb50e08",
      ],
      createdAt: "2022-07-09T20:57:17.768Z",
      updatedAt: "2022-07-10T18:46:18.015Z",
      __v: 12,
      keywords: [],
      applied: true,
    },
  ];
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: data }));

  let value;
  await act(async () => {
    value = await fetchCards(null);
  });

  expect(value.data).toEqual(data);
  expect(axios.get).toHaveBeenCalledWith(`${SERVER_URL}/post/jobFeed/jobFeed`, {
    headers: { Authorization: null },
  });
  expect(axios.get).toHaveBeenCalledTimes(1);
});

test("getting Applied posts", async () => {
  const data = [];
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: data }));

  let value;
  await act(async () => {
    value = await fetchAppliedCards(null);
  });

  expect(value.data).toEqual(data);
  expect(axios.get).toHaveBeenCalledWith(`${SERVER_URL}/post/jobFeed/jobFeed`, {
    headers: { Authorization: null },
  });
  expect(axios.get).toHaveBeenCalledTimes(2);
});
