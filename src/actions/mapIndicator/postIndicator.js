import {
  axiosInstance
} from "../../axiosInstance";

export const POSTING_INDICATOR = "POSTING_INDICATOR";
export const POSTED_INDICATOR_SUCCESS = "POSTED_INDICATOR_SUCCESS";
export const POSTED_INDICATOR_ERROR = "POSTED_INDICATOR_ERROR";

const postedIndicatorSuccess = indicator => ({
  type: POSTED_INDICATOR_SUCCESS,
  indicator
});

const postedIndicatorError = error => ({
  type: POSTED_INDICATOR_ERROR,
  error
});

export const postIndicator = indicator => dispatch => {
  dispatch({
    type: POSTING_INDICATOR
  });
  axiosInstance
    .post("/indicators", indicator, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      dispatch(postedIndicatorSuccess(res.data));
    })
    .catch(error => {
      dispatch(postedIndicatorError(error));
    });
};
