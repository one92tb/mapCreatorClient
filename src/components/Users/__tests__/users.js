import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import {Users} from "../Users";

test("it should render Users component", () => {
  const props = {
    fetchUsers: jest.fn(),
    changePermissions: jest.fn(),
    deleteAccount: jest.fn(),
    users: [
      {
        id: 1,
        isAdmin: true,
        login: "user1",
        password: "$2b$10$BrSxFwP1Pt/68ybQ3PlNvunwqgOLLTr64T/CVeErBviovZ8fuvd6y"
      }, {
        id: 2,
        isAdmin: false,
        login: "user2",
        password: "$2b$10$To1d8fJ7LKIzw/TnGVFgc.IhkW3GAcoJYrahErgeZ4eb2BfUCQyTu"
      }, {
        id: 3,
        isAdmin: false,
        login: "user3",
        password: "$2b$10$ATt5smgZ3ugBxYGJk2c8p.9yvCzUEhPQ3weMYevZPvHKyKtpextDO"
      }
    ]

  }
  render(< Users {
    ...props
  } />)

  const usersInTheTable = screen.getAllByTestId("user");
  expect(usersInTheTable).toHaveLength(3);
})

test("it should show only user3 in the table", async () => {
  const props = {
    fetchUsers: jest.fn(),
    changePermissions: jest.fn(),
    deleteAccount: jest.fn(),
    users: [
      {
        id: 1,
        isAdmin: true,
        login: "user1",
        password: "$2b$10$BrSxFwP1Pt/68ybQ3PlNvunwqgOLLTr64T/CVeErBviovZ8fuvd6y"
      }, {
        id: 2,
        isAdmin: false,
        login: "user2",
        password: "$2b$10$To1d8fJ7LKIzw/TnGVFgc.IhkW3GAcoJYrahErgeZ4eb2BfUCQyTu"
      }, {
        id: 3,
        isAdmin: false,
        login: "user3",
        password: "$2b$10$ATt5smgZ3ugBxYGJk2c8p.9yvCzUEhPQ3weMYevZPvHKyKtpextDO"
      }
    ]

  }
  render(< Users {
    ...props
  } />)

  const searchInput = screen.getByPlaceholderText("search user");

  //screen.debug(searchInput);
  await fireEvent.change(searchInput, {
    target: {
      value: "user3"
    }
  })

  const usersInTheTable = await screen.getAllByTestId("user");
  expect(usersInTheTable).toHaveLength(1);
  expect(screen.getByText("user3")).toBeTruthy();
})

test("it should start remove user2", () => {
  const props = {
    fetchUsers: jest.fn(),
    changePermissions: jest.fn(),
    deleteAccount: jest.fn(),
    users: [
      {
        id: 1,
        isAdmin: true,
        login: "user1",
        password: "$2b$10$BrSxFwP1Pt/68ybQ3PlNvunwqgOLLTr64T/CVeErBviovZ8fuvd6y"
      }, {
        id: 2,
        isAdmin: false,
        login: "user2",
        password: "$2b$10$To1d8fJ7LKIzw/TnGVFgc.IhkW3GAcoJYrahErgeZ4eb2BfUCQyTu"
      }, {
        id: 3,
        isAdmin: false,
        login: "user3",
        password: "$2b$10$ATt5smgZ3ugBxYGJk2c8p.9yvCzUEhPQ3weMYevZPvHKyKtpextDO"
      }
    ]

  }
  render(< Users {
    ...props
  } />)

  const removeButtons = screen.getAllByTestId("removeBtn");

  fireEvent.click(removeButtons[0]);
  expect(props.deleteAccount).toHaveBeenCalledTimes(1);
  expect(props.deleteAccount).toHaveBeenCalledWith(2);
})

test("it should start change user2 status from User to Admin", async () => {
  const props = {
    fetchUsers: jest.fn(),
    changePermissions: jest.fn(),
    deleteAccount: jest.fn(),
    users: [
      {
        id: 1,
        isAdmin: true,
        login: "user1",
        password: "$2b$10$BrSxFwP1Pt/68ybQ3PlNvunwqgOLLTr64T/CVeErBviovZ8fuvd6y"
      }, {
        id: 2,
        isAdmin: false,
        login: "user2",
        password: "$2b$10$To1d8fJ7LKIzw/TnGVFgc.IhkW3GAcoJYrahErgeZ4eb2BfUCQyTu"
      }, {
        id: 3,
        isAdmin: false,
        login: "user3",
        password: "$2b$10$ATt5smgZ3ugBxYGJk2c8p.9yvCzUEhPQ3weMYevZPvHKyKtpextDO"
      }
    ]

  }

  render(< Users {
    ...props
  } />)

  const statusSelects = screen.getAllByTestId("select");
  const users = screen.getAllByTestId("user");
  //screen.debug(screen.getAllByTestId("status")[0]);

  fireEvent.change(screen.getAllByTestId("select")[0], {
    target: {
      value: "Admin"
    }
  })
//  screen.debug(screen.getAllByTestId("select")[0]);

  expect(props.changePermissions).toHaveBeenCalledTimes(1);

})
