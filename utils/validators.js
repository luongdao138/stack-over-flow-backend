const registerValidator = (username, password) => {
  let errors = {};

  if (username.trim() === '') errors.username = 'Username is cannot be empty!';
  else if (username.trim().length > 30 || username.trim().length < 3)
    errors.username = 'Username must be in range 3-30 characters length!';

  if (password.trim() === '') errors.password = 'Password is cannot be empty!';
  else if (password.trim().length < 6)
    errors.password = 'Password must be at least 6 characters length!';

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

const loginValidator = (username, password) => {
  let errors = {};

  if (username.trim() === '') errors.username = 'Username cannot be empty!';
  if (password.trim() === '') errors.password = 'Password cannot be empty!';

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = { registerValidator, loginValidator };
