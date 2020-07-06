export const errors = {
  loginError: "",
  passwordError: ""
};

export const registerValidationDetails = data => {
  const { login, password, loginStatus } = data;

  return [
    {
      condition: !new RegExp("^(?=.*[A-Z])").test(password) && !loginStatus,
      nameOfErrorProperty: "passwordError",
      messageError:
        "The password must be minimum 8 characters or longer and 1 uppercase character"
    },
    /*
    {
      condition: !new RegExp("(?=.*[0-9])").test(password) && !loginStatus,
      nameOfErrorProperty: "passwordError",
      messageError: "The password must contain at least 1 numeric character"
    },
    {
      condition: !new RegExp("^(?=.*[a-z])").test(password) && !loginStatus,
      nameOfErrorProperty: "passwordError",
      messageError:
        "The password must contain at least 1 lowercase alphabetical character"
    },
    */
    {
      condition: !new RegExp("(?=.{8,})").test(password) && !loginStatus,
      nameOfErrorProperty: "passwordError",
      messageError: "The password must be minimum 8 characters or longer and 1 uppercase character"
    },
    {
      condition: !new RegExp("(?=.{4,})").test(login) && !loginStatus,
      nameOfErrorProperty: "loginError",
      messageError: "The login must be minimum 4 characters or longer"
    }
  ];
};
