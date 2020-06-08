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
  MarkerImg,
  SelectButton,
  FilterButton,
  DisplayMarkersBtn,
  Markers
} from "./style";

Wrapper.displayName = "div";
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
SelectButton.displayName = "button";
FilterButton.displayName = "button";
DisplayMarkersBtn.displayName = "button";
Markers.displayName = "div";

export class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: true,
      checked: false,
      selectedId: "",
      filteredMarkers: [],
      markersToDisplayId: 0
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

    if (location.pathname === "/createMarker" && marker.isDefault) {
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
      getSelectedMarker({id: undefined, name: "", url: "img/IMG-default.png"});
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
    this.setState({checked: event.target.checked});
  };

  switchPanelStatus = bool => {
    const {location, isPanelSelect} = this.props;
    if (location.pathname === "/createMarker") {
      return false;
    }

    this.setState({isSelected: bool});
    isPanelSelect(bool);
  };

  handleDisplayMarkers = id => {
    this.setState({markersToDisplayId: id})
  }

  render() {
    const {location, markers} = this.props;
    const {isSelected, selectedId, filteredMarkers} = this.state;
    return (<Wrapper currentLocation={location}>
      <Label htmlFor="panel" currentLocation={location}>
        <img src={"img/drawMarker.png"} alt="drawMarker" width={30} height={30}/>
      </Label>
      <Input type="checkbox" id="panel" onChange={this.handleCheckBox}/>
      <Card isChecked={this.state.checked} currentLocation={location}>
        <CardHeader>
          <Nav>
            <NavItem>
              <SelectButton isSelected={isSelected} location={this.props.location.pathname} onClick={() => this.switchPanelStatus(true)}>
                select
              </SelectButton>
            </NavItem>
            <NavItem>
              <FilterButton isSelected={isSelected} location={this.props.location.pathname} onClick={() => this.switchPanelStatus(false)}>
                filter
              </FilterButton>
            </NavItem>
          </Nav>
        </CardHeader>
        <CardBody className="scroll">
          {
            [defaultMarkers, markers].map((markers, id) => (<List key={id}>
              <DisplayMarkersBtn onClick={() => this.handleDisplayMarkers(id)}>{(id ===0) ? "default markers" : "custom markers"}</DisplayMarkersBtn>
              <Markers displayId={this.state.markersToDisplayId} markersId ={id}>
                {
                  markers.map((marker, id) => {
                    return (<Marker data-testid="marker" key={marker.id} location={this.props.location.pathname} isDefault={marker.isDefault} isSelected={selectedId === marker.id && this.state.isSelected} isFiltered={filteredMarkers.find(el => el.id === marker.id) && !isSelected
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
              </Markers>
            </List>))
          }

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
