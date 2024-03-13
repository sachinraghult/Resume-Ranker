import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import Welcome2 from "../Welcome2";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", async () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act(async () =>
    render(
      <BrowserRouter>
        <Welcome2 />
      </BrowserRouter>
    )
  );
});

it("renders correctly", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Welcome2 />
    </BrowserRouter>
  );
  fireEvent.click(getByTestId("handleSearcher"));
  fireEvent.click(getByTestId("handleRecruiter"));
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Welcome2 />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
