import * as actions from "./changePermissions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import LocalStorageMock from "../../../mocks/localStorageMock";

const MockAdapter = require("axios-mock-adapter");
const axios = require("axios");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

const id = 2;
const status = false;
const expectedResult = status;

global.localStorage = new LocalStorageMock();

describe("change permissions actions", () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });
  it("CHANGED_PERMISSIONS_SUCCESS", () => {
    mock
      .onPatch(`http://localhost:8080/users/${id}`)
      .reply(200, expectedResult);

    store.dispatch(actions.changePermissions(status, id)).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actions.CHANGING_PERMISSIONS
        },
        {
          type: actions.CHANGED_PERMISSIONS_SUCCESS,
          status
        }
      ]);
    });
  });

  it("CHANGED_PERMISSIONS_ERROR", () => {
    mock
      .onPatch(`http://localhost:8080/users/${id}`)
      .reply(404, expectedResult);

    store.dispatch(actions.changePermissions(status.id)).then(() => {
      expect(store.getActions()[0].type).toEqual(actions.CHANGING_PERMISSIONS);
      expect(store.getActions()[1].type).toEqual(
        actions.CHANGED_PERMISSIONS_ERROR
      );
    });
  });
});
