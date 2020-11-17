import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isPanelSelect } from '../../actions/isPanelSelect';
import { getSelectedMarker } from '../../actions/marker/getSelectedMarker';
import { logout } from '../../actions/signIn/logout';
import { redirect } from '../../actions/redirect/redirect';
import { disableMarkers } from '../../actions/marker/disableMarkers';

import {
  LogoutBtn,
  Header,
  Logo,
  Title,
  User,
  LoginName,
  Input,
  Nav,
  NavItem,
  NavLink,
  Icon,
  Label,
  Panel,
  ResponsiveMenu,
  ResponsiveNav
} from './style';

LogoutBtn.displayName = 'button';
Header.displayName = 'div';
Logo.displayName = 'img';
Title.displayName = 'h1';
User.displayName = 'div';
LoginName.displayName = 'span';
Input.displayName = 'input';
Nav.displayName = 'ul';
NavItem.displayName = 'li';
NavLink.displayName = 'a';
Icon.displayName = 'img';
Label.displayName = 'label';
Panel.displayName = 'div';
ResponsiveMenu.displayName = 'div';
ResponsiveNav.displayName = 'div';

const activeClassName = 'nav-item-active';

const routes = [
  {
    name: 'Map',
    path: '/',
    exact: true,
    icon: 'img/map.png'
  }, {
    name: 'Create Marker',
    path: '/createMarker',
    icon: 'img/gps.png'
  }, {
    name: 'Statistic',
    path: '/statistic',
    icon: 'img/graph.png'
  }, {
    name: 'List',
    path: '/list',
    icon: 'img/list.png'
  }, {
    name: 'Users',
    path: '/users',
    icon: 'img/users.png'
  }
];

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  handleCheckBox = () => {
    const { checked } = this.state;
    this.setState({
      checked: !checked
    });
  };

  handleNavLink = (path) => {
    const { isPanelSelect, getSelectedMarker, disableMarkers } = this.props;
    this.setState({ checked: false });

    getSelectedMarker('');
    disableMarkers([]);

    if (path === '/createMarker') {
      isPanelSelect(true);
    }
  };

  handleLogOut = () => {
    const { logout, redirect } = this.props;
    logout({
      userId: '',
      userName: '',
      error: '',
      isAuthorized: false
    });
    localStorage.removeItem('token');
    redirect('/login');
  };

  render() {
    const { userName } = this.props;
    const { checked } = this.state;
    return (
      <Panel>
        <ResponsiveMenu>
          <Header>
            <Title>mapCreator</Title>
          </Header>
          <Label htmlFor='toggle'>&#9776;</Label>
          <Input type='checkbox' id='toggle' onChange={this.handleCheckBox} />
        </ResponsiveMenu>
        <ResponsiveNav isChecked={checked}>
          <User>
            <Logo src='img/logo4.png' />
            <LoginName>
              user: {userName}
            </LoginName>
          </User>
          <LogoutBtn onClick={this.handleLogOut}>Sign out</LogoutBtn>
          <Nav>
            {
            routes.map((route) => (
              <NavItem key={route.name}>
                <NavLink
                  onClick={() => this.handleNavLink(route.path)}
                  to={route.path}
                  exact={route.exact}
                  activeClassName={activeClassName}
                >
                  <Icon src={route.icon} />
                  {route.name}
                </NavLink>
              </NavItem>
            ))
          }
          </Nav>
        </ResponsiveNav>
      </Panel>
    );
  }
}

const mapStateToProps = (state) => ({ userName: state.account.userName });

const mapDispatchToProps = {
  isPanelSelect,
  getSelectedMarker,
  logout,
  redirect,
  disableMarkers
};

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(NavBar);

NavBar.propTypes = {
  isPanelSelect: PropTypes.func.isRequired,
  getSelectedMarker: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};
