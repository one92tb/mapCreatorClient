import {
  axiosInstance
} from "../../axiosInstance";

export const REMOVING_INDICATOR = "REMOVING_INDICATOR";
export const REMOVED_INDICATOR_SUCCESS = "REMOVED_INDICATOR_SUCCESS";
export const REMOVED_INDICATOR_ERROR = "REMOVED_INDICATOR_ERROR";

const removeIndicatorSuccess = id => ({
  type: REMOVED_INDICATOR_SUCCESS,
  id
});

const removedIndicatorError = error => ({
  type: REMOVED_INDICATOR_ERROR,
  error
});

export const removeIndicator = id => dispatch => {
  dispatch({
    type: REMOVING_INDICATOR
  });
  axiosInstance
    .delete(`/indicators/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      dispatch(removeIndicatorSuccess(res.data.id));
    })
    .catch(error => {
      dispatch(removedIndicatorError(error));
    });
};
