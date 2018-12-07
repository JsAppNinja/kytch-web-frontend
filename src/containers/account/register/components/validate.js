import emailValidator from 'email-validator';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email Address should not be empty';
  }
  if (values.email && !emailValidator.validate(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.name) {
    errors.name = 'Name should not be empty';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone Number should not be empty';
  }
  // eslint-disable-next-line
  if (!values.password || values.password && !(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})').test(values.password))) { 
    errors.password = 'Use at least 8 characters, including upper and lowercase letters, numbers and symbols.';
  }

  if (!values.passwordConfirmation || (values.password && values.passwordConfirmation !== values.password)) {
    errors.passwordConfirmation = 'Confirmation password does not match';
  }
  return errors;
};

export default validate;
