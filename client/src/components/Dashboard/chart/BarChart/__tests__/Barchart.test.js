import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import Barchart from "../Barchart";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", async () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act(async () =>
    render(
      <BrowserRouter>
        <Barchart />
      </BrowserRouter>
    )
  );
});

it("renders correctly", () => {
  const data = {
    skill: ["Java", "C#", "SQL", "Python"],
    count: [1, 0, 0, 2],
    d: 3,
  };
  render(
    <BrowserRouter>
      <Barchart info={data} />
    </BrowserRouter>
  );
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Barchart />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
