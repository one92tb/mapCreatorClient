import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isPanelSelect } from '../../../actions/mapIndicator/isPanelSelect';
import { fetchMarkers } from '../../../actions/marker/fetchMarkers';
import { disableMarkers } from '../../../actions/marker/disableMarkers';
import { getSelectedMarker } from '../../../actions/marker/getSelectedMarker';
import { baseUrl } from '../../../baseUrl';
import { defaultMarkers } from './defaultMarkers';
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
} from './style';

export const Panel = (props) => {
  const {
    isPanelSelect, fetchMarkers, getSelectedMarker, disableMarkers, markers, location
  } = props;

  const [isSelect, setIsSelect] = useState(true); // set panel status select/filter
  const [checked, setChecked] = useState(false); // RWD - hamburger menu
  const [selectedId, setSelectedId] = useState(''); // current selected marker id
  const [filteredMarkers, setFilteredMarkers] = useState([]); // hide markers on the map
  const [displayId, setDisplayId] = useState(0); // show default/custom markers

  useEffect(() => {
    fetchMarkers();
  }, []);

  useEffect(() => {
    disableMarkers(filteredMarkers);
  }, [filteredMarkers]);

  useEffect(() => {
    setSelectedId('');
    if (location.pathname === '/createMarker') {
      setIsSelect(true);
    }
  }, [location.pathname]);

  const onSelect = (marker, id) => {
    if (marker.isDefault && location.pathname === '/createMarker') {
      return false;
    }

    if (marker.id !== selectedId && isSelect) {
      setSelectedId(id);
      getSelectedMarker({ ...marker, url: `${baseUrl}/images/${marker.icon}` });
    } else if (marker.id === selectedId && isSelect) {
      setSelectedId('');
      getSelectedMarker({ id: undefined, name: '', url: 'img/IMG-default.png' });
    } else if (filteredMarkers.find((el) => el.id === marker.id)) {
      setFilteredMarkers(filteredMarkers.filter((el) => el.id !== marker.id));
    } else {
      setFilteredMarkers([...filteredMarkers, marker]);
    }
  };

  const switchPanel = (bool) => {
    if (location.pathname === '/createMarker') {
      return false;
    }

    setIsSelect(bool);
    isPanelSelect(bool);
  };

  return (
    <Wrapper currentLocation={location}>
      <Label htmlFor='panel' currentLocation={location}>
        <img src='img/drawMarker.png' alt='drawMarker' width={30} height={30} />
      </Label>
      <Input type='checkbox' id='panel' onChange={(e) => setChecked(e.target.checked)} />
      <Card isChecked={checked} currentLocation={location}>
        <CardHeader>
          <Nav>
            <NavItem>
              <SelectButton
                data-testid='select-btn'
                isSelected={isSelect}
                location={location.pathname}
                onClick={() => switchPanel(true)}
              >
                select
              </SelectButton>
            </NavItem>
            <NavItem>
              <FilterButton
                data-testid='filter-btn'
                isSelected={isSelect}
                location={location.pathname}
                onClick={() => switchPanel(false)}
              >
                filter
              </FilterButton>
            </NavItem>
          </Nav>
        </CardHeader>
        <CardBody className='scroll'>
          {
            [defaultMarkers, markers].map((markers, id) => (
              <List key={markers}>
                <DisplayMarkersBtn
                  onClick={() => setDisplayId(id)}
                >
                  {(id === 0) ? 'default markers' : 'custom markers'}
                </DisplayMarkersBtn>
                <Markers displayId={displayId} markersId={id}>
                  {
                    markers.map((marker) => (
                      <Marker
                        draggable='false'
                        data-testid='marker'
                        key={marker.id}
                        location={props.location.pathname}
                        isDefault={marker.isDefault}
                        isSelected={selectedId === marker.id && isSelect}
                        isFiltered={filteredMarkers.find((el) => el.id === marker.id) && !isSelect}
                        onClick={() => onSelect(marker, marker.id)}
                      >
                        <MarkerIcon>
                          <MarkerImg
                            src={marker.isDefault
                              ? `defaultMarkers/${marker.icon}`
                              : `${baseUrl}/images/${marker.icon}`}
                            alt={marker.icon}
                          />
                        </MarkerIcon>
                        <MarkerName>{marker.name}</MarkerName>
                      </Marker>
                    ))
                  }
                </Markers>
              </List>
            ))
          }
        </CardBody>
      </Card>
    </Wrapper>
  );
};

const mapDispatchToProps = {
  isPanelSelect,
  fetchMarkers,
  getSelectedMarker,
  disableMarkers
};

const mapStateToProps = (state) => ({ selectedMarker: state.marker.selectedMarker, markers: state.marker.markers });

export default connect(mapStateToProps, mapDispatchToProps)(Panel);

Panel.propTypes = {
  isPanelSelect: PropTypes.func.isRequired,
  fetchMarkers: PropTypes.func.isRequired,
  getSelectedMarker: PropTypes.func.isRequired,
  disableMarkers: PropTypes.func.isRequired,
  markers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired
  })).isRequired
};
