import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './fetchIndicators';
import LocalStorageMock from '../../../mocks/localStorageMock';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

const indicators = [
  {
    id: 0,
    name: 'test1',
    icon: '123.png',
    lat: 50.3232,
    lng: 15.3213,
    street: 'street1',
    city: 'city1',
    country: 'country1',
    userId: 1
  },
  {
    id: 1,
    name: 'test2',
    icon: '125.png',
    lat: 52.3232,
    lng: 17.3213,
    street: 'street2',
    city: 'city2',
    country: 'country2',
    userId: 1
  }
];

const expectedResult = indicators;

global.localStorage = new LocalStorageMock();

describe('fetch indicators actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it('FETCHED_INDICATORS_SUCCESS', () => {
    mock.onGet('http://localhost:8080/indicators').reply(200, expectedResult);
    store.dispatch(actions.fetchIndicators()).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actions.FETCHING_INDICATORS
        },
        {
          type: actions.FETCHED_INDICATORS_SUCCESS,
          indicators
        }
      ]);
    });
  });
  it('FETCHED_INDICATORS_ERROR', () => {
    mock.onGet('http://localhost:8080/indicators').reply(404);
    store.dispatch(actions.fetchIndicators()).then(() => {
      expect(store.getActions()[0].type).toEqual(actions.FETCHING_INDICATORS);
      expect(store.getActions()[1].type).toEqual(actions.FETCHED_INDICATORS_ERROR);
    });
  });
});
