import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../actions/mapIndicator/postIndicator';
import LocalStorageMock from '../../../../mocks/localStorageMock';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

const indicator = {
  id: 1,
  name: 'test1',
  icon: '123.png',
  lat: 50.3232,
  lng: 15.3213,
  street: 'street1',
  city: 'city1',
  country: 'country1',
  userId: 1
};

const expectedResult = indicator;

global.localStorage = new LocalStorageMock();

describe('post indicator actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it('POSTED_INDICATOR_SUCCESS', () => {
    mock.onPost('/api/indicators').reply(200, expectedResult);
    store.dispatch(actions.postIndicator(indicator)).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actions.POSTING_INDICATOR
        },
        {
          type: actions.POSTED_INDICATOR_SUCCESS,
          indicator
        }
      ]);
    });
  });

  it('POSTED_INDICATOR_ERROR', () => {
    mock.onPost('/api/indicators').reply(404);
    store.dispatch(actions.postIndicator(indicator)).then(() => {
      expect(store.getActions()[0].type).toEqual(actions.POSTING_INDICATOR);
      expect(store.getActions()[1].type).toEqual(actions.POSTED_INDICATOR_ERROR);
    });
  });
});
