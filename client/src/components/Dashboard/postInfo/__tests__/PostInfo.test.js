import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import Datatable from "../PostInfo";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", async () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act(async () =>
    render(
      <BrowserRouter>
        <Datatable />
      </BrowserRouter>
    )
  );
});

it("renders correctly", () => {
  const data = {
    title: "Software Engineer",
    description:
      "Check out latest 2020 Wells Fargo job vacancies in India. Get details on salary, company and location. Apply quickly to various Wells Fargo jobs ",
    experience:
      "Bachelor's degree in Engineering. \\nGood spoken and written English skills to effectively communicate technical concepts. \\nStrong logical, analytical skills and a systematic problem solving approach. \\nGood understanding of Software Development Life Cycle (SDLC).\\nDetail oriented, results driven, accountable and ability to work with multiple priorities.\\nAbility to research and report on a variety of issues using problem solving skills.\\nAbility to interact with integrity and a high level of professionalism with all levels of team members and management.\\nAbility to make timely and independent judgment decisions while working in a fast paced and results-driven environment",
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
    active: "YES",
    createdAt: "10-07-2022",
    modified: "11-07-2022",
    deadline: "31-07-2022",
    num: 3,
    id: "62c9ebadf448b0664028a3d8",
  };
  render(
    <BrowserRouter>
      <Datatable info={data} />
    </BrowserRouter>
  );
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Datatable />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
