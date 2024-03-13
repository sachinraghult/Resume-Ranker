import JobFeed from "../JobFeed";
import axios, { AxiosResponse } from "axios";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { SERVER_URL } from "../../../config";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../../context/Context";

describe("70450576", () => {
  // const { authToken } = useContext(Context);
  beforeAll(() => {
    // we're using fake timers because we don't want to
    // wait a full second for this test to run.
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("should render category and joke", async () => {
    const data = { data: [] };
    // const promise = Promise.resolve({ data: data });
    // axios.get.mockResolvedValueOnce(() => Promise.resolve({ data: data }));
    const spy = jest.spyOn(axios, "get").mockResolvedValueOnce(data);

    render(<JobFeed />);
    jest.advanceTimersByTime(1000);
    expect(spy).toHaveBeenCalledWith(`${SERVER_URL}/post/jobFeed/jobFeed`, {
      headers: { Authorization: null },
    });
    expect(spy).toHaveBeenCalledTimes(1);
    // expect(screen.getByText("Loading...")).toBeInTheDocument();
    // await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(await screen.findByText("Job Feed")).toBeInTheDocument();
  });
});
