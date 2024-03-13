import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import Bargraph from "../Bargraph";
import Heatmap from "../Heatmap";
import ReportUI from "../ReportUI";
import Scattercharts from "../Scattercharts";
import Table from "../Table";

import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", async () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act(async () =>
    render(
      <BrowserRouter>
        <Bargraph />
        <Heatmap />
        <ReportUI />
        <Scattercharts />
        <Table />
      </BrowserRouter>
    )
  );
});

it("renders correctly", () => {
  const bd = {
    post: {
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
    },
    details: [
      {
        users: "User 3",
        scores: [
          0.7682849284825344, 0.4470739270719687, 0.723619182621134, 0.1, 0.1,
          0.1, 0.1,
        ],
      },
      {
        users: "User1",
        scores: [
          0.6473675046230588, 0.16339075919433416, 0.7211929349627837, 0.1, 0.1,
          0.1, 0.1,
        ],
      },
      {
        users: "User 2",
        scores: [
          0.02574611905749618, 0.06143623032533683, 0.03070897970876288, 0.1,
          0.1, 0.1, 0.1,
        ],
      },
    ],
  };

  const sc = {
    post: {
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
    },
    details: [
      {
        scores: [
          0.02574611905749618, 0.06143623032533683, 0.03070897970876288, 0.1,
          0.1, 0.1, 0.1,
        ],
      },
      {
        scores: [
          0.6473675046230588, 0.16339075919433416, 0.7211929349627837, 0.1, 0.1,
          0.1, 0.1,
        ],
      },
      {
        scores: [
          0.7682849284825344, 0.4470739270719687, 0.723619182621134, 0.1, 0.1,
          0.1, 0.1,
        ],
      },
    ],
  };
  render(
    <BrowserRouter>
      <Bargraph bargraph={bd} />
      <Heatmap />
      <ReportUI />
      <Scattercharts scatter={sc} />
      <Table tableDetails={bd} />
    </BrowserRouter>
  );
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Bargraph />
        <Heatmap />
        <ReportUI />
        <Scattercharts />
        <Table />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
