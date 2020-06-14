/*global google*/
import React, {Component} from "react";
import {connect} from "react-redux";
import {postIndicator} from "../../../actions/mapIndicator/postIndicator";
import {fetchIndicators} from "../../../actions/mapIndicator/fetchIndicators";
import {removeIndicator} from "../../../actions/mapIndicator/removeIndicator";
import {editIndicator} from "../../../actions/mapIndicator/editIndicator";
import PropTypes from "prop-types";
import {baseUrl} from "../../../axiosInstance";
import {Wrapper, SearchBoxInput, InfoBoxContainer, InfoBtn, InfoContent} from "./style";

Wrapper.displayName = "div";
SearchBoxInput.displayName = "input";
InfoBoxContainer.displayName = "div";
InfoBtn.displayName = "button";
InfoContent.displayName = "span";

const {InfoBox} = require("react-google-maps/lib/components/addons/InfoBox");
const {compose, withProps, withStateHandlers, lifecycle} = require("recompose");
const _ = require("lodash");
const {withScriptjs, withGoogleMap, GoogleMap, Marker} = require("react-google-maps");
const {SearchBox} = require("react-google-maps/lib/components/places/SearchBox");

const onToggleOpen = ({isOpen, id, name, street, city, country, currentValue}) => id => {
  console.log(id, isOpen, name);
  if (id && !isOpen) {
    return {
      isOpen: !isOpen,
      id
    }
  } else {
    return {
      id,
      street: "",
      city: "",
      country: "",
      currentValue: ""
    }
  }
}

const onEditInfoBox = ({isEdit, currentId, currentValue, propertyName}) => (currentId, currentValue, propertyName) => {
  console.log(isEdit, currentId, propertyName)
  if (currentId && !isEdit) {
    return {
      isEdit: !isEdit,
      currentValue: currentValue,
      currentId: currentId,
      propertyName: propertyName
    }
  } else {
    return {currentId: currentId, currentValue: currentValue, propertyName: propertyName}

  }
}

const onIndicatorChange = ({propertyName, street, city, country}) => (e) => {
  console.log(e.target.value);
  return {
    [e.target.name]: e.target.value
  }
}

const closeInput = ({isOpen, id, street, city, country, currentValue, isEdit}) => () => {
  return {
    isEdit: false,
    id,
    street: "",
    city: "",
    country: "",
    currentValue: "",
    propertyName: ""
  }
}

const geocode = (indicator, postIndicator) => {
  let geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({
    location: {
      lat: indicator.lat,
      lng: indicator.lng
    }
  }, (results, status) => {
    if (status === "OK") {
      const mapIndicator = {
        name: indicator.name,
        lat: indicator.lat,
        lng: indicator.lng,
        icon: indicator.icon,
        street: results[0].formatted_address.split(",")[0],
        city: results[0].formatted_address.split(",")[1],
        country: results[0].formatted_address.split(",")[2],
        isDefault: indicator.isDefault
      };
      postIndicator(mapIndicator);
    } else if (status === "OVER_QUERY_LIMIT") {
      console.log("Geocode was not successful for the following reason: " + status);
    } else {
      console.log("Geocode was not successful for the following reason: " + status);
    }
  });
};

