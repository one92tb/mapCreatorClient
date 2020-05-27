import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, screen, waitForElement, waitForDomChange} from '@testing-library/react'
import {Main} from "../Main";
import {MemoryRouter} from "react-router";
import {Switch, Route} from "react-router-dom";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import LocalStorageMock from "../../../../mocks/localStorageMock";
import {errors, markerValidationDetails} from "../../../schema/markerSchema";
import {MarkerCreator} from "../MarkerCreator/MarkerCreator";
import {Panel} from "../Panel/Panel";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.localStorage = new LocalStorageMock();

const store = mockStore({
  marker: {
    selectedMarker: "",
    markers: [
      {
        id: 1,
        name: "square",
        icon: "square.png",
        userId: 1
      }, {
        id: 2,
        name: "park",
        icon: "park.png",
        userId: 1
      }, {
        id: 3,
        name: "restaurant",
        icon: "restaurant.png",
        userId: 1
      }
    ]
  },
  mapIndicator: {
    indicators: [],
    isNavSelect: true
  }
});

test("it should render main component with panel and markerCreator child components", () => {

  render(<Provider store={store}>
    <MemoryRouter initialEntries={["/createMarker"]}>
      <Main location={{
          pathname: "/createMarker"
        }}></Main>
    </MemoryRouter>
  </Provider>)

  screen.debug();
})

test("it should add new marker to the panel component", async () => {
  render(<Provider store={store}>
    <MemoryRouter initialEntries={["/createMarker"]}>
      <Main location={{
          pathname: "/createMarker"
        }}></Main>
    </MemoryRouter>
  </Provider>)

  const inputName = screen.getByLabelText("Name");
  //screen.debug(inputName);
  const inputFile = screen.getByTestId("inputFile")
  //screen.debug(inputFile);
  const submitBtn = screen.getByText("Upload new marker");
  //screen.debug(submitBtn);
  global.URL.createObjectURL = jest.fn(() => 'details');

  fireEvent.change(inputName, {
    target: {
      value: "pool"
    }
  })

  fireEvent.change(inputFile, {
    target: {
      files: [new File(['(⌐□_□)'], 'pool.png', {type: 'image/png'})]
    }
  })

  fireEvent.click(submitBtn);

  const markersInPanel = screen.queryAllByTestId("marker");
  //expect(markersInPanel).toHaveLength(4);

  await waitForDomChange();
  screen.debug();
})
