import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import JobCards from "../JobCards";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", async () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act(async () =>
    render(
      <BrowserRouter>
        <JobCards />
      </BrowserRouter>
    )
  );
});

it("renders correctly", () => {
  const data = {
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
  };
  const { getByTestId } = render(
    <BrowserRouter>
      <JobCards post={data} />
    </BrowserRouter>
  );
  fireEvent.click(getByTestId("handleApply"));
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <JobCards />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
