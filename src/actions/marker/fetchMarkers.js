import {
  axiosInstance
} from "../../axiosInstance";

export const FETCHING_MARKERS = "FETCHING_MARKERS";
export const FETCHED_MARKERS_SUCCESS = "FETCHED_MARKERS_SUCCESS";
export const FETCHED_MARKERS_ERROR = "FETCHED_MARKERS_ERROR";

const fetchedMarkersSuccess = markers => ({
  type: FETCHED_MARKERS_SUCCESS,
  markers
});

const fetchedMarkersError = error => ({
  type: FETCHED_MARKERS_ERROR,
  error
});

export const fetchMarkers = () => dispatch => {
  dispatch({
    type: FETCHING_MARKERS
  });
  axiosInstance
    .get("/markers", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      dispatch(fetchedMarkersSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchedMarkersError(error));
    });
};
