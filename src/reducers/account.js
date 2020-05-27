const initialState = {
  userId: "",
  userName: "",
  error: null,
  isLoggingIn: false,
  isAuthorized: false
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        isLoggingIn: true,
        isAuthorized: false
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggingIn: false,
        isAuthorized: action.userData.isAuthorized,
        userName: action.userData.userName,
        userId: action.userData.userId,
        error: null
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.error
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthorized: action.userData.isAuthorized,
        userName: action.userData.userName,
        userId: action.userData.userId,
        error: action.userData.error
      };
    case "RESET_LOGIN_ERROR":
      return {
        ...state,
        error: null
      };
    case "CHANGE_LOCATION":
      return {
        ...state
      };
    default:
      return state;
  }
};

export { initialState, account };
