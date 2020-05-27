import React from "react";

import Login from "../Login/Login";
import {Router, Switch, Route} from "react-router-dom";
import {AuthApp} from "./AuthApp/AuthApp";

import history from "../../history";

export const Auth = () => (<Router history={history}>
  <Switch>
    <Route exact={true} path="/login" render={props => <Login {...props}/>}/>
    <AuthApp/>
  </Switch>
</Router>);
