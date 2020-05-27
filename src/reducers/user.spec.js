import { initialState, user as reducer } from "./user";

describe("user reducer", () => {
  //init state
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  //fetch
  it("fetching users", () => {
    expect(reducer(initialState, { type: "FETCHING_USERS" })).toEqual({
      ...initialState,
      fetching: true,
      fetched: false
    });
  });
  it("fetched users success", () => {
    expect(
      reducer(initialState, {
        type: "FETCHED_USERS_SUCCESS",
        users: [
          {
            id: 1,
            login: "login1",
            password: "pass1",
            isAdmin: true
          },
          {
            id: 2,
            login: "login2",
            password: "pass2",
            isAdmin: false
          }
        ]
      })
    ).toEqual({
      ...initialState,
      fetching: false,
      fetched: true,
      users: [
        {
          id: 1,
          login: "login1",
          password: "pass1",
          isAdmin: true
        },
        {
          id: 2,
          login: "login2",
          password: "pass2",
          isAdmin: false
        }
      ]
    });
  });
  it("fetched users error", () => {
    expect(
      reducer(initialState, {
        type: "FETCHED_USERS_ERROR",
        error: "sth goes wrong"
      })
    ).toEqual({
      ...initialState,
      fetching: false,
      fetched: false,
      error: "sth goes wrong"
    });
  });
  //post
  it("posting user", () => {
    expect(
      reducer(initialState, {
        type: "POSTING_USER"
      })
    ).toEqual({
      ...initialState,
      posting: true,
      posted: false
    });
  });
  it("posted user succes", () => {
    expect(
      reducer(initialState, {
        type: "POSTED_USER_SUCCESS",
        user: {
          id: 1,
          login: "login1",
          password: "pass1",
          isAdmin: true
        }
      })
    ).toEqual({
      ...initialState,
      posted: true,
      posting: false,
      success: "The account has been created",
      users: [
        {
          id: 1,
          login: "login1",
          password: "pass1",
          isAdmin: true
        }
      ]
    });

    expect(
      reducer(
        {
          ...initialState,
          users: [
            {
              id: 1,
              login: "login1",
              password: "pass1",
              isAdmin: true
            }
          ]
        },
        {
          type: "POSTED_USER_SUCCESS",
          user: {
            id: 2,
            login: "login2",
            password: "pass2",
            isAdmin: false
          }
        }
      )
    ).toEqual({
      ...initialState,
      posted: true,
      posting: false,
      success: "The account has been created",
      users: [
        {
          id: 1,
          login: "login1",
          password: "pass1",
          isAdmin: true
        },
        {
          id: 2,
          login: "login2",
          password: "pass2",
          isAdmin: false
        }
      ]
    });
  });
  it("posted user error", () => {
    expect(
      reducer(initialState, {
        type: "POSTED_USER_ERROR",
        error: "sth goes wrong"
      })
    ).toEqual({
      ...initialState,
      posted: false,
      posting: false,
      error: "sth goes wrong"
    });
  });
  //delete
  it("deleting account", () => {
    expect(reducer(initialState, { type: "DELETING_ACCOUNT" })).toEqual({
      ...initialState,
      deleting: true,
      deleted: false
    });
  });
  it("deleted account success", () => {
    expect(
      reducer(
        {
          ...initialState,
          users: [
            {
              id: 1,
              login: "login1",
              password: "pass1",
              isAdmin: true
            },
            {
              id: 2,
              login: "login2",
              password: "pass2",
              isAdmin: false
            }
          ]
        },
        { type: "DELETED_ACCOUNT_SUCCESS", id: 1 }
      )
    ).toEqual({
      ...initialState,
      deleting: false,
      deleted: true,
      users: [
        {
          id: 2,
          login: "login2",
          password: "pass2",
          isAdmin: false
        }
      ]
    });
  });
  it("deleted account error", () => {
    expect(
      reducer(initialState, {
        type: "DELETED_ACCOUNT_ERROR",
        error: "sth goes wrong"
      })
    ).toEqual({
      ...initialState,
      deleting: false,
      deleted: false,
      error: "sth goes wrong"
    });
  });
  //reset register
  it("reset register error", () => {
    expect(reducer(initialState, { type: "RESET_REGISTER_ERROR" })).toEqual({
      ...initialState,
      error: null
    });
  });

  it("reset register success", () => {
    expect(reducer(initialState, { type: "RESET_REGISTER_SUCCESS" })).toEqual({
      ...initialState,
      success: ""
    });
  });
  //change permissions
  it("changing permissions", () => {
    expect(reducer(initialState, { type: "CHANGING_PERMISSIONS" })).toEqual({
      ...initialState,
      changingPermissions: true,
      changedPermissions: false
    });
  });
  it("changed permissions success", () => {
    expect(
      reducer(
        {
          ...initialState
        },
        {
          type: "CHANGED_PERMISSIONS_SUCCESS",
          status: "User 2 - Status has been changed from Admin to User"
        }
      )
    ).toEqual({
      ...initialState,
      changingPermissions: false,
      changedPermissions: true,
      isAdmin: "User 2 - Status has been changed from Admin to User"
    });
  });
  it("changed permissions error", () => {
    expect(
      reducer(initialState, {
        type: "CHANGED_PERMISSIONS_ERROR",
        error: "sth goes wrong"
      })
    ).toEqual({
      ...initialState,
      changingPermissions: false,
      changedPermissions: false,
      error: "sth goes wrong"
    });
  });
});
