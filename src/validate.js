const validate = (errors, ValidationDetails, data) => {
  let isError = false;

  ValidationDetails(data).forEach((validate) => {
    if (validate.condition) {
      isError = true;
      errors[validate.nameOfErrorProperty] = validate.messageError;
    } else if (
      !validate.condition &&
      validate.messageError === errors[validate.nameOfErrorProperty]
    ) {
      errors[validate.nameOfErrorProperty] = "";
    }
  });

  return {
    isError,
    errors
  };
};

export default validate;
