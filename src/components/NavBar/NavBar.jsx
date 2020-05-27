import React, {Component} from "react";
import {connect} from "react-redux";
import {isPanelSelect} from "../../actions/isPanelSelect";
import {getSelectedMarker} from "../../actions/marker/getSelectedMarker";
import {logout} from "../../actions/signIn/logout";
import {redirect} from "../../actions/redirect/redirect";
import PropTypes from "prop-types";
import {
  LogoutBtn,
  Header,
  Logo,
  Title,
  User,
  LoginImg,
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
} from "./style";

LogoutBtn.displayName = "button";
Header.displayName = "div";
Logo.displayName = "img";
Title.displayName = "h1";
User.displayName = "div";
LoginImg.displayName = "img";
LoginName.displayName = "span";
Input.displayName = "input";
Nav.displayName = "ul";
NavItem.displayName = "li";
NavLink.displayName = "a";
Icon.displayName = "img";
Label.displayName = "label";
Panel.displayName = "div";
ResponsiveMenu.displayName = "div";
ResponsiveNav.displayName = "div";

const activeClassName = "nav-item-active";

const routes = [
  {
    name: "Map",
    path: "/",
    exact: true,
    icon: "map.png"
  }, {
    name: "Create Marker",
    path: "/createMarker",
    icon: "gps.png"
  }, {
    name: "Statistic",
    path: "/statistic",
    icon: "graph.png"
  }, {
    name: "List",
    path: "/list",
    icon: "list.png"
  }, {
    name: "Users",
    path: "/users",
    icon: "users.png"
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
    this.setState({
      checked: !this.state.checked
    });
  };

  handleNavLink = path => {
    const {isPanelSelect, getSelectedMarker} = this.props;
    this.setState({checked: false});

    getSelectedMarker("");
    if (path === "/createMarker") {
      isPanelSelect(true);
    }
  };

  handleLogOut = () => {
    const {logout, redirect} = this.props;
    logout({userId: "", userName: "", error: "", isAuthorized: false});
    console.log("a");
    localStorage.removeItem("token");
    redirect("/login");
    console.log("b");
  };

  render() {
    return (<Panel>
      <ResponsiveMenu>
        <Header>
          <Logo src={"earth.png"}/>
          <Title className="logoName">mapCreator</Title>
        </Header>
        <Label htmlFor="toggle">&#9776;</Label>
        <Input type="checkbox" id="toggle" onChange={this.handleCheckBox}/>
      </ResponsiveMenu>
      <ResponsiveNav isChecked={this.state.checked}>
        <User>
          <LoginImg src={"user.png"}/>
          <LoginName>UserNick</LoginName>
        </User>
        <LogoutBtn onClick={this.handleLogOut}>Sign out</LogoutBtn>
        <Nav>
          {
            routes.map((route, id) => (<NavItem key={id}>
              <NavLink onClick={() => this.handleNavLink(route.path)} to={route.path} exact={route.exact} activeClassName={activeClassName}>
                <Icon src={route.icon}/> {route.name}
              </NavLink>
            </NavItem>))
          }
        </Nav>
      </ResponsiveNav>
    </Panel>);
  }
}

const mapDispatchToProps = {
  isPanelSelect,
  getSelectedMarker,
  logout,
  redirect
};

export default connect(null, mapDispatchToProps, null, {pure: false})(NavBar);

NavBar.propTypes = {
  isPanelSelect: PropTypes.func.isRequired,
  getSelectedMarker: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};
