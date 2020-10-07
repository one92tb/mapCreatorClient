import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Panel } from '../Panel';
import 'jest-styled-components';

test('it should render Panel Component', () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: '/'
    },
    markers: [
      {
        id: 1,
        name: 'square',
        icon: 'square.png',
        userId: 1
      }, {
        id: 2,
        name: 'park',
        icon: 'park.png',
        userId: 1
      }, {
        id: 3,
        name: 'restaurant',
        icon: 'restaurant.png',
        userId: 1
      }
    ],
    selectedMarker: ''
  };

  render(<Panel {...props} />);
  const markersInPanel = screen.queryAllByTestId('marker');
  const customMarkers = screen.queryByText('custom markers');
  fireEvent.click(customMarkers);
  expect(markersInPanel).toHaveLength(12);
});

test('it should successfully change Panel From Select to Filter', () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: '/'
    },
    markers: [
      {
        id: 1,
        name: 'square',
        icon: 'square.png',
        userId: 1
      }, {
        id: 2,
        name: 'park',
        icon: 'park.png',
        userId: 1
      }, {
        id: 3,
        name: 'restaurant',
        icon: 'restaurant.png',
        userId: 1
      }
    ],
    selectedMarker: ''
  };

  render(<Panel {...props} />);

  const SelectLink = screen.getByTestId('select-btn');
  const FilterLink = screen.getByTestId('filter-btn');
  fireEvent.click(FilterLink);
  expect(SelectLink).not.toHaveStyleRule('background', '#00b8e6');
  expect(FilterLink).toHaveStyleRule('background', '#00b8e6');
});

test('it should always set in the Panel Select when create marker option is selected', () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: '/createMarker'
    },
    markers: [
      {
        id: 1,
        name: 'square',
        icon: 'square.png',
        userId: 1
      }, {
        id: 2,
        name: 'park',
        icon: 'park.png',
        userId: 1
      }, {
        id: 3,
        name: 'restaurant',
        icon: 'restaurant.png',
        userId: 1
      }
    ],
    selectedMarker: ''
  };

  render(<Panel {...props} />);

  const SelectLink = screen.getByText('select');
  const FilterLink = screen.getByText('filter');

  fireEvent.click(FilterLink);
  expect(SelectLink).toHaveStyleRule('background', '#00b8e6');
  expect(FilterLink).not.toHaveStyleRule('background', '#00b8e6');
});

test('it should select marker when Panel has select navigation', () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: '/map'
    },
    markers: [
      {
        id: 1,
        name: 'square',
        icon: 'square.png',
        userId: 1
      }, {
        id: 2,
        name: 'park',
        icon: 'park.png',
        userId: 1
      }, {
        id: 3,
        name: 'restaurant',
        icon: 'restaurant.png',
        userId: 1
      }
    ],
    selectedMarker: ''
  };

  render(<Panel {...props} />);
  const allMarkers = screen.queryAllByTestId('marker');
  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule('background', '#00b8e6');
});

test('it should unselect first marker and select second when Panel has select navigation', () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: '/map'
    },
    markers: [
      {
        id: 1,
        name: 'square',
        icon: 'square.png',
        userId: 1
      }, {
        id: 2,
        name: 'park',
        icon: 'park.png',
        userId: 1
      }, {
        id: 3,
        name: 'restaurant',
        icon: 'restaurant.png',
        userId: 1
      }
    ],
    selectedMarker: ''
  };

  render(<Panel {...props} />);
  const allMarkers = screen.queryAllByTestId('marker');
  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule('background', '#00b8e6');
  fireEvent.click(allMarkers[1]);
  expect(allMarkers[0]).toHaveStyleRule('background', 'transparent');
  expect(allMarkers[1]).toHaveStyleRule('background', '#00b8e6');
});

