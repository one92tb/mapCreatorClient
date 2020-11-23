import React from 'react';
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

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      loginError: '',
      password: '',
      passwordError: '',
      loginStatus: true
    };
  }

  componentDidUpdate(prevProps) {
    const { registerSuccess } = this.props;
    if (registerSuccess !== prevProps.registerSuccess) {
      this.setState({ loginStatus: true });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = (e) => {
    const { login, password, loginStatus } = this.state;
    const {
      createUser,
      loginRequest,
      resetRegisterError,
      resetLoginError,
      resetRegisterSuccess
    } = this.props;

    const data = {
      login,
      password,
      loginStatus
    };

    const validationResult = validate(errors, registerValidationDetails, data);
    const user = {
      login,
      password
    };

    e.preventDefault();
    resetRegisterError();
    resetLoginError();
    resetRegisterSuccess();

    !validationResult.isError && !loginStatus ? createUser(user) : loginRequest(user);

    this.setState({
      ...validationResult.errors
    });
  };

  isLogin = (status) => {
    const { resetRegisterError, resetLoginError, resetRegisterSuccess } = this.props;
    this.setState({
      loginStatus: status,
      login: '',
      loginError: '',
      password: '',
      passwordError: ''
    });

    resetRegisterError();
    resetLoginError();
    resetRegisterSuccess();
  };

  render() {
    const {
      login,
      password,
      loginStatus,
      loginError,
      passwordError,
    } = this.state;
    const { registerError, registerSuccess, authError } = this.props;
    return (
      <Wrapper>
        <Title className='logoName'>mapCreator</Title>
        <Logo src='img/logo4.png' />
        <Inner>
          <ButtonWrapper>
            <LoginBtn status={loginStatus} onClick={() => this.isLogin(true)}>
              Login
            </LoginBtn>
            <RegisterBtn status={loginStatus} onClick={() => this.isLogin(false)}>
              Register
            </RegisterBtn>
          </ButtonWrapper>
          <Form>
            <FormGroup>
              <Label htmlFor='userLogin'>Login</Label>
              <Input id='userLogin' type='text' name='login' onChange={this.onChange} value={login} autocomplete='login' />
              {!loginStatus && loginError && <ErrorMessage>{loginError}</ErrorMessage>}
              {
                !loginStatus && registerError && (
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
                onChange={this.onChange}
                value={password}
                autocomplete={loginStatus
                  ? 'current password' : 'new-password'}
              />
              {passwordError && !loginStatus && <ErrorMessage>{passwordError}</ErrorMessage>}
              {
                authError && loginStatus
                  ? (
                    <ErrorMessage>
                      {authError.response.data.errorMessage}
                    </ErrorMessage>
                  )
                  : (<SuccessMessage>{registerSuccess}</SuccessMessage>)
              }
            </FormGroup>
            <FormGroup>
              <SubmitBtn onClick={(e) => this.onSubmit(e)}>
                {
                  loginStatus
                    ? 'Authorization'
                    : 'Create Account'
                }
              </SubmitBtn>
            </FormGroup>
          </Form>
        </Inner>
      </Wrapper>
    );
  }
}

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
