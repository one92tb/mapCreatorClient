import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../actions/marker/removeMarker';
import LocalStorageMock from '../../../../mocks/localStorageMock';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

const id = 1;
const expectedResult = { id };

global.localStorage = new LocalStorageMock();

describe('remove marker actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it('REMOVED_MARKER_SUCCESS', () => {
    mock.onDelete(`/api/markers/${id}`).reply(200, expectedResult);
    store.dispatch(actions.removeMarker(id)).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actions.REMOVING_MARKER
        },
        {
          type: actions.REMOVED_MARKER_SUCCESS,
          id
        }
      ]);
    });
  });

  it('REMOVED_MARKER_ERROR', () => {
    mock.onDelete(`/api/markers/${id}`).reply(404);
    store.dispatch(actions.removeMarker(1)).then(() => {
      expect(store.getActions()[0].type).toEqual(actions.REMOVING_MARKER);
      expect(store.getActions()[1].type).toEqual(actions.REMOVED_MARKER_ERROR);
    });
  });
});
