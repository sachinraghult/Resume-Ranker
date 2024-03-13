import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import ApplicantTable from "../ApplicantTable";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  get: jest.fn(),
}));

it("renders without crashing", async () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act(async () =>
    render(
      <BrowserRouter>
        <ApplicantTable />
      </BrowserRouter>
    )
  );
});

it("renders correctly", () => {
  const data = [
    {
      id: 0,
      ApplicantName: "User1",
      mailID: "u1@gmail.com",
      Date: "2022-07-10T18:41:22.865Z",
      action: "1O6qiBjctAGJ5TjrVnWCUtJRwkLaoKR6c",
    },
    {
      id: 1,
      ApplicantName: "User 2",
      mailID: "u2@gmail.com",
      Date: "2022-07-10T18:43:46.163Z",
      action: "1iHk55CSNpighYbC4dyfaD8rjHrJk5zWL",
    },
    {
      id: 2,
      ApplicantName: "User 3",
      mailID: "u3@gmail.com",
      Date: "2022-07-10T18:46:18.006Z",
      action: "15yc5-EmeAsrcz-1pbx2jEcjGosVwIupT",
    },
  ];
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: data }));
  render(
    <BrowserRouter>
      <ApplicantTable />
    </BrowserRouter>
  );
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <ApplicantTable />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
