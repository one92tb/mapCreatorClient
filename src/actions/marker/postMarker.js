import axios from 'axios';
import { baseUrl } from '../../baseUrl';

export const POSTING_MARKER = 'POSTING_MARKER';
export const POSTED_MARKER_SUCCESS = 'POSTED_MARKER_SUCCESS';
export const POSTED_MARKER_ERROR = 'POSTED_MARKER_ERROR';

const postedMarkerSuccess = (marker) => ({
  type: POSTED_MARKER_SUCCESS,
  marker
});

const postedMarkerError = (error) => ({
  type: POSTED_MARKER_ERROR,
  error
});

export const postMarker = (marker) => (dispatch) => {
  dispatch({
    type: POSTING_MARKER
  });

  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
    .post('/api/markers', marker, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      dispatch(postedMarkerSuccess(res.data));
    })
    .catch((error) => {
      dispatch(postedMarkerError(error));
    });
};
