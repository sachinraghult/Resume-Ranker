import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import Register from "../Register";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

let url = "";
let body = {};

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  get: jest.fn(),
  post: jest.fn((_url, _body) => {
    return new Promise((resolve) => {
      url = _url;
      body = _body;
      resolve(true);
    });
  }),
}));

it("renders without crashing", async () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act(async () =>
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )
  );
});

it("renders correctly", async () => {
  const response = {
    data: [
      { id: 1, name: "game_name1" },
      { id: 2, name: "game_name2" },
    ],
  };
  axios.post.mockImplementationOnce(() => Promise.resolve(response));
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
