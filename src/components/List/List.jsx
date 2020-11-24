import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchIndicators } from '../../actions/mapIndicator/fetchIndicators';
import { fetchMarkers } from '../../actions/marker/fetchMarkers';
import { redirect } from '../../actions/redirect/redirect';
import { getSelectedIndicator } from '../../actions/mapIndicator/getSelectedIndicator';
import { defaultMarkers } from '../Main/Panel/defaultMarkers';

import {
  Wrapper,
  Label,
  Select,
  Input,
  Form,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Option,
  Image
} from './style';

Wrapper.displayName = 'div';
Label.displayName = 'label';
Select.displayName = 'select';
Input.displayName = 'input';
Form.displayName = 'form';
TableContainer.displayName = 'div';
Table.displayName = 'table';
Thead.displayName = 'thead';
Tbody.displayName = 'tbody';
Tr.displayName = 'tr';
Th.displayName = 'th';
Td.displayName = 'td';
Option.displayName = 'option';
Image.displayName = 'img';

export const List = (props) => {
  const {
    fetchIndicators, fetchMarkers, redirect, getSelectedIndicator, indicators, markers
  } = props;

  const [inputValues, setInputValues] = useState({
    markerName: 'All',
    city: ''
  });

  useEffect(() => {
    fetchMarkers();
    fetchIndicators();
  }, []);

  const findIndicatorOnTheMap = (indicator) => {
    getSelectedIndicator(indicator);
    redirect('/');
  };

  const handleChange = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  return (
    <Wrapper>
      <Form>
        <Label htmlFor='markerName'>
          <Select onChange={handleChange} id='markerName' name='markerName' data-testid='select'>
            <Option>All</Option>
            {[
              ...defaultMarkers,
              ...markers
            ].map((marker) => (<Option key={marker.id}>{marker.name}</Option>))}
          </Select>
        </Label>
        <Input onChange={handleChange} type='text' name='city' placeholder='search city' />
      </Form>
      <TableContainer>
        <Table>
          <Thead>
            <tr>
              <Th>id</Th>
              <Th>name</Th>
              <Th>street</Th>
              <Th>city</Th>
              <Th>country</Th>
              <Th>find on the map</Th>
            </tr>
          </Thead>
          <Tbody>
            {
              indicators.filter((indicator) => ((inputValues.markerName === 'All' && inputValues.city === '')
            || (inputValues.markerName === 'All' && indicator.city.toLowerCase().search(inputValues.city.toLowerCase()) !== -1)
                ? indicator
                : inputValues.markerName === indicator.name && indicator.city.toLowerCase()
                  .search(inputValues.city.toLowerCase()) !== -1 && indicator))
                .map((indicator, id) => (
                  <Tr key={indicator.id} data-testid='indicator'>
                    <Td>{id + 1}</Td>
                    <Td>{indicator.name}</Td>
                    <Td>{indicator.street}</Td>
                    <Td>{indicator.city}</Td>
                    <Td>{indicator.country}</Td>
                    <Td>
                      <Image
                        data-testid='findIndicator'
                        src='img/map.png'
                        onClick={() => findIndicatorOnTheMap(indicator)}
                      />
                    </Td>
                  </Tr>
                ))
            }
          </Tbody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

const mapDispatchToProps = {
  fetchIndicators,
  fetchMarkers,
  redirect,
  getSelectedIndicator
};

const mapStateToProps = (state) => ({
  indicators: state.mapIndicator.indicators,
  markers: state.marker.markers
});

export default connect(mapStateToProps, mapDispatchToProps)(List);

List.propTypes = {
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
  })).isRequired,
  markers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired
  })).isRequired,
  fetchIndicators: PropTypes.func.isRequired,
  fetchMarkers: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  getSelectedIndicator: PropTypes.func.isRequired
};
