import * as actions from '../../../actions/marker/disableMarkers';

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

describe('disable markers action', () => {
  it('MARKERS_TO_DISABLE', () => {
    expect(actions.disableMarkers(markers)).toEqual({
      type: actions.MARKERS_TO_DISABLE,
      markers
    });
  });
});
