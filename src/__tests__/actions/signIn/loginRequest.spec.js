import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../actions/signIn/loginRequest';
import * as redirectAction from '../../../actions/redirect/redirect';
import LocalStorageMock from '../../../../mocks/localStorageMock';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(axios);
const store = mockStore();

const userData = {
  login: 'John',
  password: 'asd123'
};

const expectedResult = {
  error: '',
  isAuthorized: true,
  token: 'abcdef123',
  userName: 'John'
};

global.localStorage = new LocalStorageMock();

describe('login request actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it('LOGIN_SUCCESS', () => {
    mock.onPost('/api/users/login').reply(200, expectedResult);
    store.dispatch(actions.loginRequest(userData)).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actions.LOGIN_REQUEST
        },
        {
          type: actions.LOGIN_SUCCESS,
          userData: expectedResult
        },
        {
          type: redirectAction.REDIRECT,
          pathName: '/'
        }
      ]);
    });
  });

  it('LOGIN_ERROR', () => {
    mock.onPost('http://localhost:8080/login').reply(404);
    store.dispatch(actions.loginRequest(userData)).then(() => {
      expect(store.getActions()[0].type).toEqual(actions.LOGIN_REQUEST);
      expect(store.getActions()[1].type).toEqual(actions.LOGIN_ERROR);
    });
  });
});
