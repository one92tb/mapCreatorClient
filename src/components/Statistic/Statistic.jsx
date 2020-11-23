import React, { Component } from 'react';
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

export class Statistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    };
  }

  componentDidMount() {
    const { fetchIndicators, fetchMarkers } = this.props;
    fetchIndicators();
    fetchMarkers();
  }

  sumVisibleIndicators = () => {
    const {
      indicators
    } = this.props;
    const {
      city
    } = this.state;

    const displayMarkers = Object.entries(indicators.filter((indicator) => ((city === '' || indicator.city.toLowerCase()
      .search(city.toLowerCase()) !== -1) && indicator)).reduce((obj, el) => {
      obj[el.name] = obj[el.name]
        ? ++obj[el.name]
        : 1;
      return obj;
    }, {}));

    return displayMarkers;
  };

  sumAllIndiacators = () => {
    const { indicators } = this.props;
    const displaySumMarkers = [
      ['All markers', indicators.length]
    ];
    return displaySumMarkers;
  };

  handleChange = (e) => {
    this.setState({
      city: e.target.value
    });
  };

  render() {
    const { indicators } = this.props;
    return (
      <Wrapper>
        <Form>
          <Input
            onChange={this.handleChange}
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
                <BarGraph displayMarkers={this.sumVisibleIndicators} />
                <ContainerStyle fluid>
                  <RowStyle>
                    <ColStyle xl='6' lg='12'>
                      <Inner>
                        <PieGraph displayMarkers={this.sumAllIndiacators} />
                      </Inner>
                    </ColStyle>
                    <ColStyle xl='6' lg='12'>
                      <Inner>
                        <PieGraph displayMarkers={this.sumVisibleIndicators} />
                      </Inner>
                    </ColStyle>
                  </RowStyle>
                </ContainerStyle>
              </React.Fragment>
            )
        }
      </Wrapper>
    );
  }
}

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
