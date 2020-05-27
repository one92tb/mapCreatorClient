import * as actions from "./loginRequest";
import * as redirectAction from "../redirect/redirect";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import LocalStorageMock from "../../../mocks/localStorageMock";

const MockAdapter = require("axios-mock-adapter");
const axios = require("axios");

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(axios);
const store = mockStore();

const userData = {
  login: "John",
  password: "asd123"
};

const expectedResult = {
  error: "",
  isAuthorized: true,
  token: "abcdef123",
  userName: "John"
};

global.localStorage = new LocalStorageMock();

describe("login request actions", () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it("LOGIN_SUCCESS", () => {
    mock.onPost("http://localhost:8080/login").reply(200, expectedResult);
    store.dispatch(actions.loginRequest(userData)).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actions.LOGIN_REQUEST
        },
        {
          type: actions.LOGIN_SUCCESS,
          userData: expectedResult
        },
        {
          type: redirectAction.REDIRECT,
          pathName: "/"
        }
      ]);
    });
  });

  it("LOGIN_ERROR", () => {
    mock.onPost("http://localhost:8080/login").reply(404);
    store.dispatch(actions.loginRequest(userData)).then(() => {
      expect(store.getActions()[0].type).toEqual(actions.LOGIN_REQUEST);
      expect(store.getActions()[1].type).toEqual(actions.LOGIN_ERROR);
    });
  });
});
