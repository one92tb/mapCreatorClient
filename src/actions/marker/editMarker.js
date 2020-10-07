import axios from 'axios';
import { baseUrl } from '../../baseUrl';

export const EDITING_MARKER = 'EDITING_MARKER';
export const EDITED_MARKER_SUCCESS = 'EDITED_MARKER_SUCCESS';
export const EDITED_MARKER_ERROR = 'EDITED_MARKER_ERROR';

export const editedMarkerSuccess = (marker) => ({
  type: EDITED_MARKER_SUCCESS,
  marker
});

export const editedRecordError = (error) => ({
  type: EDITED_MARKER_ERROR,
  error
});

export const editMarker = (marker, id) => (dispatch) => {
  dispatch({
    type: EDITING_MARKER
  });

  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
    .put(`/api/markers/${id}`, marker, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      dispatch(editedMarkerSuccess(res.data));
    })
    .catch((error) => {
      dispatch(editedRecordError(error));
    });
};
