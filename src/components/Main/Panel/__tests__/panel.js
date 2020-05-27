import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import {Panel} from '../Panel';
import "jest-styled-components";

test("it should render Panel Component", () => {

  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: "/"
    },
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
    ],
    selectedMarker: ""
  }

  render(<Panel {...props}/>)
  const markersInPanel = screen.queryAllByTestId("marker");
  expect(markersInPanel).toHaveLength(3);
});

test("it should successfully change Panel From Select to Filter", () => {

  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: "/"
    },
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
    ],
    selectedMarker: ""
  }

  render(<Panel {...props}/>)

  const SelectLink = screen.getByText("Select marker");
  const FilterLink = screen.getByText("Filter marker");
  fireEvent.click(FilterLink);
  expect(SelectLink).toHaveStyleRule("font-weight", "normal");
  expect(FilterLink).toHaveStyleRule("font-weight", "bold");
});

test("it should always set in the Panel Select when create marker option is selected", () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: "/createMarker"
    },
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
    ],
    selectedMarker: ""
  }

  render(<Panel {...props}/>)

  const SelectLink = screen.getByText("Select marker");
  const FilterLink = screen.getByText("Filter marker");

  fireEvent.click(FilterLink);
  expect(SelectLink).toHaveStyleRule("font-weight", "bold");
  expect(FilterLink).toHaveStyleRule("font-weight", "normal");
})

test("it should select marker when Panel has select navigation", () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: "/createMarker"
    },
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
    ],
    selectedMarker: ""
  }

  render(<Panel {...props}/>)
  const allMarkers = screen.queryAllByTestId("marker");
  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule("background", "#00b8e6");
})

test("it should unselect first marker and select second when Panel has select navigation", () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: "/createMarker"
    },
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
    ],
    selectedMarker: ""
  }

  render(<Panel {...props}/>)
  const allMarkers = screen.queryAllByTestId("marker");
  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule("background", "#00b8e6");
  fireEvent.click(allMarkers[1]);
  expect(allMarkers[0]).toHaveStyleRule("background", "transparent");
  expect(allMarkers[1]).toHaveStyleRule("background", "#00b8e6");
})

test("it should select marker then unselect it when Panel has select navigation", () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: "/createMarker"
    },
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
    ],
    selectedMarker: ""
  }

  render(<Panel {...props}/>)

  const allMarkers = screen.queryAllByTestId("marker");
  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule("background", "#00b8e6");
  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule("background", "transparent");
})

test("it should select first marker when Panel has filter navigation", () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: "/createMarker"
    },
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
    ],
    selectedMarker: ""
  }

  render(<Panel {...props}/>)

  const FilterLink = screen.getByText("Filter marker");
  fireEvent.click(FilterLink);

  const allMarkers = screen.queryAllByTestId("marker");
  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule("background", "#999");
  expect(allMarkers[0]).toHaveStyleRule("opacity", "0.7");
})

test("it should select all markers when Panel has filter navigation", () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: "/createMarker"
    },
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
    ],
    selectedMarker: ""
  }

  render(<Panel {...props}/>)

  const allMarkers = screen.queryAllByTestId("marker");

  const FilterLink = screen.getByText("Filter marker");
  fireEvent.click(FilterLink);

  fireEvent.click(allMarkers[0]);
  fireEvent.click(allMarkers[1]);
  fireEvent.click(allMarkers[2]);

  expect(allMarkers[0]).toHaveStyleRule("background", "#999");
  expect(allMarkers[0]).toHaveStyleRule("opacity", "0.7");
  expect(allMarkers[1]).toHaveStyleRule("background", "#999");
  expect(allMarkers[1]).toHaveStyleRule("opacity", "0.7");
  expect(allMarkers[2]).toHaveStyleRule("background", "#999");
  expect(allMarkers[2]).toHaveStyleRule("opacity", "0.7");
})

test("it should select marker then unselect it when Panel has filter navigation", () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: "/createMarker"
    },
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
    ],
    selectedMarker: ""
  }

  render(<Panel {...props}/>)
  const allMarkers = screen.queryAllByTestId("marker");
  const FilterLink = screen.getByText("Filter marker");
  fireEvent.click(FilterLink);
  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule("background", "#999");
  expect(allMarkers[0]).toHaveStyleRule("opacity", "0.7");
  fireEvent.click(allMarkers[0]);
  expect(allMarkers[1]).toHaveStyleRule("background", "transparent");
  expect(allMarkers[1]).toHaveStyleRule("opacity", "1");
})
