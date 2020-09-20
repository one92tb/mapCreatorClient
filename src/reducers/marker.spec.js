import { marker as reducer, initialState } from './marker';

describe('marker reducer', () => {
  // initial state
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  // post
  it('posting marker', () => {
    expect(reducer(initialState, { type: 'POSTING_MARKER' })).toEqual({
      ...initialState,
      posting: true,
      posted: false
    });
  });

  it('posted marker success', () => {
    expect(
      reducer(initialState, {
        type: 'POSTED_MARKER_SUCCESS',
        marker: {
          id: 1,
          markerName: '1',
          icon: '1.png',
          userId: 1
        }
      })
    ).toEqual({
      ...initialState,
      posted: true,
      posting: false,
      markers: [
        {
          id: 1,
          markerName: '1',
          icon: '1.png',
          userId: 1
        }
      ]
    });

    expect(
      reducer(
        {
          ...initialState,
          markers: [
            {
              id: 1,
              markerName: '1',
              icon: '1.png',
              userId: 1
            }
          ]
        },
        {
          type: 'POSTED_MARKER_SUCCESS',
          marker: {
            id: 2,
            markerName: '2',
            icon: '2.png',
            userId: 1
          }
        }
      )
    ).toEqual({
      ...initialState,
      posted: true,
      posting: false,
      markers: [
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
      ]
    });
  });

  it('posted marker error', () => {
    expect(
      reducer(initialState, {
        type: 'POSTED_MARKER_ERROR',
        error: 'sth goes wrong'
      })
    ).toEqual({
      ...initialState,
      posted: false,
      posting: false,
      error: 'sth goes wrong'
    });
  });
  // fetch
  it('fetching markers', () => {
    expect(reducer(initialState, { type: 'FETCHING_MARKERS' })).toEqual({
      ...initialState,
      fetching: true,
      fetched: false
    });
  });

  it('fetched markers success', () => {
    expect(
      reducer(initialState, {
        type: 'FETCHED_MARKERS_SUCCESS',
        markers: [
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
        ]
      })
    ).toEqual({
      ...initialState,
      fetching: false,
      fetched: true,
      markers: [
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
      ]
    });
  });

  it('fetched marker error', () => {
    expect(
      reducer(initialState, {
        type: 'FETCHED_MARKERS_ERROR',
        error: 'sth goes wrong'
      })
    ).toEqual({
      ...initialState,
      fetching: false,
      fetched: false,
      error: 'sth goes wrong'
    });
  });
  // edit
  it('editng marker', () => {
    expect(reducer(initialState, { type: 'EDITING_MARKER' })).toEqual({
      ...initialState,
      editing: true,
      edited: false
    });
  });

  it('edited marker success', () => {
    expect(
      reducer(
        {
          ...initialState,
          markers: [
            {
              id: 1,
              markerName: '1',
              icon: '1.png',
              userId: 1
            }
          ]
        },
        {
          type: 'EDITED_MARKER_SUCCESS',
          marker: {
            id: 1,
            markerName: '221',
            icon: '1.png',
            userId: 1
          }
        }
      )
    ).toEqual({
      ...initialState,
      edited: true,
      editing: false,
      markers: [
        {
          id: 1,
          markerName: '221',
          icon: '1.png',
          userId: 1
        }
      ]
    });
  });

  it('edited marker error', () => {
    expect(
      reducer(initialState, {
        type: 'EDITED_MARKER_ERROR',
        error: 'sth goes wrong'
      })
    ).toEqual({
      ...initialState,
      edited: false,
      editing: false,
      error: 'sth goes wrong'
    });
  });
  // remove
  it('removing marker', () => {
    expect(
      reducer(initialState, {
        type: 'REMOVING_MARKER'
      })
    ).toEqual({
      ...initialState,
      removing: true,
      removed: false
    });
  });

  it('removed marker success', () => {
    expect(
      reducer(
        {
          ...initialState,
          markers: [
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
          ]
        },
        {
          type: 'REMOVED_MARKER_SUCCESS',
          id: 1
        }
      )
    ).toEqual({
      ...initialState,
      removed: true,
      removing: false,
      markers: [
        {
          id: 2,
          markerName: '2',
          icon: '2.png',
          userId: 1
        }
      ]
    });
  });
  it('removed marker error', () => {
    expect(
      reducer(initialState, {
        type: 'REMOVED_MARKER_ERROR',
        error: 'sth goes wrong'
      })
    ).toEqual({
      ...initialState,
      removed: false,
      removing: false,
      error: 'sth goes wrong'
    });
  });
  // selected
  it('selected marker', () => {
    expect(
      reducer(initialState, {
        type: 'GET_SELECTED_MARKER',
        marker: {
          id: 1,
          markerName: '2',
          icon: '2.png',
          userId: 1
        }
      })
    ).toEqual({
      ...initialState,
      selectedMarker: {
        id: 1,
        markerName: '2',
        icon: '2.png',
        userId: 1
      }
    });
  });
  // disable
  it('markers to disable', () => {
    expect(
      reducer(initialState, {
        type: 'MARKERS_TO_DISABLE',
        markers: [
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
        ]
      })
    ).toEqual({
      ...initialState,
      disableMarkers: [
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
      ]
    });
  });
});
