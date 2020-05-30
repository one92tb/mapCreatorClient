import React from "react";
import {isPanelSelect} from "../../../actions/isPanelSelect";
import {fetchMarkers} from "../../../actions/marker/fetchMarkers";
import {disableMarkers} from "../../../actions/marker/disableMarkers";
import {getSelectedMarker} from "../../../actions/marker/getSelectedMarker";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {baseUrl} from "../../../axiosInstance";
import {defaultMarkers} from "./defaultMarkers";
import {
  Wrapper,
  FilterLink,
  SelectLink,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  Nav,
  Label,
  Input,
  List,
  Marker,
  MarkerIcon,
  MarkerName,
  MarkerImg
} from "./style";

Wrapper.displayName = "div";
FilterLink.displayName = "a";
SelectLink.displayName = "a";
Card.displayName = "div";
CardHeader.displayName = "div";
CardBody.displayName = "div";
NavItem.displayName = "li";
Nav.displayName = "ul";
Label.displayName = "label";
Input.displayName = "input";
List.displayName = "div";
Marker.displayName = "li";
MarkerIcon.displayName = "div";
MarkerName.displayName = "span";
MarkerImg.displayName = "img";

export class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: true,
      checked: false,
      selectedId: "",
      filteredMarkers: []
    };
  }

  componentDidMount() {
    const {fetchMarkers} = this.props;
    fetchMarkers();
  }

  componentDidUpdate(prevProps) {
    const {location} = this.props;
    if (location.pathname !== prevProps.location.pathname && location.pathname === "/createMarker") {
      this.setState({isSelected: true});
    }

    if (location.pathname !== prevProps.location.pathname) {
      this.setState({selectedId: ""});
    }
  }

  onSelect = (marker, id) => {
    const {getSelectedMarker, disableMarkers, location} = this.props;
    const {selectedId, filteredMarkers, isSelected} = this.state;

    console.log(marker);
    if (location.pathname === "/createMarker" && marker.isDefault) {
      console.log("GOWNO");
      return false;
    }
    if (marker.id !== selectedId && isSelected) {
      this.setState({selectedId: id});
      getSelectedMarker({
        ...marker,
        url: marker.isDefault
          ? `defaultMarkers/${marker.icon}`
          : `${baseUrl}/images/${marker.icon}`,
        isDefault: marker.isDefault
          ? true
          : false
      });
    } else if (marker.id === selectedId && isSelected) {
      this.setState({selectedId: ""});
      getSelectedMarker({id: undefined, name: "", url: "IMG-default.png"});
    } else {
      //remove Marker from filteredMarkers if exist
      if (filteredMarkers.find(el => el.id === marker.id)) {
        this.setState({
          filteredMarkers: filteredMarkers.filter(el => el.id !== marker.id)
        }, () => {
          disableMarkers(this.state.filteredMarkers);
        });
        //add Marker to filteredMarkers if not exist
      } else {
        this.setState({
          filteredMarkers: [
            ...filteredMarkers,
            marker
          ]
        }, () => {
          disableMarkers(this.state.filteredMarkers);
        });
      }
    }
  }

  handleCheckBox = event => {
    console.log("dupa", event.target.checked);
    this.setState({checked: event.target.checked});
  };

  switchPanelStatus = bool => {
    const {location, isPanelSelect} = this.props;
    if (location === "createMarker" && bool === false) {
      return false;
    }

    this.setState({isSelected: bool});
    isPanelSelect(bool);
  };

  render() {
    const {location, markers} = this.props;
    console.log(markers);
    const {isSelected, selectedId, filteredMarkers} = this.state;
    return (<Wrapper currentLocation={location}>
      <Label htmlFor="panel" currentLocation={location}>
        <img src={"drawMarker.png"} alt="drawMarker" width={30} height={30}/>
      </Label>
      <Input type="checkbox" id="panel" onChange={this.handleCheckBox}/>
      <Card isChecked={this.state.checked} currentLocation={location}>
        <CardHeader>
          <Nav>
            <NavItem>
              <SelectLink exact={true} isSelected={isSelected} location={this.props.location.pathname} onClick={() => this.switchPanelStatus(true)}>
                Select marker
              </SelectLink>
            </NavItem>
            /
            <NavItem>
              <FilterLink isSelected={isSelected} location={this.props.location.pathname} onClick={() => this.switchPanelStatus(false)}>
                Filter marker
              </FilterLink>
            </NavItem>
          </Nav>
        </CardHeader>
        <CardBody className="scroll">
          <List>
            {
              [
                ...defaultMarkers,
                ...markers
              ].map((marker, id) => {
                return (<Marker data-testid="marker" key={marker.id} isSelected={selectedId === marker.id && this.state.isSelected} isFiltered={filteredMarkers.find(el => el.id === marker.id) && !isSelected
} onClick={() => this.onSelect(marker, marker.id)}>
                  <MarkerIcon>
                    <MarkerImg src={marker.isDefault
                        ? `defaultMarkers/${marker.icon}`
                        : `${baseUrl}/images/${marker.icon}`} alt={marker.icon}/>
                  </MarkerIcon>
                  <MarkerName>{marker.name}</MarkerName>
                </Marker>)
              })
            }
          </List>
        </CardBody>
      </Card>
    </Wrapper>);
  }
}

const mapDispatchToProps = {
  isPanelSelect,
  fetchMarkers,
  getSelectedMarker,
  disableMarkers
};

const mapStateToProps = state => ({selectedMarker: state.marker.selectedMarker, markers: state.marker.markers});

export default connect(mapStateToProps, mapDispatchToProps)(Panel);

Panel.propTypes = {
  isPanelSelect: PropTypes.func.isRequired,
  fetchMarkers: PropTypes.func.isRequired,
  getSelectedMarker: PropTypes.func.isRequired,
  disableMarkers: PropTypes.func.isRequired,
  markers: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.number.isRequired, name: PropTypes.string.isRequired, icon: PropTypes.string.isRequired, userId: PropTypes.number.isRequired}))
};
