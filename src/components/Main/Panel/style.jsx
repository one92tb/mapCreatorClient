import {css} from "styled-components";
import styled from "styled-components";

const Wrapper = styled.div `
  padding: 40px 10px 40px 20px;
  height: 100%;
  @media only screen and (max-width: 1199px) {
    padding: 5px;
  }
  @media only screen and (max-width: 991.98px) {
    height: ${props => props.currentLocation.pathname === "/"
  ? "0"
  : "100%"};
    padding: ${props => props.currentLocation.pathname === "/"
    ? "0"
    : "10px 5px 5px 5px"};

  }
`;

const ResponsivePanel = css `
  @media only screen and (max-width: 991.98px) {
    display: ${props => props.isChecked
  ? "flex"
  : "none"};
    position: absolute;
    z-index: 1;
    top: 65px;
    left: 15px;
    height: 250px;
    width: 300px;
    background: #f2f2f2;

  }

  @media only screen and (max-width: 575.98px) {
    top: 110px;
    width: 200px;
  }
`;

const Card = styled.div `
  height: 100%;
  border: 1px solid #00b8e6;
  width: 100%;
  position: relative;
  display: flex;
  min-width: 0;
  word-wrap: break-word;
  flex-direction: column;
  border-radius: 3px;
  overflow: hidden;
  ${props => props.currentLocation.pathname === "/" && ResponsivePanel};
`;

const CardHeader = styled.div `
  border-bottom: 1px solid #00b8e6;
  padding: 0.5rem;
  height: 50px;

  display: block;
  @media only screen and (max-width: 575.98px) {
    padding: 0.25rem;
    font-size: 12px;
  }
`;

const Nav = styled.ul `
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const NavItem = styled.li `
  width: 50%;
  height: 100%;
`;

const Btn = css `
width: 100%;
height: 100%;
border: 1px solid #4ddbff;
color: #000;
background-color: #B2CFE7;
border: 1px solid #00b8e6;
transition: background-color 1s ease;
text-transform: uppercase;
color: #fff;
`;

const SelectButton = styled.button `
${Btn}
border-top-left-radius: 0.25rem;
border-bottom-left-radius: 0.25rem;
  background: ${props => props.isSelected && "#00b8e6"}
`;

const FilterButton = styled.button `
${Btn}
border-top-right-radius: 0.25rem;
border-bottom-right-radius: 0.25rem;
background: ${props => !props.isSelected && "#00b8e6"};

&:hover {
 cursor: ${props => props.location === "/createMarker"
  ? "not-allowed"
  : "pointer"}
}

`;

const CardBody = styled.div `
  padding: 1.25rem;
  height: 100%;
  overflow-y: auto;
  @media only screen and (max-width: 575.98px) {
    padding: 0.25rem;
  }
`;

const Label = styled.label `
  display: none;
  @media (max-width: 991.98px) {
    display: ${props => props.currentLocation.pathname === "/"
  ? "flex"
  : "none"};
    position: absolute;
    top: 15px;
    left: 430px;
    z-index: 1;
    cursor: pointer;
    font-size: 30px;
    justify-content: flex-end;
    align-items: center;
    background: #fff;
    width: 50px;
    height: 40px;
    justify-content: center;
    border-radius: 3px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    border: 1px solid transparent;
  }
  @media only screen and (max-width: 575.98px) {
    top: 15px;
    left: 220px;
  }
  @media only screen and (max-width: 350px) {
    top: 61px;
    left: 165px;
  }
`;

const Input = styled.input `
  display: none;
`;

const List = styled.div `
  list-style: none;
  padding: 0;

`;

const Marker = styled.li `
  margin-bottom: 5px;
  border: 1px solid #4ddbff;
  width: 100%;
  height: 40px;
  border-radius: 3px;
  margin-bottom: 5px !important;
  padding: 0 !important;
  display: flex;
  opacity: 1;
  &:hover {
      background: ${props => props.isDefault && props.location === "/createMarker"
  ? "transparent"
  : "#4ddbff"};
      cursor: ${props => props.isDefault && props.location === "/createMarker"
    ? "not-allowed"
    : "cursor"};
    }


  background: ${props => props.isSelected
      ? "#00b8e6"
      : props.isFiltered
        ? "#999"
        : "transparent"};
  opacity: ${props => props.isFiltered && "transparent"};
  transition: all 1s ease;

`;

const MarkerIcon = styled.div `
  margin: 0 10px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MarkerName = styled.span `
  width: 75%;
  float: left;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 575.98px) {
    font-size: 12px;
  }
`;

const MarkerImg = styled.img `
  height: 32px;
  width: 32px;

  @media only screen and (max-width: 575.98px) {
    height: 24px;
    width: 24px;
  }
`;

const DisplayMarkersBtn = styled.button `
height: 40px;
width: 100%;
background: #00b8e6;
color: #fff;
border-radius: 3px;
border: 1px solid #4ddbff;
text-transform: uppercase;
`;

const Markers = styled.div `
margin-top: 5px;



  height: ${props => props.displayId === props.markersId
  ? "100%"
  : "0"};
  opacity:  ${props => props.displayId === props.markersId
    ? "100"
    : "0"};
  overflow:  ${props => props.displayId !== props.markersId && "hidden"};

  transition: all 1s ease;


`;

export {
  Wrapper,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  SelectButton,
  FilterButton,
  Nav,
  Label,
  Input,
  List,
  Marker,
  MarkerIcon,
  MarkerName,
  MarkerImg,
  DisplayMarkersBtn,
  Markers
};
