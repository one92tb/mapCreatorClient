import * as actions from "./removeIndicator";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import LocalStorageMock from "../../../mocks/localStorageMock";

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

const id = 1;
const expectedResult = { id };

global.localStorage = new LocalStorageMock();

describe("remove indicator actions", () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it("REMOVED_INDICATOR_SUCCESS", () => {
    mock
      .onDelete(`http://localhost:8080/indicators/${id}`)
      .reply(200, expectedResult);
    store.dispatch(actions.removeIndicator(id)).then(() => {
      expect(store.getActions()).toEqual([
        { type: actions.REMOVING_INDICATOR },
        { type: actions.REMOVED_INDICATOR_SUCCESS, id }
      ]);
    });
  });

  it("REMOVED_INDICATOR_ERROR", () => {
    mock.onDelete(`http://localhost:8080/indicators/${id}`).reply(404);
    store.dispatch(actions.removeIndicator(id)).then(() => {
      expect(store.getActions()[0].type).toEqual(actions.REMOVING_INDICATOR);
      expect(store.getActions()[1].type).toEqual(
        actions.REMOVED_INDICATOR_ERROR
      );
    });
  });
});
