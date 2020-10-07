import axios from 'axios';
import { baseUrl } from '../../baseUrl';

export const POSTING_INDICATOR = 'POSTING_INDICATOR';
export const POSTED_INDICATOR_SUCCESS = 'POSTED_INDICATOR_SUCCESS';
export const POSTED_INDICATOR_ERROR = 'POSTED_INDICATOR_ERROR';

const postedIndicatorSuccess = (indicator) => ({
  type: POSTED_INDICATOR_SUCCESS,
  indicator
});

const postedIndicatorError = (error) => ({
  type: POSTED_INDICATOR_ERROR,
  error
});

export const postIndicator = (indicator) => (dispatch) => {
  dispatch({
    type: POSTING_INDICATOR
  });
  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
    .post('/api/indicators', indicator, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      dispatch(postedIndicatorSuccess(res.data));
    })
    .catch((error) => {
      dispatch(postedIndicatorError(error));
    });
};
