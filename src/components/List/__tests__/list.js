import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { List } from '../List';

test('it should render list component with all indicators', () => {
  const props = {
    fetchIndicators: jest.fn(),
    fetchMarkers: jest.fn(),
    redirect: jest.fn(),
    getSelectedIndicator: jest.fn(),
    indicators: [
      {
        id: 1,
        name: 'pool',
        icon: '1588711110630.png',
        lat: 50.896590258297806,
        lng: 15.725213449707049,
        street: 'Daszyńskiego 12',
        city: '58-513 Dziwiszów',
        country: 'Polska',
        userId: 1
      }, {
        id: 2,
        name: 'pool',
        icon: '1588711110630.png',
        lat: 50.910879785233185,
        lng: 15.73242322753908,
        street: 'Lwówecka 2',
        city: '58-500 Jelenia Góra',
        country: 'Polska',
        userId: 1
      }, {
        id: 3,
        name: 'pool',
        icon: '1588711110630.png',
        lat: 50.89875562005776,
        lng: 15.701180856933611,
        street: 'Unnamed Road',
        city: '58-500 Jelenia Góra',
        country: 'Polska',
        userId: 1
      }, {
        id: 4,
        name: 'square',
        icon: '1588711132326.png',
        lat: 50.91174567621248,
        lng: 15.759545725097674,
        street: 'Stanisława Moniuszki 10',
        city: '58-500 Jelenia Góra',
        country: ' Polska',
        userId: 1
      }
    ],
    markers: [
      {
        id: 16,
        name: 'pool',
        icon: '1588711110630.png',
        userId: 1
      }, {
        id: 17,
        name: 'square',
        icon: '1588711132326.png',
        userId: 1
      }
    ]
  };

  render(<List {...props} />);

  const indicators = screen.getAllByTestId('indicator');
  expect(indicators).toHaveLength(4);
});

test('it should show only pool indicators', () => {
  const props = {
    fetchIndicators: jest.fn(),
    fetchMarkers: jest.fn(),
    redirect: jest.fn(),
    getSelectedIndicator: jest.fn(),
    indicators: [
      {
        id: 1,
        name: 'pool',
        icon: '1588711110630.png',
        lat: 50.896590258297806,
        lng: 15.725213449707049,
        street: 'Daszyńskiego 12',
        city: '58-513 Dziwiszów',
        country: 'Polska',
        userId: 1
      }, {
        id: 2,
        name: 'pool',
        icon: '1588711110630.png',
        lat: 50.910879785233185,
        lng: 15.73242322753908,
        street: 'Lwówecka 2',
        city: '58-500 Jelenia Góra',
        country: 'Polska',
        userId: 1
      }, {
        id: 3,
        name: 'pool',
        icon: '1588711110630.png',
        lat: 50.89875562005776,
        lng: 15.701180856933611,
        street: 'Unnamed Road',
        city: '58-500 Jelenia Góra',
        country: ' Polska',
        userId: 1
      }, {
        id: 4,
        name: 'square',
        icon: '1588711132326.png',
        lat: 50.91174567621248,
        lng: 15.759545725097674,
        street: 'Stanisława Moniuszki 10',
        city: '58-500 Jelenia Góra',
        country: 'Polska',
        userId: 1
      }
    ],
    markers: [
      {
        id: 16,
        name: 'pool',
        icon: '1588711110630.png',
        userId: 1
      }, {
        id: 17,
        name: 'square',
        icon: '1588711132326.png',
        userId: 1
      }
    ]
  };

  render(<List {...props} />);

  fireEvent.change(screen.getByTestId('select'), {
    target: {
      value: 'pool'
    }
  });

  const indicators = screen.getAllByTestId('indicator');
  expect(indicators).toHaveLength(3);
});

test('it should show only indicators from Jelenia Góra', () => {
  const props = {
    fetchIndicators: jest.fn(),
    fetchMarkers: jest.fn(),
    redirect: jest.fn(),
    getSelectedIndicator: jest.fn(),
    indicators: [
      {
        id: 1,
        name: 'pool',
        icon: '1588711110630.png',
        lat: 50.896590258297806,
        lng: 15.725213449707049,
        street: 'Daszyńskiego 12',
        city: '58-513 Dziwiszów',
        country: 'Polska',
        userId: 1
      }, {
        id: 2,
        name: 'pool',
        icon: '1588711110630.png',
        lat: 50.910879785233185,
        lng: 15.73242322753908,
        street: 'Lwówecka 2',
        city: '58-500 Jelenia Góra',
        country: 'Polska',
        userId: 1
      }, {
        id: 3,
        name: 'pool',
        icon: '1588711110630.png',
        lat: 50.89875562005776,
        lng: 15.701180856933611,
        street: 'Unnamed Road',
        city: '58-500 Jelenia Góra',
        country: 'Polska',
        userId: 1
      }, {
        id: 4,
        name: 'square',
        icon: '1588711132326.png',
        lat: 50.91174567621248,
        lng: 15.759545725097674,
        street: 'Stanisława Moniuszki 10',
        city: '58-500 Jelenia Góra',
        country: 'Polska',
        userId: 1
      }
    ],
    markers: [
      {
        id: 16,
        name: 'pool',
        icon: '1588711110630.png',
        userId: 1
      }, {
        id: 17,
        name: 'square',
        icon: '1588711132326.png',
        userId: 1
      }
    ]
  };

  render(<List {...props} />);

  const inputCity = screen.getByPlaceholderText('search city');

  fireEvent.change(inputCity, {
    target: {
      value: 'Dziwiszów'
    }
  });

  const indicators = screen.getAllByTestId('indicator');
  expect(indicators).toHaveLength(1);
});

