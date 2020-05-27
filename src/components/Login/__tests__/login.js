import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {
  render,
  fireEvent,
  screen
} from '@testing-library/react';
import {
  Login
} from "../Login";
import "jest-styled-components";
import {errors, registerValidationDetails} from "../../../schema/registerSchema.js";

test("it should render login component", () => {

  const props = {
    createUser: jest.fn(),
    loginRequest: jest.fn(),
    resetLoginError: jest.fn(),
    resetRegisterError: jest.fn(),
    resetRegisterSuccess: jest.fn(),
    isAuthorized: false,
    registerError: "",
    registerSuccess: "",
    authError: "",
  }

  render(<Login {...props}/>)
})

test("it should switch from Login to Register part of Login component", () => {

  const props = {
    createUser: jest.fn(),
    loginRequest: jest.fn(),
    resetLoginError: jest.fn(),
    resetRegisterError: jest.fn(),
    resetRegisterSuccess: jest.fn(),
    isAuthorized: false,
    registerError: "",
    registerSuccess: "",
    authError: "",
  }

  render(<Login {...props}/>)

  const loginBtn = screen.getAllByText("Login")[0];
  const registerBtn = screen.getByText("Register");
  fireEvent.click(registerBtn);
  expect(registerBtn).toHaveStyleRule("background", "#00b8e6");
  expect(loginBtn).toHaveStyleRule("background", "#4ddbff");
})

test("it should create successfully new account", ()=>{
  const props = {
    createUser: jest.fn(),
    loginRequest: jest.fn(),
    resetLoginError: jest.fn(),
    resetRegisterError: jest.fn(),
    resetRegisterSuccess: jest.fn(),
    isAuthorized: false,
    registerError: "",
    registerSuccess: "",
    authError: "",
  }

  render(<Login {...props}/>)

  const loginBtn = screen.getAllByText("Login")[0];
  const registerBtn = screen.getByText("Register");

  fireEvent.click(registerBtn);

  const loginInput = screen.getByLabelText("Login");
  const passwordInput = screen.getByLabelText("Password");
  const createAccBtn = screen.getByText("Create Account");

  fireEvent.change(loginInput, {
    target: {
      value: "user19"
    }
  })

  fireEvent.change(passwordInput, {
    target: {
      value: "Password19!"
    }
  })

  fireEvent.click(createAccBtn);

  expect(props.createUser).toHaveBeenCalledTimes(1);
  expect(props.createUser).toHaveBeenCalledWith({ login: 'user19', password: 'Password19!' });
})

test("it should throw error that login is too short", ()=>{
  const props = {
    createUser: jest.fn(),
    loginRequest: jest.fn(),
    resetLoginError: jest.fn(),
    resetRegisterError: jest.fn(),
    resetRegisterSuccess: jest.fn(),
    isAuthorized: false,
    registerError: "",
    registerSuccess: "",
    authError: "",
  }

  render(<Login {...props}/>)

  const loginBtn = screen.getAllByText("Login")[0];
  const registerBtn = screen.getByText("Register");

  fireEvent.click(registerBtn);

  const loginInput = screen.getByLabelText("Login");
  const passwordInput = screen.getByLabelText("Password");
  const createAccBtn = screen.getByText("Create Account");

  fireEvent.change(loginInput, {
    target: {
      value: "us"
    }
  })

  fireEvent.change(passwordInput, {
    target: {
      value: "Password19!"
    }
  })

  fireEvent.click(createAccBtn);
  expect(screen.getByText("The login must be minimum 4 characters or longer")).toBeTruthy();
})

test("it should throw error that password has not uppercase alphabetical character", ()=>{
  const props = {
    createUser: jest.fn(),
    loginRequest: jest.fn(),
    resetLoginError: jest.fn(),
    resetRegisterError: jest.fn(),
    resetRegisterSuccess: jest.fn(),
    isAuthorized: false,
    registerError: "",
    registerSuccess: "",
    authError: "",
  }

  render(<Login {...props}/>)

  const loginBtn = screen.getAllByText("Login")[0];
  const registerBtn = screen.getByText("Register");

  fireEvent.click(registerBtn);

  const loginInput = screen.getByLabelText("Login");
  const passwordInput = screen.getByLabelText("Password");
  const createAccBtn = screen.getByText("Create Account");

  fireEvent.change(loginInput, {
    target: {
      value: "user"
    }
  })

  fireEvent.change(passwordInput, {
    target: {
      value: "password19!"
    }
  })

  fireEvent.click(createAccBtn);
  expect(screen.getByText("The password must contain at least 1 uppercase alphabetical character")).toBeTruthy();
})


