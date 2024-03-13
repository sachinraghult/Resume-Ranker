import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import Preprocessed from "../PreprocessedProfile";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", async () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act(async () =>
    render(
      <BrowserRouter>
        <Preprocessed />
      </BrowserRouter>
    )
  );
});

it("renders correctly", () => {
  render(
    <BrowserRouter>
      <Preprocessed />
    </BrowserRouter>
  );
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Preprocessed />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
