import axios from 'axios';
import { baseUrl } from '../../baseUrl';

export const FETCHING_USERS = 'FETCHING_USERS';
export const FETCHED_USERS_SUCCESS = 'FETCHED_USERS_SUCCESS';
export const FETCHED_USERS_ERROR = 'FETCHED_USERS_ERROR';

const fetchedUsersSuccess = (users) => ({
  type: FETCHED_USERS_SUCCESS,
  users
});

const fetchedUsersError = (error) => ({
  type: FETCHED_USERS_ERROR,
  error
});

export const fetchUsers = () => (dispatch) => {
  dispatch({
    type: FETCHING_USERS
  });

  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
    .get('/api/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      dispatch(fetchedUsersSuccess(res.data));
    })
    .catch((error) => {
      dispatch(fetchedUsersError(error));
    });
};
