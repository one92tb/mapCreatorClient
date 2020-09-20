import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { RowStyle, ColStyle } from './style';
import Panel from './Panel/Panel';
import MarkerCreator from './MarkerCreator/MarkerCreator';

RowStyle.displayName = 'div';
ColStyle.displayName = 'div';

const Map = lazy(() => import('./Map/Map'));

export const routes = [
  {
    path: '/',
    exact: true,
    section: Map
  }, {
    path: '/createMarker',
    section: MarkerCreator
  }
];

export const Main = ({
  ...props
}) => {
  const { location } = props;
  return (
    <RowStyle>
      <ColStyle pathname={location.pathname} lg='3' md='12'>
        <Panel {...props} />
      </ColStyle>
      <ColStyle pathname={location.pathname} lg='9' md='12'>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} exact={route.exact} component={route.section} />))}
        </Switch>
      </ColStyle>
    </RowStyle>
  );
};

export default Main;
