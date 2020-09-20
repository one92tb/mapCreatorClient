import { axiosInstance } from '../../axiosInstance';

export const EDITING_MARKER = 'EDITING_MARKER';
export const EDITED_MARKER_SUCCESS = 'EDITED_MARKER_SUCCESS';
export const EDITED_MARKER_ERROR = 'EDITED_MARKER_ERROR';

const editedMarkerSuccess = (marker) => ({
  type: EDITED_MARKER_SUCCESS,
  marker
});

const editedRecordError = (error) => ({
  type: EDITED_MARKER_ERROR,
  error
});

export const editMarker = (marker, id) => (dispatch) => {
  dispatch({
    type: EDITING_MARKER
  });
  axiosInstance
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
