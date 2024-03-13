import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import Welcome from "../Welcome";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", async () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act(async () =>
    render(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    )
  );
});

it("renders correctly", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Welcome />
    </BrowserRouter>
  );
  fireEvent.click(getByTestId("handleNewUser"));
  fireEvent.click(getByTestId("handleOldUser"));
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
