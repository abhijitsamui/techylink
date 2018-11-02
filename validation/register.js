const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 Characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is Required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is Required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid!!";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is Required";
  }
  if (!Validator.isLength(data.password, { min: 3, max: 15 })) {
    errors.password = "Password must be atleast 3 Characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password is Required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Both Password Must Match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
