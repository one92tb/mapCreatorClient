import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import decode from 'jwt-decode';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router';
import LocalStorageMock from '../../../../../mocks/localStorageMock';
import { AppComponent, authAdmin } from '../AppComponent';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  user: {
    users: [{
      id: 1,
      login: 'one92tb',
      password: '$2b$10$BrSxFwP1Pt/68ybQ3PlNvunwqgOLLTr64T/CVeErBviovZ8fuvd6y',
      isAdmin: true
    }]
  }
});

global.localStorage = new LocalStorageMock();

jest.mock('jwt-decode', () => jest.fn());

describe('appComponet', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('it should render appComponent', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Provider store={store}>
          <AppComponent />
        </Provider>
      </MemoryRouter>
    );
  });

  test('it should return true when authAdmin is running', () => {
    decode.mockImplementationOnce(() => ({
      exp: new Date().getTime() / 1000 - 1,
      iat: 1575751766,
      userData: {
        isAdmin: true,
        login: 'one92tb',
        userId: 1
      }
    }));
    expect(authAdmin()).toBe(true);
  });

  test('it should return false when authAdmin is running (without token)', () => {
    localStorage.setItem('token', '');

    decode.mockImplementationOnce(() => ({
      exp: new Date().getTime() / 1000 - 1,
      iat: 1575751766,
      userData: {
        isAdmin: true,
        login: 'one92tb',
        userId: 1
      }
    }));

    expect(authAdmin()).toBe(false);
  });

  test('it should return false when authAdmin is running (without token)', () => {
    localStorage.setItem('token', 'fake_token_user');

    decode.mockImplementationOnce(() => ({
      exp: new Date().getTime() / 1000 - 1,
      iat: 1575751766,
      userData: {
        isAdmin: false,
        login: 'one92tb',
        userId: 1
      }
    }));

    expect(authAdmin()).toBe(false);
  });
});
