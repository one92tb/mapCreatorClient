import axios from 'axios';
import { baseUrl } from '../../baseUrl';

export const FETCHING_INDICATORS = 'FETCHING_INDICATORS';
export const FETCHED_INDICATORS_SUCCESS = 'FETCHED_INDICATORS_SUCCESS';
export const FETCHED_INDICATORS_ERROR = 'FETCHED_INDICATORS_ERROR';

const fetchedIndicators = (indicators) => ({
  type: FETCHED_INDICATORS_SUCCESS,
  indicators
});

const fetchedIndicatorsError = (error) => ({
  type: FETCHED_INDICATORS_ERROR,
  error
});

export const fetchIndicators = () => (dispatch) => {
  dispatch({
    type: FETCHING_INDICATORS
  });
  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
    .get('/api/indicators', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      dispatch(fetchedIndicators(res.data));
    })
    .catch((error) => {
      dispatch(fetchedIndicatorsError(error));
    });
};
