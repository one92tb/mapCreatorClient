import styled from "styled-components";
import { css } from "styled-components";

const Wrapper = styled.div`
  background: #f2f2f2;
  height: 100%;
  padding: 40px 20px;

  @media only screen and (max-width: 1200px) {
    height: auto;
  }

  @media only screen and (max-width: 350px) {
    padding: 5px;
  }
`;

const Option = styled.option`
  @media only screen and (max-width: 767.98px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 350px) {
    font-size: 11px;
    text-align: center;
  }
`;

const Label = styled.label`
  margin: 0;
`;

const Select = styled.select`
  width: 200px;
  height: 40px;
  color: #000;
  display: block;
  text-align: center;
  border-radius: 5px;
  background: #fff;
  text-align: center;
  text-align-last: center;

  @media only screen and (max-width: 767.98px) {
    width: 150px;
    height: 25px;
    border-radius: 3px;
    font-size: 14px;
  }

  @media only screen and (max-width: 350px) {
    width: 120px;
    height: 20px;
    border-radius: 2px;
    font-size: 11px;
  }
`;

const Input = styled.input`
  height: 40px;
  width: 200px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid transparent;

  @media only screen and (max-width: 767.98px) {
    width: 150px;
    height: 25px;
    border-radius: 3px;
    font-size: 14px;
  }

  @media only screen and (max-width: 350px) {
    width: 120px;
    height: 20px;
    border: 1px solid #000;
    border-radius: 2px;
    font-size: 11px;
  }
`;

const Form = styled.form`
  height: calc(10% - 20px);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  background: #00b8e6;
  align-items: center;
  border-radius: 3px;

  @media only screen and (max-width: 1200px) {
    height: 60px;
  }

  @media only screen and (max-width: 991.98px) {
    height: auto;
    padding: 3px;
  }

  @media only screen and (max-width: 350px) {
    margin: 5px 0 10px 0;
    background: none;
  }
`;

const TableContainer = styled.div`
  height: 90%;
`;

const Table = styled.table`
  width: 100%;
  display: block;
  height: 100%;
`;

const Thead = styled.thead`
  display: table;
  width: 100%;
`;

const Tbody = styled.tbody`
  overflow: auto;
  overflow-x: hidden;
  display: block;
  width: 100%;
  height: 100%;
  height: calc(100% - 48px);
  text-align: center;
`;

const Tr = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;
  margin: 5px 0;
`;

const Cell = css`
  padding: 0.75rem;
  text-align: center;
  width: 10%;

  &:not(:first-child) {
    width: 15%;
    font-size: 11px;
  }

  @media only screen and (max-width: 767.98px) {
    padding: 0.2rem;
    font-size: 8px;
  }
`;

const Th = styled.th`
  ${Cell};
  color: #fff;
  background: #00b8e6;
`;

const Td = styled.td`
  ${Cell};
  background: #4ddbff;
`;

const Image = styled.img`
  height: 32px;
  width: 32px;

  @media only screen and (max-width: 991.98px) {
    width: 20px;
    height: 20px;
  }

  @media only screen and (max-width: 350px) {
    width: 16px;
    height: 16px;
  }
`;

export {
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
};
