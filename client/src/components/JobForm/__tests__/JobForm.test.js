import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import JobForm from "../JobForm";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", async () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act(async () =>
    render(
      <BrowserRouter>
        <JobForm />
      </BrowserRouter>
    )
  );
});

it("renders correctly", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <JobForm />
    </BrowserRouter>
  );

  fireEvent.click(getByTestId("handleKeywordAdd"));
  fireEvent.click(getByTestId("handleServiceAdd"));
  // fireEvent.click(getByTestId("handleServiceRemove"), { target: { index: 0 } });
  // fireEvent.click(getByTestId("handleKeywordRemove"), { target: { index: 0 } });
  fireEvent.submit(getByTestId("handleSubmit"));
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <JobForm />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
