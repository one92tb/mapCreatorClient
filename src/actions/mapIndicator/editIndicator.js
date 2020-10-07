import axios from 'axios';
import { baseUrl } from '../../baseUrl';

export const EDITING_INDICATOR = 'EDITING_INDICATOR';
export const EDITED_INDICATOR_SUCCESS = 'EDITED_INDICATOR_SUCCESS';
export const EDITED_INDICATOR_ERROR = 'EDITED_INDICATOR_ERROR';

const editedIndicatorSuccess = (indicator) => ({
  type: EDITED_INDICATOR_SUCCESS,
  indicator
});

const editedIndicatorError = (error) => ({
  type: EDITED_INDICATOR_ERROR,
  error
});

export const editIndicator = (id, propertyName, value) => (dispatch) => {
  dispatch({
    type: EDITING_INDICATOR
  });
  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
    .patch(`/api/indicators/${id}`, {
      [propertyName]: value
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      dispatch(editedIndicatorSuccess(res.data));
    })
    .catch((error) => {
      dispatch(editedIndicatorError(error));
    });
};