test("it should throw error that password has not at least 1 numeric character", ()=>{
  const props = {
    createUser: jest.fn(),
    loginRequest: jest.fn(),
    resetLoginError: jest.fn(),
    resetRegisterError: jest.fn(),
    resetRegisterSuccess: jest.fn(),
    isAuthorized: false,
    registerError: "",
    registerSuccess: "",
    authError: "",
  }

  render(<Login {...props}/>)

  const loginBtn = screen.getAllByText("Login")[0];
  const registerBtn = screen.getByText("Register");

  fireEvent.click(registerBtn);

  const loginInput = screen.getByLabelText("Login");
  const passwordInput = screen.getByLabelText("Password");
  const createAccBtn = screen.getByText("Create Account");

  fireEvent.change(loginInput, {
    target: {
      value: "user"
    }
  })

  fireEvent.change(passwordInput, {
    target: {
      value: "Password!"
    }
  })

  fireEvent.click(createAccBtn);
  expect(screen.getByText("The password must contain at least 1 numeric character")).toBeTruthy();
})

test("it should throw error that password has not at least 1 lowercase alphabetical character", ()=>{
  const props = {
    createUser: jest.fn(),
    loginRequest: jest.fn(),
    resetLoginError: jest.fn(),
    resetRegisterError: jest.fn(),
    resetRegisterSuccess: jest.fn(),
    isAuthorized: false,
    registerError: "",
    registerSuccess: "",
    authError: "",
  }

  render(<Login {...props}/>)

  const loginBtn = screen.getAllByText("Login")[0];
  const registerBtn = screen.getByText("Register");

  fireEvent.click(registerBtn);

  const loginInput = screen.getByLabelText("Login");
  const passwordInput = screen.getByLabelText("Password");
  const createAccBtn = screen.getByText("Create Account");

  fireEvent.change(loginInput, {
    target: {
      value: "user"
    }
  })

  fireEvent.change(passwordInput, {
    target: {
      value: "PASSWORD19!"
    }
  })

  fireEvent.click(createAccBtn);
  expect(screen.getByText("The password must contain at least 1 lowercase alphabetical character")).toBeTruthy();
})

test("it should throw error that password is too short", ()=>{
  const props = {
    createUser: jest.fn(),
    loginRequest: jest.fn(),
    resetLoginError: jest.fn(),
    resetRegisterError: jest.fn(),
    resetRegisterSuccess: jest.fn(),
    isAuthorized: false,
    registerError: "",
    registerSuccess: "",
    authError: "",
  }

  render(<Login {...props}/>)

  const loginBtn = screen.getAllByText("Login")[0];
  const registerBtn = screen.getByText("Register");

  fireEvent.click(registerBtn);

  const loginInput = screen.getByLabelText("Login");
  const passwordInput = screen.getByLabelText("Password");
  const createAccBtn = screen.getByText("Create Account");

  fireEvent.change(loginInput, {
    target: {
      value: "user"
    }
  })

  fireEvent.change(passwordInput, {
    target: {
      value: "Pass19!"
    }
  })

  fireEvent.click(createAccBtn);
  expect(screen.getByText("The password must be minimum 8 characters or longer")).toBeTruthy();
})

test("it should successfully request for login", ()=>{
  const props = {
    createUser: jest.fn(),
    loginRequest: jest.fn(),
    resetLoginError: jest.fn(),
    resetRegisterError: jest.fn(),
    resetRegisterSuccess: jest.fn(),
    isAuthorized: false,
    registerError: "",
    registerSuccess: "",
    authError: "",
  }

  render(<Login {...props}/>)

  const loginBtn = screen.getAllByText("Login")[0];
  const registerBtn = screen.getByText("Register");
  const loginInput = screen.getByLabelText("Login");
  const passwordInput = screen.getByLabelText("Password");
  const authBtn = screen.getByText("Authorization");

  fireEvent.change(loginInput, {
    target: {
      value: "user19"
    }
  })

  fireEvent.change(passwordInput, {
    target: {
      value: "Password19!"
    }
  })

  fireEvent.click(authBtn);
  expect(props.loginRequest).toHaveBeenCalledTimes(1);
  expect(props.loginRequest).toHaveBeenCalledWith({login: "user19", password: "Password19!"})

})
