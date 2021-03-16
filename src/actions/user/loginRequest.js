import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import { redirect } from '../redirect/redirect';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  userData
});

const loginError = (error) => ({
  type: LOGIN_ERROR,
  error
});

export const loginRequest = (userData) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST
  });

  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
    .post('/api/users/login', userData).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.userName);
      dispatch(loginSuccess(res.data));
      dispatch(redirect('/'));
    })
    .catch((error) => {
      dispatch(loginError(error));
    });
};
