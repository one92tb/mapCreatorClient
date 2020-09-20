import * as actions from './getSelectedMarker';

const marker = {
  id: 1,
  markerName: '1',
  icon: '1.png',
  userId: 1
};

describe('get selected marker action', () => {
  it('GET_SELECTED_MARKER_ACTION', () => {
    expect(actions.getSelectedMarker(marker)).toEqual({
      type: actions.GET_SELECTED_MARKER,
      marker
    });
  });
});
