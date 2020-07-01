import React, {lazy} from "react";
import {RowStyle, ColStyle} from "./style";
import  Panel from "./Panel/Panel";
//import Map from "./Map/Map";
import MarkerCreator from "./MarkerCreator/MarkerCreator";
import {Switch, Route} from "react-router-dom";

RowStyle.displayName = "div";
ColStyle.displayName = "div";

const Map = lazy(() => import("./Map/Map"));

export const routes = [
  {
    path: "/",
    exact: true,
    section: Map
  }, {
    path: "/createMarker",
    section: MarkerCreator
  }
];

export const Main = ({
  ...props
}) => {
  return (<RowStyle>
    <ColStyle pathname={props.location.pathname} lg="3" md="12">
      <Panel {...props}/>
    </ColStyle>
    <ColStyle pathname={props.location.pathname} lg="9" md="12">
      <Switch>
        {routes.map((route, id) => (<Route key={id} path={route.path} exact={route.exact} component={route.section}/>))}
      </Switch>
    </ColStyle>
  </RowStyle>);
}

export default Main;
