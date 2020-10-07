import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router';
import LocalStorageMock from '../../../../mocks/localStorageMock';
import { Auth } from '../Auth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.localStorage = new LocalStorageMock();

const store = mockStore({
  mapIndicator: {
    indicators: []
  },
  marker: {
    selectedMarker: '',
    markers: []
  },
  user: {
    users: [],
    error: '',
  },
  account: {
    error: '',
    success: ''
  }
});

test('it should render auth component', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Provider store={store}>
        <Auth />
      </Provider>;;
    </MemoryRouter>
  );
});
