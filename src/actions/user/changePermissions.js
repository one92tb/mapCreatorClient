import axios from 'axios';
import { baseUrl } from '../../baseUrl';

export const CHANGING_PERMISSIONS = 'CHANGING_PERMISSIONS';
export const CHANGED_PERMISSIONS_SUCCESS = 'CHANGED_PERMISSIONS_SUCCESS';
export const CHANGED_PERMISSIONS_ERROR = 'CHANGED_PERMISSIONS_ERROR';

const changePermissionsSuccess = (status) => ({
  type: CHANGED_PERMISSIONS_SUCCESS,
  status
});

const changePermissionsError = (error) => ({
  type: CHANGED_PERMISSIONS_ERROR,
  error
});

export const changePermissions = (status, id) => (dispatch) => {
  dispatch({
    type: CHANGING_PERMISSIONS
  });

  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
    .patch(
      `/api/users/${id}`, {
        isAdmin: status
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    .then((res) => {
      dispatch(changePermissionsSuccess(res.data));
    })
    .catch((error) => {
      dispatch(changePermissionsError(error));
    });
};
