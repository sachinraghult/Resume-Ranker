import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import Login from "../Login";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", async () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act(async () =>
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
  );
});

it("renders correctly", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  fireEvent.submit(getByTestId("handleSubmit"));
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