test('it should show only pool indicators from Jelenia Góra', () => {
  const props = {
    fetchIndicators: jest.fn(),
    fetchMarkers: jest.fn(),
    redirect: jest.fn(),
    getSelectedIndicator: jest.fn(),
    indicators: [
      {
        id: 1,
        name: 'pool',
        icon: '1588711110630.png',
        lat: 50.896590258297806,
        lng: 15.725213449707049,
        street: 'Daszyńskiego 12',
        city: '58-513 Dziwiszów',
        country: 'Polska',
        userId: 1
      }, {
        id: 2,
        name: 'pool',
        icon: '1588711110630.png',
        lat: 50.910879785233185,
        lng: 15.73242322753908,
        street: 'Lwówecka 2',
        city: '58-500 Jelenia Góra',
        country: 'Polska',
        userId: 1
      }, {
        id: 3,
        name: 'pool',
        icon: '1588711110630.png',
        lat: 50.89875562005776,
        lng: 15.701180856933611,
        street: 'Unnamed Road',
        city: '58-500 Jelenia Góra',
        country: 'Polska',
        userId: 1
      }, {
        id: 4,
        name: 'square',
        icon: '1588711132326.png',
        lat: 50.91174567621248,
        lng: 15.759545725097674,
        street: 'Stanisława Moniuszki 10',
        city: '58-500 Jelenia Góra',
        country: 'Polska',
        userId: 1
      }
    ],
    markers: [
      {
        id: 16,
        name: 'pool',
        icon: '1588711110630.png',
        userId: 1
      }, {
        id: 17,
        name: 'square',
        icon: '1588711132326.png',
        userId: 1
      }
    ]
  };

  render(<List {...props} />);

  const inputCity = screen.getByPlaceholderText('search city');

  fireEvent.change(inputCity, {
    target: {
      value: 'Jelenia'
    }
  });

  fireEvent.change(screen.getByTestId('select'), {
    target: {
      value: 'pool'
    }
  });

  const indicators = screen.getAllByTestId('indicator');
  expect(indicators).toHaveLength(2);
});

test('it should start redirect to the map with indicator data', () => {
  const redirect = jest.fn();
  const props = {
    fetchIndicators: jest.fn(),
    fetchMarkers: jest.fn(),
    getSelectedIndicator: jest.fn(),
    redirect: jest.fn(),
    indicators: [
      {
        id: 1,
        name: 'pool',
        icon: '1588711110630.png',
        lat: 50.896590258297806,
        lng: 15.725213449707049,
        street: 'Daszyńskiego 12',
        city: '58-513 Dziwiszów',
        country: ' Polska',
        userId: 1
      }, {
        id: 2,
        name: 'pool',
        icon: '1588711110630.png',
        lat: 50.910879785233185,
        lng: 15.73242322753908,
        street: 'Lwówecka 2',
        city: '58-500 Jelenia Góra',
        country: 'Polska',
        userId: 1
      }, {
        id: 3,
        name: 'pool',
        icon: '1588711110630.png',
        lat: 50.89875562005776,
        lng: 15.701180856933611,
        street: 'Unnamed Road',
        city: '58-500 Jelenia Góra',
        country: 'Polska',
        userId: 1
      }, {
        id: 4,
        name: 'square',
        icon: '1588711132326.png',
        lat: 50.91174567621248,
        lng: 15.759545725097674,
        street: 'Stanisława Moniuszki 10',
        city: '58-500 Jelenia Góra',
        country: 'Polska',
        userId: 1
      }
    ],
    markers: [
      {
        id: 16,
        name: 'pool',
        icon: '1588711110630.png',
        userId: 1
      }, {
        id: 17,
        name: 'square',
        icon: '1588711132326.png',
        userId: 1
      }
    ]
  };

  render(<List {...props} />);

  const indicatorLinks = screen.getAllByTestId('findIndicator');
  fireEvent.click(indicatorLinks[0]);

  expect(props.getSelectedIndicator).toHaveBeenCalledTimes(1);
  expect(props.getSelectedIndicator).toHaveBeenCalledWith({
    id: 1,
    name: 'pool',
    icon: '1588711110630.png',
    lat: 50.896590258297806,
    lng: 15.725213449707049,
    street: 'Daszyńskiego 12',
    city: '58-513 Dziwiszów',
    country: 'Polska',
    userId: 1
  });
  expect(redirect).toHaveBeenCalledTimes(1);
  expect(redirect).toHaveBeenCalledWith('/');
});
