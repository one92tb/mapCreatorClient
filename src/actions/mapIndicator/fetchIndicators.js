import {
  axiosInstance
} from "../../axiosInstance";
export const FETCHING_INDICATORS = "FETCHING_INDICATORS";
export const FETCHED_INDICATORS_SUCCESS = "FETCHED_INDICATORS_SUCCESS";
export const FETCHED_INDICATORS_ERROR = "FETCHED_INDICATORS_ERROR";

const fetchedIndicators = indicators => ({
  type: FETCHED_INDICATORS_SUCCESS,
  indicators
});

const fetchedIndicatorsError = error => ({
  type: FETCHED_INDICATORS_ERROR,
  error
});

export const fetchIndicators = () => dispatch => {
  dispatch({
    type: FETCHING_INDICATORS
  });
  axiosInstance
    .get("/api/indicators", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      dispatch(fetchedIndicators(res.data));
    })
    .catch(error => {
      dispatch(fetchedIndicatorsError(error));
    });
};
