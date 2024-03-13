import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import Piechart from "../PieChart";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", async () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act(async () =>
    render(
      <BrowserRouter>
        <Piechart />
      </BrowserRouter>
    )
  );
});

it("renders correctly", () => {
  render(
    <BrowserRouter>
      <Piechart />
    </BrowserRouter>
  );
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Piechart />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
