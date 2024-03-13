import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import Datatable from "../Datatable";
import Heatmap from "../Heatmap";
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
        <Heatmap />
      </BrowserRouter>
    )
  );
});

it("renders correctly", () => {
  const data1 = [0.37, 0.55, 0.1, 0.83, 0.62, 0.1, 0.1];
  render(
    <BrowserRouter>
      <Datatable />
      <Heatmap scores={data1} />
    </BrowserRouter>
  );
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Datatable />
        <Heatmap />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
