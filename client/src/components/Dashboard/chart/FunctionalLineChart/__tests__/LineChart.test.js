import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import Datatable from "../LineChart";
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
  const data = [0, 3, 0, 0];
  render(
    <BrowserRouter>
      <Datatable post={data} />
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
