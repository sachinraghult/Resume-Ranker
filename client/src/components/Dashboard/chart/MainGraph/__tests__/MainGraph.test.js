import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import Datatable from "../MainGraph";
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
  const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  render(
    <BrowserRouter>
      <Datatable scores={data} />
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