import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import Context from "../Context";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import {
  LoginStart,
  LoginSuccess,
  LoginFailure,
  Logout,
  UpdateStart,
  UpdateSuccess,
  UpdateFailure,
} from "../Actions";
import Reducer from "../Reducer";

it("renders without crashing", async () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act(async () =>
    render(
      <BrowserRouter>
        <Context />
      </BrowserRouter>
    )
  );
});

it("renders correctly", () => {
  render(
    <BrowserRouter>
      <Context />
    </BrowserRouter>
  );
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Context />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("checking reducer", async () => {
  let value;
  let action = {
    type: "LOGIN_START",
  };
  let state;
  await act(async () => {
    value = await Reducer(state, action);
  });
  action = {
    type: "LOGIN_FAILURE",
  };
  await act(async () => {
    value = await Reducer(state, action);
  });
  action = {
    type: "LOGOUT",
  };
  await act(async () => {
    value = await Reducer(state, action);
  });
  action = {
    type: "LOGIN_SUCCESS",
    payload: {
      authToken: "aga",
      type: "SEARCHER",
      user: "annwlnsdvo",
    },
  };
  await act(async () => {
    value = await Reducer(state, action);
  });
  action = {
    type: "UPDATE_START",
  };
  await act(async () => {
    value = await Reducer(state, action);
  });
  action = {
    type: "UPDATE_SUCCESS",
    payload: {
      authToken: "aga",
      type: "SEARCHER",
      user: "annwlnsdvo",
    },
  };
  state = {
    authToken: "avs",
    user: "absrsxv",
  };
  await act(async () => {
    value = await Reducer(state, action);
  });
  action = {
    type: "UPDATE_FAILURE",
    payload: {
      authToken: "aga",
      type: "SEARCHER",
      user: "annwlnsdvo",
    },
  };
  await act(async () => {
    value = await Reducer(state, action);
  });
  action = {
    type: "DEFAULT",
    payload: {
      authToken: "aga",
      type: "SEARCHER",
      user: "annwlnsdvo",
    },
  };
  await act(async () => {
    value = await Reducer(state, action);
  });
});

test("checking actions", async () => {
  await act(async () => {
    await LoginStart();
  });
  await act(async () => {
    await LoginSuccess();
  });
  await act(async () => {
    await LoginFailure();
  });
  await act(async () => {
    await Logout();
  });
  await act(async () => {
    await UpdateFailure();
  });
  await act(async () => {
    await UpdateStart();
  });
  await act(async () => {
    await UpdateSuccess({ type: "hi" });
  });

  // await act(async () => {
  //   value = await Reducer(state, action);
  // });
  // await act(async () => {
  //   value = await Reducer(state, action);
  // });
  // await act(async () => {
  //   value = await Reducer(state, action);
  // });
  // await act(async () => {
  //   value = await Reducer(state, action);
  // });
});
