import React from "react";
import ReactDOM from "react-dom";
import {
  shallow,
  mount,
  render
} from "enzyme";
import {
  MemoryRouter
} from "react-router";
import LocalStorageMock from "../../../../../mocks/localStorageMock";
import {
  Provider
} from "react-redux";
import {
  AuthApp,
  checkAuth
} from "../AuthApp";
import decode from "jwt-decode";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore();

jest.mock("jwt-decode", () => jest.fn());

global.localStorage = new LocalStorageMock();

describe("authApp method", () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("it should return true when authApp is running", () => {
    localStorage.setItem("token", "fake_token_user");
    const token = localStorage.getItem("token");

    decode.mockImplementationOnce(token => {
      return {
        exp: new Date().getTime() / 1000 + 1,
        iat: 1575751766,
        userData: {
          isAdmin: true,
          login: "one92tb",
          userId: 1
        }
      };
    });

    expect(token).toBe("fake_token_user");
    expect(checkAuth()).toBe(true);
  });

  test("it should return false when authApp is running (without token)", () => {
    localStorage.setItem("token", "");
    const token = localStorage.getItem("token");
    decode.mockImplementationOnce(token => {
      return {
        exp: new Date().getTime() / 1000 + 1,
        iat: 1575751766,
        userData: {
          isAdmin: true,
          login: "one92tb",
          userId: 1
        }
      };
    });

    expect(checkAuth()).toBe(false);
  });

  test("it should return false when authApp is running (expired time less than Date)", () => {
    localStorage.setItem("token", "fake_token_user");
    const token = localStorage.getItem("token");
    decode.mockImplementationOnce(token => {
      return {
        exp: new Date().getTime() / 1000 - 1,
        iat: 1575751766,
        userData: {
          isAdmin: true,
          login: "one92tb",
          userId: 1
        }
      };
    });

    expect(checkAuth()).toBe(false);
  });
})
