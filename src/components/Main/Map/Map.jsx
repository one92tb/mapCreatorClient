/* global google  */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoBox,
  StandaloneSearchBox
} from '@react-google-maps/api';
import { postIndicator } from '../../../actions/mapIndicator/postIndicator';
import { fetchIndicators } from '../../../actions/mapIndicator/fetchIndicators';
import { removeIndicator } from '../../../actions/mapIndicator/removeIndicator';
import { editIndicator } from '../../../actions/mapIndicator/editIndicator';
import { baseUrl } from '../../../baseUrl';
import {
  Wrapper,
  SearchBoxInput,
  InfoBoxContainer,
  InfoBtn,
  InfoContent,
  InfoContentInput
} from './style';

const geocode = (indicator, postIndicator) => {
  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({
    location: {
      lat: indicator.lat,
      lng: indicator.lng
    }
  }, (results, status) => {
    if (status === 'OK') {
      const mapIndicator = {
        name: indicator.name,
        lat: indicator.lat,
        lng: indicator.lng,
        icon: indicator.icon,
        street: results[0].formatted_address.split(',')[0],
        city: results[0].formatted_address.split(',')[1],
        country: results[0].formatted_address.split(',')[2],
        isDefault: indicator.isDefault
      };
      postIndicator(mapIndicator);
    } else if (status === 'OVER_QUERY_LIMIT') {
      console.log(`Geocode was not successful for the following reason: ${status}`);
    } else {
      console.log(`Geocode was not successful for the following reason: ${status}`);
    }
  });
};

const mapContainerStyle = {
  height: '100%',
  width: '100%'
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  disableDoubleClickZoom: true,
  cursor: 'pointer'
};

const libraries = ['places'];

