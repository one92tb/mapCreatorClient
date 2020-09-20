import React, { lazy } from 'react';
import decode from 'jwt-decode';
import { Switch, Route } from 'react-router-dom';
import NoAuthorization from '../../NoAuthorization/NoAuthorization';
import Users from '../../Users/Users';
import Main from '../../Main/Main';
import NavBar from '../../NavBar/NavBar';
import List from '../../List/List';
import { ContainerStyle, RowStyle, ColStyle } from '../style';

const Statistic = lazy(() => import('../../Statistic/Statistic'));

export const authAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const { userData } = decode(token);
    if (userData.isAdmin === false) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

export const AppComponent = () => (
  <ContainerStyle fluid>
    <RowStyle>
      <ColStyle lg='12' xl='2'>
        <NavBar />
      </ColStyle>
      <ColStyle lg='12' xl='10'>
        <Switch>
          <Route path='/' exact={true} component={Main} />
          <Route path='/createMarker' component={Main} />
          <Route path='/statistic' component={Statistic} />
          <Route path='/list' component={List} />
          <Route render={() => (
            authAdmin()
              ? <Users />
              : <NoAuthorization />)}
          />
        </Switch>
      </ColStyle>
    </RowStyle>
  </ContainerStyle>
);
