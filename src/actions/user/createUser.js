import axios from 'axios';
import { baseUrl } from '../../baseUrl';

export const POSTING_USER = 'POSTING_USER';
export const POSTED_USER_SUCCESS = 'POSTED_USER_SUCCESS';
export const POSTED_USER_ERROR = 'POSTED_USER_ERROR';

const createUserSuccess = (user) => ({
  type: POSTED_USER_SUCCESS,
  user
});

const createdUserError = (error) => ({
  type: POSTED_USER_ERROR,
  error
});

export const createUser = (user) => (dispatch) => {
  dispatch({
    type: POSTING_USER
  });

  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
    .post('/api/users', user)
    .then((res) => {
      dispatch(createUserSuccess(res.data));
    })
    .catch((error) => {
      dispatch(createdUserError(error));
    });
};
