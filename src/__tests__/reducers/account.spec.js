import { initialState, account as reducer } from '../../reducers/account';

describe('account reducer', () => {
  // initialstate
  it('should be the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  // login
  it('login request', () => {
    expect(reducer(initialState, { type: 'LOGIN_REQUEST' })).toEqual({
      ...initialState,
      isLoggingIn: true,
      isAuthorized: false
    });
  });
  it('login success', () => {
    expect(
      reducer(initialState, {
        type: 'LOGIN_SUCCESS',
        userData: {
          error: '',
          isAuthorized: true,
          token: 'asd123',
          userId: 1,
          userName: 'test1'
        }
      })
    ).toEqual({
      ...initialState,
      userName: 'test1',
      isAuthorized: true,
      userId: 1
    });
  });
  it('login error', () => {
    expect(
      reducer(initialState, {
        type: 'LOGIN_ERROR',
        error: 'sth goes wrong'
      })
    ).toEqual({
      ...initialState,
      error: 'sth goes wrong'
    });
  });
  // logout
  it('logout', () => {
    expect(
      reducer(initialState, {
        type: 'LOGOUT',
        userData: {
          userId: '',
          userName: '',
          error: '',
          isAuthorized: false
        }
      })
    ).toEqual({
      ...initialState,
      userId: '',
      userName: '',
      error: '',
      isAuthorized: false
    });
  });
  // reset login error
  it('reset login error', () => {
    expect(reducer(initialState, { type: 'RESET_LOGIN_ERROR' })).toEqual({
      ...initialState,
      error: null
    });
  });
});
