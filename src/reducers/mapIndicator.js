const initialState = {
  indicators: [],
  isNavSelect: true,
  posting: false,
  posted: false,
  fetching: false,
  fetched: false,
  removing: false,
  removed: false,
  editing: false,
  edited: false,
  error: null,
  selectedIndicator: ""
};

const mapIndicator = (state = initialState, action) => {
  switch (action.type) {
    case "IS_SELECT":
      return {
        ...state,
        isNavSelect: action.bool
      };
    case "FETCHING_INDICATORS":
      return {
        ...state,
        fetching: true,
          fetched: false
      };
    case "FETCHED_INDICATORS_SUCCESS":
      return {
        ...state,
        fetching: false,
          fetched: true,
          indicators: action.indicators
      };
    case "FETCHED_INDICATORS_ERROR":
      return {
        ...state,
        fetching: false,
          fetched: false,
          error: action.error
      };
    case "POSTING_INDICATOR":
      return {
        ...state,
        posting: true,
          posted: false
      };
    case "POSTED_INDICATOR_SUCCESS":
      return {
        ...state,
        posting: false,
          posted: true,
          indicators: [...state.indicators, action.indicator]
      };
    case "POSTED_INDICATOR_ERROR":
      return {
        ...state,
        posting: false,
          posted: false,
          error: action.error
      };
    case "REMOVING_INDICATOR":
      return {
        ...state,
        removing: true,
          removed: false
      };
    case "REMOVED_INDICATOR_SUCCESS":
      return {
        ...state,
        removing: false,
          removed: true,
          indicators: state.indicators.filter(
            indicator => indicator.id !== action.id
          )
      };
    case "REMOVED_INDICATOR_ERROR":
      return {
        ...state,
        removing: false,
          removed: false,
          error: action.error
      };
    case "EDITING_INDICATOR":
      return {
        ...state,
        editing: true,
          edited: false
      };
    case "EDITED_INDICATOR_ERROR":
      return {
        ...state,
        editing: false,
          edited: false,
          error: action.error
      };
    case "EDITED_INDICATOR_SUCCESS":
      return {
        ...state,
        editing: false,
          edited: true,
          indicators: state.indicators.map(
            indicator => indicator.id === action.indicator.id ? action.indicator : indicator
          )
      };
    case "GET_SELECTED_INDICATOR":
      return {
        ...state,
        selectedIndicator: action.indicator
      };
    default:
      return state;
  }
};

export {
  initialState,
  mapIndicator
};
