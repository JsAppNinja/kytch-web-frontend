const validate = (values) => {
  const errors = {};
  if (!values.address) {
    errors.address = 'Enter your Kytch address';
  }
  return errors;
};

export default validate;
