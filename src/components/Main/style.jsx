import styled from 'styled-components';
import { Row, Col } from 'reactstrap';

const RowStyle = styled(Row)`
  height: 100%;
  margin: 0 !important;
`;

const ColStyle = styled(Col)`
  padding: 0!important;
  height: 100%;

  @media only screen and (max-width: 991.98px) {
    height: auto;
        &:not(:first-child) {
          height: ${(props) => (props.pathname === '/' ? '100%' : 'auto')};
          display: block;
        }
  }
`;

export { RowStyle, ColStyle };
