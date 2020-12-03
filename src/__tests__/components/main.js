import '@testing-library/jest-dom';
import React from 'react';
import {
  render,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LocalStorageMock from '../../mocks/localStorageMock';
// eslint-disable-next-line import/named
import { Main } from '../../components/Main/Main';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.localStorage = new LocalStorageMock();

const store = mockStore({
  marker: {
    selectedMarker: '',
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
    ]
  },
  mapIndicator: {
    indicators: [],
    isNavSelect: true
  }
});

test('it should render main component with panel and markerCreator child components', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/createMarker']}>
        <Main location={{
          pathname: '/createMarker'
        }}
        />
      </MemoryRouter>
    </Provider>
  );
});

/* test('it should add new marker to the panel component', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/createMarker']}>
        <Main location={{
          pathname: '/createMarker'
        }}
        />
      </MemoryRouter>
    </Provider>
  );

  const inputName = screen.getByLabelText('Name');
  const inputFile = screen.getByTestId('inputFile');

  global.URL.createObjectURL = jest.fn(() => 'details');

  fireEvent.change(inputName, {
    target: {
      value: 'pool'
    }
  });

  fireEvent.change(inputFile, {
    target: {
      files: [new File(['(⌐□_□)'], 'pool.png', { type: 'image/png' })]
    }
  });

  await waitForDomChange(Main).then(() => {
    const submitBtn = screen.queryAllByText('upload')[1];
    fireEvent.click(submitBtn);
  });
  const markersInPanel = screen.queryAllByTestId('marker');
  expect(markersInPanel).toHaveLength(13);
});
*/
