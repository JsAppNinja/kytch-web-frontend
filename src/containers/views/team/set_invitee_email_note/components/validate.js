import emailValidator from 'email-validator';

const validate = (values) => {
  const errors = {};
  if (!values.email || !emailValidator.validate(values.email)) {
    errors.email = 'Please type in a valid email address.';
  }
  return errors;
};

export default validate;