export const MapWithAMakredInfoWindow = compose(withProps({googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`, containerElement: (<div style={{
    height: `100%`
  }}/>), loadingElement: (<div style={{
    height: `100%`
  }}/>), mapElement: (<div style={{
    height: `100%`
  }}/>)}), withStateHandlers(() => ({
  isOpen: false,
  id: null,
  isEdit: false,
  currentId: null,
  editValuie: "",
  editingValue: "",
  street: "",
  city: "",
  country: "",
  propertyName: "",
  bounds: null,
  center: {
    lat: 50.89973,
    lng: 15.72899
  },
  zoom: 15
}), {onToggleOpen, geocode, onEditInfoBox, onIndicatorChange, closeInput}), withScriptjs, withGoogleMap, lifecycle({
  componentDidMount() {
    const refs = {};

    this.setState({
      onMapMounted: ref => {
        refs.map = ref;
      },
      onBoundsChanged: () => {
        this.setState({bounds: refs.map.getBounds(), center: refs.map.getCenter()});
      },
      onSearchBoxMounted: ref => {
        refs.searchBox = ref;
      },
      onMouseOver: () => {},
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces();
        const bounds = new google.maps.LatLngBounds();
        places.forEach(
          place => place.geometry.viewport
          ? bounds.union(place.geometry.viewport)
          : bounds.extend(place.geometry.location));

        const nextCenter = _.get(this.state.center);

        this.setState({center: nextCenter});

        refs.map.fitBounds(bounds);
      },
      onZoomChanged: () => {
        this.setState({zoom: refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.zoom});
      }
    });
  }
}))(props => {
  return (<GoogleMap ref={props.onMapMounted} onBoundsChanged={props.onBoundsChanged} onMouseOver={props.onMouseOver} defaultZoom={props.zoom} options={{
      disableDoubleClickZoom: true
    }} onZoomChanged={props.onZoomChanged} onClick={e => props.addIndicator(e, geocode, postIndicator)} defaultCenter={props.selectedIndicator
      ? {
        lat: props.selectedIndicator.lat,
        lng: props.selectedIndicator.lng
      }
      : props.center
} defaultCursor={props.cursor} onChangeCenter={props.newLocation}>
    {
      props.indicators.filter(indicator => !props.disableMarkers.find(disableItem => disableItem.name === indicator.name)).map((indicator, index) => {
        return (<Marker data-testid="marker" onClick={() => props.onToggleOpen(indicator.id)} key={index} position={{
            lat: indicator.lat,
            lng: indicator.lng
          }} icon={{
            url: indicator.isDefault
              ? `defaultMarkers/${indicator.icon}`
              : `${baseUrl}/images/${indicator.icon}`,
            scaledSize: {
              width: props.zoom < 17
                ? 24
                : 32,
              height: props.zoom < 17
                ? 24
                : 32
            }
          }} visible={!(props.zoom < 15)}>
          {
            props.isOpen && props.id === indicator.id && (<InfoBox defaultPosition={{
                lat: indicator.lat,
                lng: indicator.lng
              }} ref={props.onInfoBox} onCloseClick={props.onToggleOpen} closeBoxURL="" options={{
                boxStyle: {
                  border: "none",
                  fontSize: "12pt",
                  overflow: "hidden",
                  height: "250px",
                  width: "250px",
                  display: props.zoom < 15
                    ? "none"
                    : "block"
                },
                closeBoxMargin: "5px 5px 2px 2px",
                alignBottom: true,
                isHidden: false,
                pixelOffset: props.zoom < 17
                  ? new google.maps.Size(-125, -20)
                  : new google.maps.Size(-125, -45),
                enableEventPropagation: true,
                infoBoxClearance: new google.maps.Size(1, 1)
              }}>
              <InfoBoxContainer>
                {
                  ["name", "street", "city", "country"].map(content => {
                    return props.isEdit && props.currentId === indicator.id && props.currentValue === indicator[content] && props.propertyName === content
                      ? <input type="text" name={content} onChange={e => props.onIndicatorChange(e)} value={props[content]} placeholder={indicator[content]} onKeyPress={e => {
                            let key = e.keyCode || e.which;
                            if (key === 13) {
                              props.edit(indicator.id, content, props[content]);
                              props.closeInput();
                            } else if (key === 27) {
                              props.closeInput();
                            }
                          }}/>
                      : <InfoContent onDoubleClick={() => props.onEditInfoBox(indicator.id, indicator[content], content)}>{indicator[content]}</InfoContent>
                  })
                }
                <InfoBtn onClick={() => props.remove(indicator.id)} data-testid="removeBtn">
                  Remove Marker
                </InfoBtn>
              </InfoBoxContainer>
            </InfoBox>)
          }
        </Marker>);
      })
    }

    <SearchBox ref={props.onSearchBoxMounted} bounds={props.bounds} controlPosition={google.maps.ControlPosition.TOP_LEFT} onPlacesChanged={props.onPlacesChanged}>
      <SearchBoxInput type="text" placeholder="Search city"/>
    </SearchBox>
  </GoogleMap>);
});

export class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapCenter: ""
    };
  }

  componentDidMount() {
    const {fetchIndicators} = this.props;
    fetchIndicators();
  }

  addIndicator = (event, geocode) => {
    const {selectedMarker, postIndicator, isNavSelect} = this.props;
    if (selectedMarker.id && !selectedMarker.isDeleted && isNavSelect) {
      const indicator = {
        name: selectedMarker.name,
        icon: selectedMarker.icon,
        isDefault: selectedMarker.isDefault,
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      geocode(indicator, postIndicator);
    }
  };

  edit = (id, propertyName, value) => {
    const {editIndicator} = this.props;
    console.log("TEST");
    editIndicator(id, propertyName, value);
  }

  remove = id => {
    const {removeIndicator} = this.props;
    removeIndicator(id);
  };

  render() {
    const {indicators, selectedMarker, selectedIndicator} = this.props;

    return (<Wrapper>
      <MapWithAMakredInfoWindow indicators={indicators} selectedMarker={selectedMarker} addIndicator={this.addIndicator} remove={this.remove} edit={this.edit} disableMarkers={this.props.disableMarkers} selectedIndicator={selectedIndicator}/>
    </Wrapper>);
  }
}

const mapStateToProps = state => ({indicators: state.mapIndicator.indicators, isNavSelect: state.mapIndicator.isNavSelect, selectedMarker: state.marker.selectedMarker, disableMarkers: state.marker.disableMarkers, selectedIndicator: state.mapIndicator.selectedIndicator});

const mapDispatchToProps = {
  fetchIndicators,
  postIndicator,
  removeIndicator,
  editIndicator
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);

Map.propTypes = {
  postIndicator: PropTypes.func.isRequired,
  fetchIndicators: PropTypes.func.isRequired,
  removeIndicator: PropTypes.func.isRequired,
  isNavSelect: PropTypes.bool.isRequired,
  indicators: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    street: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    userId: PropTypes.number.isRequired
  })).isRequired
};

Map.defaultProps = {
  selectedMarker: {},
  disableMarkers: []
};
