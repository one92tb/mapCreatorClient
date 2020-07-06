import styled from "styled-components";
import {css} from "styled-components";

const Wrapper = styled.div `
  background: #f2f2f2;
  height: 100%;
  width: 100%;
  padding-top: 100px;


  @media only screen and (max-width: 1199.98px) {
    padding-top: 50px;
  }
  @media only screen and (max-width: 991.98px) {
    padding-top: 50px;
  }

  @media only screen and (max-height: 350px) {
    padding-top: 20px;
  }
`;

const Inner = styled.div `
  width: 400px;
  border: 1px solid #6c757d;
  border-radius: 0.25rem;
  margin: 30px auto 30px auto;

  @media only screen and (max-width: 575.98px) {
    width: 300px;
  }
`;

const Form = styled.form `
  padding: 20px;
  @media only screen and (max-width: 575.98px) {
    padding: 10px;
  }
`;

const FormGroup = styled.div `
  position: relative;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const ErrorMessage = styled.span `
  color: #cc0000;
  font-size: 12px;
  display: block;
  margin-left: 2px;

  @media only screen and (max-width: 575.98px) {
    font-size: 8px;
  }
`;

const SuccessMessage = styled.span `
  color: #009933;
  font-size: 12px;
  display: block;
  margin-left: 2px;

  @media only screen and (max-width: 575.98px) {
    font-size: 8px;
  }
`;

const Label = styled.label `
  display: block;
  margin-left: 2px;

  @media only screen and (max-width: 575.98px) {
    font-size: 14px;
    height: 30px;
    margin: 0 0 2px 2px;
  }
`;

const Button = css `
  cursor: pointer;
  height: 40px;
  width: 165px;
  padding: 0.375rem 0.75rem;
  border: 1px solid #00b8e6;
  color: #fff;
  font-size: 1rem;

  text-align: center;
  border-radius: 0.25rem;

  @media only screen and (max-width: 575.98px) {
    height: 30px;
    width: 120px;
    line-height: normal;
  }
`;

const RegisterBtn = styled.button `
  ${Button};
  background: ${props => (
  !props.status
  ? "#00b8e6"
  : "#4ddbff")};
`;

const LoginBtn = styled.button `
  ${Button};
  background: ${props => (
  props.status
  ? "#00b8e6"
  : "#4ddbff")};
`;

const SubmitBtn = styled.button `
  ${Button};
  background-color: #00b8e6;
  margin-top: 4px;
  width: 100%;

  @media only screen and (max-width: 575.98px) {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div `
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #6c757d;
  width: 100%;
  height: 80px;
  padding: 20px;

  @media only screen and (max-width: 575.98px) {
    height: 60px;
    padding: 5px 10px;
    align-items: center;
  }
`;

const Input = styled.input `
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  display: block;
  border: 1px solid #ced4da;

  @media only screen and (max-width: 575.98px) {
    font-size: 14px;
    height: 30px;
  }
`;

const Logo = styled.img `
  display: flex;
  width: 130px;
  height: 130px;
  margin: 30px auto 30px auto;

  @media only screen and (max-width: 575.98px) {
    width: 80px;
    height: 80px;
  }
`;

const Title = styled.h1 `
  font-size: 26px;
  font-family: 'Lobster', cursive;
  align-items: center;
  text-align: center;

  @media (max-width: 1199px) {
    margin: 0;
  }

  @media only screen and (max-width: 575.98px) {
    font-size: 20px;
  }

  @media only screen and (max-width: 350px) {
    font-size: 14px;
  }
`;

export {
  Wrapper,
  Inner,
  ButtonWrapper,
  RegisterBtn,
  LoginBtn,
  Form,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  SuccessMessage,
  SubmitBtn,
  Logo,
  Title
};
