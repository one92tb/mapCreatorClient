import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Map } from '../Map';
import 'jest-styled-components';

test('it should render map component', async () => {
  const props = {
    fetchIndicators: jest.fn(),
    postIndicator: jest.fn(),
    removeIndicator: jest.fn(),
    indicators: [
      {
        id: 1,
        city: ' 58-573 Piechowice',
        country: 'Polska',
        icon: '1586788206088.png',
        lat: 50.87113971486665,
        lng: 15.596124094238299,
        name: '1231',
        street: 'Bobrowa 6',
        userId: 1
      }, {
        city: 'Jelenia Góra',
        country: 'Polska',
        icon: '1586788206088.png',
        id: 2,
        lat: 50.91520907904416,
        lng: 15.690395694484728,
        name: '1231',
        street: 'Jana III Sobieskiego',
        userId: 1
      }
    ],
    isNavSelect: false,
    selectedMarker: '',
    disableMarkers: [],
    selectedIndicator: ''
  };

  await render(<Map {...props} />);
});
