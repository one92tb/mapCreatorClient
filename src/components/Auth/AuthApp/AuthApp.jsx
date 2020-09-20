import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import decode from 'jwt-decode';
import { AppComponent } from '../AppComponent/AppComponent';

export const checkAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

export const AuthApp = ({ ...rest }) => (
  <Route
    {...rest}
    render={() => (checkAuth()
      ? (<AppComponent />)
      : (<Redirect from='/' exact='exact' to={{ pathname: '/login' }} />))}
  />
);
