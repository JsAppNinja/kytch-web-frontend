const validate = (values) => {
  const errors = {};
  if (!values.code) {
    errors.email = 'Code should not be empty';
  }

  // eslint-disable-next-line
  if (!values.password || values.password && !(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})').test(values.password))) { 
    errors.password = 'Use at least 8 characters, including upper and lowercase letters, numbers and symbols.';
  }

  return errors;
};

export default validate;
