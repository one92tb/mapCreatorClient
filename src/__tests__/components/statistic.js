import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Statistic } from '../../components/Statistic/Statistic';

test('it should render Statistic component with indicators', () => {
  const props = {
    fetchIndicators: jest.fn(),
    fetchMarkers: jest.fn(),
    markers: [
      {
        id: 1,
        name: 'pool',
        icon: '1588711110630.png',
        userId: 1
      }, {
        id: 17,
        name: 'square',
        icon: '1588711132326.png',
        userId: 1
      }
    ],
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
    ]
  };

  render(<Statistic {...props} />);
});

test('it should render information about lack of indicators', () => {
  const props = {
    fetchIndicators: jest.fn(),
    fetchMarkers: jest.fn(),
    markers: [],
    indicators: []
  };

  render(<Statistic {...props} />);

  expect(screen.getByText('You have not any data to display on the charts')).toBeTruthy();
});