test('it should select marker then unselect it when Panel has select navigation', () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: '/map'
    },
    markers: [
      {
        id: 1,
        name: 'square',
        icon: 'square.png',
        userId: 1
      }, {
        id: 2,
        name: 'park',
        icon: 'park.png',
        userId: 1
      }, {
        id: 3,
        name: 'restaurant',
        icon: 'restaurant.png',
        userId: 1
      }
    ],
    selectedMarker: ''
  };

  render(<Panel {...props} />);

  const allMarkers = screen.queryAllByTestId('marker');
  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule('background', '#00b8e6');
  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule('background', 'transparent');
});

test('it should select first marker when Panel has filter navigation', () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: '/map'
    },
    markers: [
      {
        id: 1,
        name: 'square',
        icon: 'square.png',
        userId: 1
      }, {
        id: 2,
        name: 'park',
        icon: 'park.png',
        userId: 1
      }, {
        id: 3,
        name: 'restaurant',
        icon: 'restaurant.png',
        userId: 1
      }
    ],
    selectedMarker: ''
  };

  render(<Panel {...props} />);

  const FilterLink = screen.getByTestId('filter-btn');
  fireEvent.click(FilterLink);

  const allMarkers = screen.queryAllByTestId('marker');
  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule('background', '#999');
  expect(allMarkers[0]).toHaveStyleRule('opacity', '0.7');
});

test('it should select all markers when Panel has filter navigation', () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: '/map'
    },
    markers: [
      {
        id: 1,
        name: 'square',
        icon: 'square.png',
        userId: 1
      }, {
        id: 2,
        name: 'park',
        icon: 'park.png',
        userId: 1
      }, {
        id: 3,
        name: 'restaurant',
        icon: 'restaurant.png',
        userId: 1
      }
    ],
    selectedMarker: ''
  };

  render(<Panel {...props} />);

  const allMarkers = screen.queryAllByTestId('marker');

  const FilterLink = screen.getByTestId('filter-btn');
  fireEvent.click(FilterLink);

  const customMarkers = screen.queryByText('custom markers');
  fireEvent.click(customMarkers);

  fireEvent.click(allMarkers[0]);
  fireEvent.click(allMarkers[1]);
  fireEvent.click(allMarkers[2]);

  expect(allMarkers[0]).toHaveStyleRule('background', '#999');
  expect(allMarkers[0]).toHaveStyleRule('opacity', '0.7');
  expect(allMarkers[1]).toHaveStyleRule('background', '#999');
  expect(allMarkers[1]).toHaveStyleRule('opacity', '0.7');
  expect(allMarkers[2]).toHaveStyleRule('background', '#999');
  expect(allMarkers[2]).toHaveStyleRule('opacity', '0.7');
});

test('it should select marker then unselect it when Panel has filter navigation', () => {
  const props = {
    isPanelSelect: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedMarker: jest.fn(),
    disableMarkers: jest.fn(),
    location: {
      pathname: '/'
    },
    markers: [
      {
        id: 1,
        name: 'square',
        icon: 'square.png',
        userId: 1
      }, {
        id: 2,
        name: 'park',
        icon: 'park.png',
        userId: 1
      }, {
        id: 3,
        name: 'restaurant',
        icon: 'restaurant.png',
        userId: 1
      }
    ],
    selectedMarker: ''
  };

  render(<Panel {...props} />);
  const allMarkers = screen.queryAllByTestId('marker');
  const FilterLink = screen.getByTestId('filter-btn');
  fireEvent.click(FilterLink);

  const customMarkers = screen.queryByText('custom markers');
  fireEvent.click(customMarkers);

  fireEvent.click(allMarkers[10]);

  expect(allMarkers[10]).toHaveStyleRule('background', '#999');
  expect(allMarkers[10]).toHaveStyleRule('opacity', '0.7');
  fireEvent.click(allMarkers[10]);
  expect(allMarkers[10]).toHaveStyleRule('background', 'transparent');
  expect(allMarkers[10]).toHaveStyleRule('opacity', '1');
});
