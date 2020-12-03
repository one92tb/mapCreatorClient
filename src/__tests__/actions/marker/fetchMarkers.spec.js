import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../actions/marker/fetchMarkers';
import LocalStorageMock from '../../../mocks/localStorageMock';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
const mock = new MockAdapter(axios);

const markers = [
  {
    id: 1,
    markerName: '1',
    icon: '1.png',
    userId: 1
  },
  {
    id: 2,
    markerName: '2',
    icon: '2.png',
    userId: 1
  }
];
const expectedResult = markers;

global.localStorage = new LocalStorageMock();

describe('fetcht markers actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it('FETCHED_MARKERS_SUCCESS', () => {
    mock.onGet('/api/markers').reply(200, expectedResult);
    store.dispatch(actions.fetchMarkers()).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actions.FETCHING_MARKERS
        },
        {
          type: actions.FETCHED_MARKERS_SUCCESS,
          markers
        }
      ]);
    });
  });

  it('FETCHED_MARKERS_ERROR', () => {
    mock.onGet(`markers/${1}`).reply(404);
    store.dispatch(actions.fetchMarkers()).then(() => {
      expect(store.getActions()[0].type).toEqual(actions.FETCHING_MARKERS);
      expect(store.getActions()[1].type).toEqual(actions.FETCHED_MARKERS_ERROR);
    });
  });
});
