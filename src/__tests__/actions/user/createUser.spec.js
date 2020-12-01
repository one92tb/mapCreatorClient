import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../actions/user/createUser';
import LocalStorageMock from '../../../../mocks/localStorageMock';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

global.localStorage = new LocalStorageMock();

const user = {
  login: 'john123',
  password: 'qwerty12'
};

const responseData = {
  id: 3,
  isAdmin: false,
  login: 'john123',
  password: 'asdsagdhdsa21132131sadadas'
};

const expectedResult = responseData;

describe('create user actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it('POSTED_USER_SUCCESS', () => {
    mock.onPost('/api/users').reply(200, expectedResult);
    store.dispatch(actions.createUser(user)).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actions.POSTING_USER
        },
        {
          type: actions.POSTED_USER_SUCCESS,
          user: responseData
        }
      ]);
    });
  });
  it('POSTED_USER_ERROR', () => {
    mock.onPost('/api/users').reply(404);
    store.dispatch(actions.createUser(user)).then(() => {
      expect(store.getActions()[0].type).toEqual(actions.POSTING_USER);
      expect(store.getActions()[1].type).toEqual(actions.POSTED_USER_ERROR);
    });
  });
});
