import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

const activeClassName = 'nav-item-active';

const Panel = styled.div`
  height: 100%;
  background: #4ddbff;

  @media only screen and (max-width: 1199px) {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }
`;

const Header = styled.div`
  display: flex;
  padding-top: 30px;
  margin-bottom: 50px;
  justify-content: center;

  @media (max-width: 1199px) {
    justify-content: flex-start;
    width: 100%;
    margin-left: 30px;
    margin-bottom: 0;
    padding-top: 10px;
    align-items: center;
    padding: 0;
  }

  @media only screen and (max-width: 575.98px) {
    margin-left: 20px;
  }

  @media only screen and (max-width: 350px) {
    margin-left: 10px;
  }
`;

const Title = styled.h1`
  font-size: 26px;
  font-family: 'Lobster', cursive;
  display: flex;
  align-items: center;

  @media (max-width: 1199px) {
    margin: 0;
  }

  @media only screen and (max-width: 575.98px) {
    font-size: 20px;
  }

  @media only screen and (max-width: 350px) {
    font-size: 14px;
  }
`;

const User = styled.div``;

const Logo = styled.img`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 130px;
  height: 130px;

  @media only screen and (max-width: 575.98px) {
    width: 80px;
    height: 80px;
  }
`;
const LoginName = styled.span`
  display: block;
  text-align: center;
  margin-top: 35px;
  font-weight: bold;

  @media only screen and (max-width: 575.98px) {
    font-size: 12px;
  }
`;

const Label = styled.label`
  display: none;

  @media only screen and (max-width: 1199px) {
    display: flex;
    cursor: pointer;
    font-size: 30px;
    justify-content: flex-end;
    align-items: center;
    margin: 0 30px 0 0;
  }

  @media only screen and (max-width: 575.98px) {
    font-size: 20px;
    margin: 0 20px 0 0;
  }

  @media only screen and (max-width: 350px) {
    font-size: 15px;
    margin: 0 10px 0 0;
  }
`;

const Nav = styled.ul`
  margin-top: 60px;
  padding-left: 0;

  @media only screen and (max-width: 1199px) {
    margin: 0;
    text-align: center;
  }
`;

const Input = styled.input`
  display: none;
`;

const NavItem = styled.li`
  list-style-type: none;
  margin: 5px 0;
  height: 50px;
  display: flex;
  align-items: center;
  width: 90%
  margin-left: auto;
  margin-right: auto;
  transition: background-color 1s ease;

  &:hover{
    background: #00b8e6;
  }

  @media only screen and (max-width: 1199px) {
    border-bottom: 1px solid #00b8e6;
    width: 100%;
    margin: 0;
  }
`;

const NavLink = styled(Link).attrs({ activeClassName })`
  color: #000;
  font-size: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-radius: 5px;
  color: #000;

  &:hover {
    text-decoration-line: none;
    color: #000;
  }

  &.${activeClassName} {
    background: #00b8e6;
  }

  @media only screen and (max-width: 1199px) {
    border-radius: 0;
  }

  @media only screen and (max-width: 575.98px) {
    font-size: 14px;
  }
`;

const Icon = styled.img`
  margin-right: 5px;
  width: 32px;
  height: 32px;

  @media only screen and (max-width: 575.98px) {
    width: 24px;
    height: 24px;
  }
`;

const LogoutBtn = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
  background: #00b8e6;
  cursor: pointer;
  height: 40px;
  width: 165px;
  padding: 0.375rem 0.75rem;
  border: 1px solid #00b8e6;
  color: #fff;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;

  @media (max-width: 1199px) {
    margin: 15px 0;
    margin-left: auto;
    margin-right: auto;
  }

  @media only screen and (max-width: 575.98px) {
    width: 130px;
    height: 30px
    font-size: 12px;
  }
`;

const ResponsiveMenu = styled.div`
  @media (max-width: 1199px) {
    width: 100%;
    display: flex;
    height: 100%;
  }
`;

//    display: ${props => (props.isChecked ? "block" : "none")};
const ResponsiveNav = styled.div`
  @media (max-width: 1199px) {
    display: block;
    max-height: ${(props) => (
    props.isChecked
      ? '1000px'
      : '0')};
    overflow: hidden;
    -webkit-transform: ${(props) => (props.isChecked
    ? 'perspective(400) rotate3d(0, 0, 0, 0)'
    : 'perspective(400) rotate3d(1, 0, 0, -90deg)')};
    -webkit-transform-origin: 50% 0;
    -webkit-transition: 350ms;
    -moz-transition: 350ms;
    -o-transition: 350ms;
    transition: 350ms;
    width: 100%;
    background: #4ddbff;
    z-index: ${(props) => (
    props.isChecked
      ? '2'
      : '-1')};
    margin: 0;
    padding-top: 10px;
  }
`;

export {
  Label,
  LogoutBtn,
  Panel,
  Header,
  Logo,
  Title,
  User,
  LoginName,
  Nav,
  NavItem,
  NavLink,
  Icon,
  Input,
  ResponsiveMenu,
  ResponsiveNav
};
