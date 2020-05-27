import {
  axiosInstance
} from "../../axiosInstance";

export const REMOVING_MARKER = "REMOVING_MARKER";
export const REMOVED_MARKER_SUCCESS = "REMOVED_MARKER_SUCCESS";
export const REMOVED_MARKER_ERROR = "REMOVED_MARKER_ERROR";

const removeMarkerSuccess = id => ({
  type: REMOVED_MARKER_SUCCESS,
  id
});

const removeMarkerError = error => ({
  type: REMOVED_MARKER_ERROR,
  error
});

export const removeMarker = id => dispatch => {
  dispatch({
    type: REMOVING_MARKER
  });
  axiosInstance
    .delete(`/markers/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      dispatch(removeMarkerSuccess(res.data.id));
    })
    .catch(error => {
      dispatch(removeMarkerError(error));
    });
};
