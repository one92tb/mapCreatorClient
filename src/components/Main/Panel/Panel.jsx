import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isPanelSelect } from '../../../actions/isPanelSelect';
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

Wrapper.displayName = 'div';
Card.displayName = 'div';
CardHeader.displayName = 'div';
CardBody.displayName = 'div';
NavItem.displayName = 'li';
Nav.displayName = 'ul';
Label.displayName = 'label';
Input.displayName = 'input';
List.displayName = 'div';
Marker.displayName = 'li';
MarkerIcon.displayName = 'div';
MarkerName.displayName = 'span';
MarkerImg.displayName = 'img';
SelectButton.displayName = 'button';
FilterButton.displayName = 'button';
DisplayMarkersBtn.displayName = 'button';
Markers.displayName = 'div';

export const Panel = (props) => {

    const [isSelect, setIsSelect] = useState(true); // set panel status select/filter
    const [checked, setChecked] = useState(false); // RWD - hamburger menu
    const [selectedId, setSelectedId] = useState(''); // current selected marker id 
    const [filteredMarkers, setFilteredMarkers] = useState([]); // hide markers on the map
    const [displayId, setDisplayId] = useState(0); // show default/custom markers

    useEffect(() => { 
      props.fetchMarkers();
     }, []);

    useEffect(() => {
      props.disableMarkers(filteredMarkers);
    }, [filteredMarkers]);

    //restart marker select on the panel when user change navigation, and set always select status when user click on 'createMarker' link
    useEffect(() => {
      setSelectedId('');
      if (props.location.pathname === '/createMarker') {
        setIsSelect(true);
      }
    }, [props.location.pathname]);


    const onSelect = (marker,id) => {
       if(marker.isDefault) {
         return false;
       }

      if (marker.id !== selectedId && isSelect) {
        setSelectedId(id);
        props.getSelectedMarker({...marker, url: `${baseUrl}/images/${marker.icon}`});
      } else if (marker.id === selectedId && isSelect) {
        setSelectedId('');
        props.getSelectedMarker({id: undefined, name: "", url: 'img/IMG-default.png'});
      } else {
        if (filteredMarkers.find(el => el.id === marker.id)) {
          setFilteredMarkers(filteredMarkers.filter(el => el.id !== marker.id));
        } else {
          setFilteredMarkers([...filteredMarkers, marker]);
        }
      }
    }

    const switchPanel= (bool) => {
      if (props.location.pathname === '/createMarker') {
        return false;
      }

      setIsSelect(bool);
      props.isPanelSelect(bool);
    }
  
    return (
        <Wrapper currentLocation={props.location}>
        <Label htmlFor='panel' currentLocation={props.location}>
          <img src='img/drawMarker.png' alt='drawMarker' width={30} height={30} />
        </Label>
        <Input type='checkbox' id='panel' onChange={e => { setChecked(e.target.checked);    console.log(checked); }} />
        <Card isChecked={checked} currentLocation={props.location}>
          <CardHeader>
            <Nav>
              <NavItem>
                <SelectButton
                  data-testid='select-btn'
                  isSelected={isSelect}
                  location={props.location.pathname}
                  onClick={() => switchPanel(true)}
                >
                  select
                </SelectButton>
              </NavItem>
              <NavItem>
                <FilterButton
                  data-testid='filter-btn'
                  isSelected={isSelect}
                  location={props.location.pathname}
                  onClick={() => switchPanel(false)}
                >
                  filter
                </FilterButton>
              </NavItem>
            </Nav>
          </CardHeader>
          <CardBody className='scroll'>
            {
              [defaultMarkers, props.markers].map((markers, id, arr) => (
                <List key={markers}>
                  <DisplayMarkersBtn
                    onClick={() => setDisplayId(id)}
                  >
                    {(id === 0) ? 'default markers' : 'custom markers'}
                  </DisplayMarkersBtn>
                  <Markers displayId={displayId} markersId={id}>
                    {
                  markers.map((marker, id) => (
                    <Marker
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