const Map = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries
  });

  const {
    indicators,
    isNavSelect,
    selectedMarker,
    disableMarkers,
    selectedIndicator,
    fetchIndicators,
    postIndicator,
    removeIndicator,
    editIndicator
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndicatorId, setCurrentIndicatorId] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [propertyName, setPropertyName] = useState('');
  const [zoom, setZoom] = useState(14);
  const [center, setCenter] = useState({
    lat: 50.89973,
    lng: 15.72899
  });

  const [inputValues, setInputValues] = useState({
    name: '',
    street: '',
    city: '',
    country: ''
  });

  useEffect(() => {
    fetchIndicators();
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const searchBoxRef = React.useRef();
  const onSearchBoxLoad = React.useCallback((SearchBox) => {
    searchBoxRef.current = SearchBox;
  });

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    const bounds = new google.maps.LatLngBounds();
    places.forEach(
      (place) => (place.geometry.viewport
        ? bounds.union(place.geometry.viewport)
        : bounds.extend(place.geometry.location))
    );
    const nextCenter = mapRef.current.getCenter().toJSON();
    setCenter(nextCenter);
    mapRef.current.fitBounds(bounds);
  };

  const onZoomChanged = () => {
    if (!mapRef.current) {
      return false;
    }
    const zoomLevel = mapRef.current.getZoom();
    if (zoomLevel !== zoom) {
      setZoom(zoomLevel);
    }
  };

  const addIndicator = (event) => {
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

  const onToggleOpen = (id) => {
    if (id && !isOpen) {
      setCurrentIndicatorId(id);
      setIsOpen(!isOpen);
    }
    setCurrentIndicatorId(id);
  };

  const openIndicatorInput = (event, currentIndicatorId, currentValue, propertyName) => {
    event.stopPropagation();
    if (currentIndicatorId && !isEdit) {
      setIsEdit(true);
      setCurrentValue(currentValue);
      setCurrentIndicatorId(currentIndicatorId);
      setPropertyName(propertyName);
    } else {
      setCurrentIndicatorId(currentIndicatorId);
      setCurrentValue(currentValue);
      setPropertyName(propertyName);
    }
  };

  const onIndicatorChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const edit = (id, propertyName, value) => {
    editIndicator(id, propertyName, value);
  };

  const closeInput = () => {
    setIsEdit(false);
    setInputValues({
      street: '',
      city: '',
      country: ''
    });
    setCurrentValue('');
    setPropertyName('');
  };

  if (loadError) return 'Error';
  if (!isLoaded) return 'Loading...';

  return (
    <Wrapper>
      <GoogleMap
        id='map'
        mapContainerStyle={mapContainerStyle}
        zoom={zoom}
        center={selectedIndicator
          ? {
            lat: selectedIndicator.lat,
            lng: selectedIndicator.lng
          }
          : center}
        options={options}
        onClick={addIndicator}
        onLoad={onMapLoad}
        onPlacesChanged={onPlacesChanged}
        onZoomChanged={onZoomChanged}
        draggable='true'
      >
        {
        indicators.filter((indicator) => !disableMarkers
          .find((disableItem) => disableItem.name === indicator.name))
          .map((indicator) => (
            <Marker
              data-testid='marker'
              onClick={() => onToggleOpen(indicator.id)}
              key={`marker ${indicator.id}`}
              position={{
                lat: indicator.lat,
                lng: indicator.lng
              }}
              icon={{
                url: indicator.isDefault
                  ? `defaultMarkers/${indicator.icon}`
                  : `${baseUrl}/images/${indicator.icon}`,
                scaledSize: {
                  width: zoom < 17
                    ? 24
                    : 32,
                  height: zoom < 17
                    ? 24
                    : 32
                }
              }}
              visible={zoom > 13}
            >
              {
                isOpen && currentIndicatorId === indicator.id && (
                  <InfoBox
                    defaultPosition={{
                      lat: indicator.lat,
                      lng: indicator.lng
                    }}
                    onCloseClick={() => onToggleOpen(indicator.id)}
                    closeBoxURL=''
                    options={{
                      boxStyle: {
                        border: 'none',
                        fontSize: '12pt',
                        overflow: 'hidden',
                        height: '250px',
                        width: '250px',
                        display: zoom > 13
                          ? 'block'
                          : 'none'
                      },
                      closeBoxMargin: '5px 5px 2px 2px',
                      alignBottom: true,
                      isHidden: false,
                      pixelOffset: zoom < 17
                        ? new google.maps.Size(-125, -20)
                        : new google.maps.Size(-125, -45),
                      enableEventPropagation: true,
                      infoBoxClearance: new google.maps.Size(1, 1)
                    }}
                  >
                    <InfoBoxContainer>
                      {
                        ['name', 'street', 'city', 'country']
                          .map((content) => ((isEdit && currentIndicatorId === indicator.id
                            && currentValue === indicator[content] && propertyName === content)
                            ? (
                              <InfoContentInput
                                type='text'
                                key={indicator.id}
                                name={content}
                                onChange={(e) => onIndicatorChange(e)}
                                value={inputValues[content]}
                                placeholder='insert new value'
                                onKeyPress={(e) => {
                                  const key = e.keyCode || e.which;
                                  if (key === 13 && inputValues[content] !== '') {
                                    edit(indicator.id, content, inputValues[content]);
                                    closeInput();
                                  }
                                }}
                                onKeyUp={(e) => {
                                  (e.keyCode === 27) && closeInput();
                                }}
                              />
                            ) : (
                              <InfoContent
                                key={`infoContent ${indicator[content]} ${indicator.id}`}
                                onDoubleClick={(event) => openIndicatorInput(event, indicator.id, indicator[content], content)}
                              >
                                {indicator[content]}
                              </InfoContent>
                            )))
                      }
                      <InfoBtn onClick={() => removeIndicator(indicator.id)} data-testid='removeBtn'>
                        Remove Marker
                      </InfoBtn>
                    </InfoBoxContainer>
                  </InfoBox>
                )
              }
            </Marker>
          ))
          }
        <StandaloneSearchBox
          onLoad={onSearchBoxLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <SearchBoxInput
            type='text'
            placeholder='Search city'
            style={{
              boxSizing: 'border-box',
              border: '1px solid transparent',
              width: '240px',
              height: '32px',
              padding: '0 12px',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              fontSize: '14px',
              outline: 'none',
              textOverflow: 'ellipses',
              position: 'absolute',
              left: '80%',
              marginLeft: '-120px'
            }}
          />
        </StandaloneSearchBox>
      </GoogleMap>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  indicators: state.mapIndicator.indicators,
  isNavSelect: state.mapIndicator.isNavSelect,
  selectedMarker: state.marker.selectedMarker,
  disableMarkers: state.marker.disableMarkers,
  selectedIndicator: state.mapIndicator.selectedIndicator
});

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
