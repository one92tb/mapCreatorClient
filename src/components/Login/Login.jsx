import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser } from '../../actions/user/createUser';
import { resetRegisterError } from '../../actions/user/resetRegisterError';
import { resetRegisterSuccess } from '../../actions/user/resetRegisterSuccess';
import { loginRequest } from '../../actions/signIn/loginRequest';
import { resetLoginError } from '../../actions/signIn/resetLoginError';
import { errors, registerValidationDetails } from '../../schema/registerSchema';
import validate from '../../validate';
import {
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
} from './style';

Wrapper.displayName = 'div';
Inner.displayName = 'div';
ButtonWrapper.displayName = 'div';
RegisterBtn.displayName = 'button';
LoginBtn.displayName = 'button';
Form.displayName = 'form';
FormGroup.displayName = 'div';
Label.displayName = 'label';
Input.displayName = 'input';
ErrorMessage.displayName = 'span';
SuccessMessage.displayName = 'span';
SubmitBtn.displayName = 'button';
Logo.displayName = 'img';
Title.displayName = 'h1';

export const Login = (props) => {
  const {
    createUser,
    loginRequest,
    resetLoginError,
    resetRegisterError,
    resetRegisterSuccess,
    registerError,
    registerSuccess,
    authError
  } = props;

  const [inputValues, setInputValues] = useState({
    login: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);

  useEffect(() => {
    setIsLoginForm(true);
  }, [registerSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      login: inputValues.login,
      password: inputValues.password,
      loginStatus: isLoginForm
    };

    const user = {
      login: inputValues.login,
      password: inputValues.password
    };

    resetRegisterError();
    resetLoginError();
    resetRegisterSuccess();

    const validationResult = validate(errors, registerValidationDetails, data);

    !validationResult.isError && !isLoginForm ? createUser(user) : loginRequest(user);

    setLoginError(validationResult.errors.loginError);
    setPasswordError(validationResult.errors.passwordError);

    console.log(registerError);
  };

  const switchForm = (bool) => {
    setInputValues({
      login: '',
      password: ''
    });

    setIsLoginForm(bool);
    setLoginError('');
    setPasswordError('');

    resetRegisterError();
    resetLoginError();
    resetRegisterSuccess();
  };

  const onChange = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  return (
    <Wrapper>
      <Title className='logoName'>mapCreator</Title>
      <Logo src='img/logo4.png' />
      <Inner>
        <ButtonWrapper>
          <LoginBtn status={isLoginForm} onClick={() => switchForm(true)}>
            Login
          </LoginBtn>
          <RegisterBtn status={isLoginForm} onClick={() => switchForm(false)}>
            Register
          </RegisterBtn>
        </ButtonWrapper>
        <Form>
          <FormGroup>
            <Label htmlFor='userLogin'>Login</Label>
            <Input
              id='userLogin'
              type='text'
              name='login'
              onChange={onChange}
              value={inputValues.login}
              autocomplete='login'
            />
            {!isLoginForm && loginError && <ErrorMessage>{loginError}</ErrorMessage>}
            {
              !isLoginForm && registerError && (
                <ErrorMessage>
                  {registerError.response.data.errorMessage}
                </ErrorMessage>
              )
            }
          </FormGroup>
          <FormGroup>
            <Label htmlFor='userPassword'>Password</Label>
            <Input
              type='password'
              name='password'
              id='userPassword'
              onChange={onChange}
              value={inputValues.password}
              autocomplete={isLoginForm
                ? 'current password' : 'new-password'}
            />
            {passwordError && !isLoginForm && <ErrorMessage>{passwordError}</ErrorMessage>}
            {
              authError && isLoginForm
                ? (
                  <ErrorMessage>
                    {authError.response.data.errorMessage}
                  </ErrorMessage>
                )
                : (<SuccessMessage>{registerSuccess}</SuccessMessage>)
            }
          </FormGroup>
          <FormGroup>
            <SubmitBtn onClick={(e) => onSubmit(e)}>
              {
                isLoginForm
                  ? 'Authorization'
                  : 'Create Account'
              }
            </SubmitBtn>
          </FormGroup>
        </Form>
      </Inner>
    </Wrapper>
  );
};
const mapDispatchToProps = {
  createUser,
  loginRequest,
  resetLoginError,
  resetRegisterError,
  resetRegisterSuccess
};

const mapStateToProps = (state) => ({
  registerError: state.user.error,
  registerSuccess: state.user.success,
  authError: state.account.error
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  createUser: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired,
  resetLoginError: PropTypes.func.isRequired,
  resetRegisterError: PropTypes.func.isRequired,
  resetRegisterSuccess: PropTypes.func.isRequired
};

Login.defaultProps = {
  registerError: {},
  registerSuccess: {},
  authError: {}
};
