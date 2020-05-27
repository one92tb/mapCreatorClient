const initialState = {
  markers: [],
  disableMarkers: [],
  selectedMarker: "",
  posting: false,
  posted: false,
  fetching: false,
  fetched: false,
  erorr: null,
  removing: false,
  removed: false,
  editing: false,
  edited: false
};

const marker = (state = initialState, action) => {
  switch (action.type) {
    case "MARKERS_TO_DISABLE":
      return {
        ...state,
        disableMarkers: action.markers
      };
    case "GET_SELECTED_MARKER":
      return {
        ...state,
        selectedMarker: action.marker
      };
    case "FETCHING_MARKERS":
      return {
        ...state,
        fetching: true,
        fetched: false
      };
    case "FETCHED_MARKERS_SUCCESS":
      return {
        ...state,
        markers: action.markers,
        fetching: false,
        fetched: true
      };
    case "FETCHED_MARKERS_ERROR":
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      };
    case "POSTING_MARKER":
      return {
        ...state,
        posting: true,
        posted: false
      };
    case "POSTED_MARKER_SUCCESS":
      return {
        ...state,
        markers: [...state.markers, action.marker],
        posting: false,
        posted: true
      };
    case "POSTED_MARKER_ERROR":
      return {
        ...state,
        posting: false,
        posted: false,
        error: action.error
      };
    case "REMOVING_MARKER":
      return {
        ...state,
        removing: true,
        removed: false
      };
    case "REMOVED_MARKER_SUCCESS":
      return {
        ...state,
        removing: false,
        removed: true,
        markers: state.markers.filter(marker => marker.id !== action.id)
      };
    case "REMOVED_MARKER_ERROR":
      return {
        ...state,
        removing: false,
        removed: false,
        error: action.error
      };
    case "EDITING_MARKER":
      return {
        ...state,
        editing: true,
        edited: false
      };
    case "EDITED_MARKER_SUCCESS":
      return {
        ...state,
        editing: false,
        edited: true,
        markers: state.markers.map(
          marker => (marker.id === action.marker.id ? action.marker : marker)
        )
      };
    case "EDITED_MARKER_ERROR":
      return {
        ...state,
        editing: false,
        edited: false,
        error: action.error
      };
    default:
      return state;
  }
};

export { marker, initialState };
