import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { fetchIndicators } from '../../actions/mapIndicator/fetchIndicators';
import { fetchMarkers } from '../../actions/marker/fetchMarkers';
import BarGraph from './BarGraph/BarGraph';
import PieGraph from './PieChart/PieGraph';

import {
  ContainerStyle,
  RowStyle,
  ColStyle,
  Wrapper,
  Form,
  Input,
  Inner,
  TextBox,
  TextWrapper
} from './style';

Container.displayName = 'div';
Row.displayName = 'div';
Col.displayName = 'div';
Wrapper.displayName = 'div';
Form.displayName = 'form';
Input.displayName = 'input';
Inner.displayName = 'div';
TextBox.displayName = 'div';
TextWrapper.displayName = 'div';

export const Statistic = (props) => {
  const { fetchIndicators, fetchMarkers, indicators } = props;
  const [city, setCity] = useState('');

  useEffect(() => {
    fetchMarkers();
    fetchIndicators();
  }, []);

  const sumVisibleIndicators = () => {
    const displayMarkers = Object.entries(indicators.filter((indicator) => ((city === '' || indicator.city.toLowerCase()
      .search(city.toLowerCase()) !== -1) && indicator)).reduce((obj, el) => {
      obj[el.name] = obj[el.name]
        ? ++obj[el.name]
        : 1;
      return obj;
    }, {}));

    return displayMarkers;
  };

  const sumAllIndiacators = () => {
    const displaySumMarkers = [
      ['All markers', indicators.length]
    ];
    return displaySumMarkers;
  };

  return (
    <Wrapper>
      <Form>
        <Input
          onChange={(e) => setCity(e.target.value)}
          type='text'
          name='city'
          placeholder='search your city'
        />
      </Form>
      {
        indicators.length === 0
          ? (
            <TextWrapper>
              <TextBox> You have not any data to display on the charts </TextBox>
            </TextWrapper>
          ) : (
            <React.Fragment>
              <BarGraph displayMarkers={sumVisibleIndicators} />
              <ContainerStyle fluid>
                <RowStyle>
                  <ColStyle xl='6' lg='12'>
                    <Inner>
                      <PieGraph displayMarkers={sumAllIndiacators} />
                    </Inner>
                  </ColStyle>
                  <ColStyle xl='6' lg='12'>
                    <Inner>
                      <PieGraph displayMarkers={sumVisibleIndicators} />
                    </Inner>
                  </ColStyle>
                </RowStyle>
              </ContainerStyle>
            </React.Fragment>
          )
      }
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  indicators: state.mapIndicator.indicators,
});

const mapDispatchToProps = {
  fetchIndicators,
  fetchMarkers
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);

Statistic.propTypes = {
  fetchIndicators: PropTypes.func.isRequired,
  fetchMarkers: PropTypes.func.isRequired,
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
};
