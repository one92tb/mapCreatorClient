import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {
  render,
  fireEvent,
  screen
} from '@testing-library/react';
import {
  Auth
} from '../Auth';
import {
  authAdmin,
  AppComponent
} from "../AppComponent/AppComponent";

import {
  Provider
} from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import LocalStorageMock from "../../../../mocks/localStorageMock";
import decode from "jwt-decode";
import {
  MemoryRouter
} from "react-router";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.localStorage = new LocalStorageMock();


const store = mockStore({
  mapIndicator: {
    indicators: []
  },
  marker: {
    selectedMarker: "",
    markers: []
  }
});

test("it should render auth component", () => {
  render( <MemoryRouter initialEntries = {["/login"]}>
      <Provider store = {store}>
        <Auth />
    </Provider>
   </MemoryRouter > )
})
