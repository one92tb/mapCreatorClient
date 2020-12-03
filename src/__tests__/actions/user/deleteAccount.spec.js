import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../actions/user/deleteAccount';
import LocalStorageMock from '../../../mocks/localStorageMock';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

const id = 3;
const expectedResult = { id };

global.localStorage = new LocalStorageMock();

describe('delete account actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it('DELETED_ACCOUNT_SUCCESS', () => {
    mock
      .onDelete(`/api/users/${id}`)
      .reply(200, expectedResult);
    store.dispatch(actions.deleteAccount(id)).then(() => {
      expect(store.getActions()).toEqual([
        { type: actions.DELETING_ACCOUNT },
        { type: actions.DELETED_ACCOUNT_SUCCESS, id }
      ]);
    });
  });
  it('DELETED_ACCOUNT_ERROR', () => {
    mock.onDelete(`/api/users/${id}`).reply(404);
    store.dispatch(actions.deleteAccount(id)).then(() => {
      expect(store.getActions()[0].type).toEqual(actions.DELETING_ACCOUNT);
      expect(store.getActions()[1].type).toEqual(actions.DELETED_ACCOUNT_ERROR);
    });
  });
});
