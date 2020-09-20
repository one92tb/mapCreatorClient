import decode from 'jwt-decode';
import { checkAuth } from '../AuthApp';
import LocalStorageMock from '../../../../../mocks/localStorageMock';

jest.mock('jwt-decode', () => jest.fn());

global.localStorage = new LocalStorageMock();

describe('authApp method', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('it should return true when authApp is running', () => {
    localStorage.setItem('token', 'fake_token_user');
    const token = localStorage.getItem('token');

    decode.mockImplementationOnce(() => ({
      exp: new Date().getTime() / 1000 + 1,
      iat: 1575751766,
      userData: {
        isAdmin: true,
        login: 'one92tb',
        userId: 1
      }
    }));

    expect(token).toBe('fake_token_user');
    expect(checkAuth()).toBe(true);
  });

  test('it should return false when authApp is running (without token)', () => {
    decode.mockImplementationOnce(() => ({
      exp: new Date().getTime() / 1000 + 1,
      iat: 1575751766,
      userData: {
        isAdmin: true,
        login: 'one92tb',
        userId: 1
      }
    }));

    expect(checkAuth()).toBe(false);
  });

  test('it should return false when authApp is running (expired time less than Date)', () => {
    decode.mockImplementationOnce(() => ({
      exp: new Date().getTime() / 1000 - 1,
      iat: 1575751766,
      userData: {
        isAdmin: true,
        login: 'one92tb',
        userId: 1
      }
    }));

    expect(checkAuth()).toBe(false);
  });
});
