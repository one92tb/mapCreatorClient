import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './fetchUsers';
import LocalStorageMock from '../../../mocks/localStorageMock';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

const users = [
  {
    id: 1,
    isAdmin: true,
    login: 'test1',
    password: 'dsadsa213123'
  },
  {
    id: 2,
    isAdmin: false,
    login: 'test2',
    password: 'sdahads23123'
  }
];

const expectedResult = users;

global.localStorage = new LocalStorageMock();

describe('fetch users actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it('FETCHED_USERS_SUCCESS', () => {
    mock.onGet('http://localhost:8080/users').reply(200, expectedResult);
    store.dispatch(actions.fetchUsers()).then(() => {
      expect(store.getActions()).toEqual([
        { type: actions.FETCHING_USERS },
        { type: actions.FETCHED_USERS_SUCCESS, users }
      ]);
    });
  });

  it('FETCHED_USERS_ERROR', () => {
    mock.onGet('http://localhost:8080/users').reply(404);
    store.dispatch(actions.fetchUsers()).then(() => {
      expect(store.getActions()[0].type).toEqual(actions.FETCHING_USERS);
      expect(store.getActions()[1].type).toEqual(actions.FETCHED_USERS_ERROR);
    });
  });
});
