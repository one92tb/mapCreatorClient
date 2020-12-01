import React, { Suspense, lazy } from 'react';
import history from './history';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { authUser } from './identity/authUser';
import { authAdmin } from './identity/authAdmin';
import Login from './components/Login/Login.jsx';
import Users from './components/Users/Users';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';
import List from './components/List/List';
import NoAuthorization from './components/NoAuthorization/NoAuthorization';
import { ContainerStyle, RowStyle, ColStyle } from './style';

const Statistic = lazy(() => import('./components/Statistic/Statistic'));

const App = () => (
  <Router history={history}>
    <Suspense fallback={<div> Loading ...</div>}>
      <Switch>
        <Route exact path='/login' render={(props) => <Login {...props} />} />
        <Route render={() => (authUser()
          ? (
            <ContainerStyle fluid>
                <RowStyle>
                  <ColStyle lg='12' xl='2'>
                    <NavBar />
                  </ColStyle>
                  <ColStyle lg='12' xl='10'>
                    <Switch>
                      <Route path='/' exact component={Main} />
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
          )
          : (<Redirect from='/' exact='exact' to={{ pathname: '/login' }} />))}
        />
      </Switch>
    </Suspense>
  </Router>
);

export default App;

