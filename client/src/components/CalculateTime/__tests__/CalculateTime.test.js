import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import AppliedCards from "../CalculateTime";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import moment from "moment";

it("renders without crashing", async () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act(async () =>
    render(
      <BrowserRouter>
        <AppliedCards />
      </BrowserRouter>
    )
  );
});

it("renders correctly", () => {
  const current = new Date(moment().format());
  const previous = new Date(moment("2022-07-10T18:44:59.113+00:00").format());
  render(
    <BrowserRouter>
      <AppliedCards current={current} previous={previous} />
    </BrowserRouter>
  );
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <AppliedCards />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
